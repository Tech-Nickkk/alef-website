// app/api/webhooks/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';
import * as admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers(); // Fix: await headers()
  const sig = headersList.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      // 1. Handle Initial Checkout (One-Time & First Subscription Payment)
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSession(session);
        break;
      }

      // 2. Handle Recurring Monthly Payments
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if ((invoice as any).subscription && invoice.billing_reason === 'subscription_cycle') {
          await handleInvoicePaid(invoice);
        }
        break;
      }

      // 3. Handle Cancellations or Status Changes
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }
    }
  } catch (error) {
    console.error('Webhook handler failed:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// --- HELPER FUNCTIONS ---

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  const { firebaseUserId, donationType } = session.metadata || {};
  const amount = session.amount_total ? session.amount_total / 100 : 0;
  const stripeCustomerId = session.customer as string;

  // Always record the donation (even for anonymous donors)
  const donationRef = db.collection('donations').doc(session.id);

  await donationRef.set({
    amount: amount,
    currency: session.currency,
    status: session.payment_status,
    date: admin.firestore.FieldValue.serverTimestamp(),
    donationType: donationType || 'one-time',
    userId: firebaseUserId || 'anonymous',
    email: session.customer_details?.email,
    stripeCustomerId: stripeCustomerId,
    stripeSessionId: session.id,
  }, { merge: true });

  // Only update user profile if they were logged in
  if (firebaseUserId) {
    const userRef = db.collection('users').doc(firebaseUserId);
    const userUpdate: any = {
      lastDonationDate: new Date(),
      totalDonated: admin.firestore.FieldValue.increment(amount),
      ...(donationType !== 'one-time' && { subscriptionStatus: 'active' })
    };

    if (stripeCustomerId) {
      userUpdate.stripeCustomerId = stripeCustomerId;
    }

    await userRef.set(userUpdate, { merge: true });

    // Add to History Sub-collection
    await userRef.collection('payment_history').doc(session.id).set({
      amount,
      date: new Date(),
      type: donationType || 'one-time',
      stripePaymentId: session.payment_intent || session.id
    }, { merge: true });
  }

  // Sync donor with GHL
  await syncGHLContact(
    session.customer_details?.email,
    session.customer_details?.name,
    session.customer_details?.phone
  );
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;
  const amount = invoice.amount_paid / 100;

  // Record the recurring donation
  await db.collection('donations').doc(invoice.id).set({
    amount: amount,
    currency: invoice.currency,
    status: 'paid',
    date: admin.firestore.FieldValue.serverTimestamp(),
    donationType: 'monthly-renewal',
    userId: 'anonymous', // Always anonymous since we removed auth
    email: invoice.customer_email,
    stripeCustomerId: stripeCustomerId,
    stripeInvoiceId: invoice.id,
    subscriptionId: (invoice as any).subscription as string,
  }, { merge: true });

  // Sync donor with GHL
  await syncGHLContact(
    invoice.customer_email,
    invoice.customer_name,
    invoice.customer_phone
  );
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Rather than updating a user profile, we can log the cancellation in Firebase
  if (subscription.status === 'canceled') {
    // Optional: We can look up the original donation and mark it as canceled
    const donationsSnapshot = await db.collection('donations')
      .where('stripeCustomerId', '==', subscription.customer as string)
      .where('donationType', '==', 'monthly')
      .limit(1)
      .get();

    if (!donationsSnapshot.empty) {
      await donationsSnapshot.docs[0].ref.update({
        subscriptionStatus: 'canceled',
        canceledAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }
}

async function syncGHLContact(email?: string | null, name?: string | null, phone?: string | null) {
  if (!email) return;

  const ghlApiKey = process.env.GHL_API_KEY;
  const ghlLocationId = process.env.GHL_LOCATION_ID;

  if (!ghlApiKey || !ghlLocationId) {
    console.error('GHL credentials not found.');
    return;
  }

  let firstName = '';
  let lastName = '';
  if (name) {
    const parts = name.split(' ');
    firstName = parts[0] || '';
    lastName = parts.slice(1).join(' ') || '';
  }

  try {
    const ghlBody: Record<string, any> = {
      email,
      locationId: ghlLocationId,
    };
    if (firstName) ghlBody.firstName = firstName;
    if (lastName) ghlBody.lastName = lastName;
    if (phone) ghlBody.phone = phone;

    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlBody),
    });

    if (!ghlResponse.ok) {
      console.error('GHL API Error:', ghlResponse.status, await ghlResponse.text());
      return;
    }

    const ghlData = await ghlResponse.json();
    const contactId = ghlData?.contact?.id;

    if (contactId) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ghlApiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: ['alef donors']
        }),
      });
    }
  } catch (err) {
    console.error('Error updating GHL contact:', err);
  }
}