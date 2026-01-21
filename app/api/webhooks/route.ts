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
        // Only process if it's a subscription renewal (subscription field is present)
        // and ignore the very first payment (billing_reason is not 'subscription_create')
        // because checkout.session.completed already handles the first one.
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

  if (!firebaseUserId) return;

  // IDEMPOTENCY FIX: Use session.id as the document ID
  const donationRef = db.collection('donations').doc(session.id);

  await donationRef.set({
    amount: amount,
    currency: session.currency,
    status: session.payment_status,
    date: admin.firestore.FieldValue.serverTimestamp(),
    donationType: donationType || 'one-time',
    userId: firebaseUserId,
    email: session.customer_details?.email,
    stripeCustomerId: stripeCustomerId,
    stripeSessionId: session.id,
  }, { merge: true }); // merge: true prevents overwriting if webhook fires twice

  // Update User Profile
  const userRef = db.collection('users').doc(firebaseUserId);
  await userRef.set({
    stripeCustomerId: stripeCustomerId,
    lastDonationDate: new Date(),
    totalDonated: admin.firestore.FieldValue.increment(amount),
    // If it's a subscription, set status to active initially
    ...(donationType !== 'one-time' && { subscriptionStatus: 'active' })
  }, { merge: true });

  // Add to History Sub-collection (Use session ID here too for safety)
  await userRef.collection('payment_history').doc(session.id).set({
    amount,
    date: new Date(),
    type: donationType || 'one-time',
    stripePaymentId: session.payment_intent || session.id
  }, { merge: true });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;
  const amount = invoice.amount_paid / 100;

  // We need to find the user associated with this Stripe Customer ID
  // Query your users collection to find the doc where stripeCustomerId matches
  const usersSnapshot = await db.collection('users').where('stripeCustomerId', '==', stripeCustomerId).limit(1).get();

  if (usersSnapshot.empty) {
    console.error('No user found for Stripe Customer:', stripeCustomerId);
    return;
  }

  const userDoc = usersSnapshot.docs[0];
  const userRef = userDoc.ref;

  // Record the recurring donation
  await db.collection('donations').doc(invoice.id).set({
    amount: amount,
    currency: invoice.currency,
    status: 'paid',
    date: admin.firestore.FieldValue.serverTimestamp(),
    donationType: 'monthly-renewal', // or derive from subscription metadata if available
    userId: userDoc.id,
    email: invoice.customer_email,
    stripeCustomerId: stripeCustomerId,
    stripeInvoiceId: invoice.id,
  }, { merge: true });

  // Update totals
  await userRef.update({
    lastDonationDate: new Date(),
    totalDonated: admin.firestore.FieldValue.increment(amount),
    subscriptionStatus: 'active' // Re-confirm active status on payment
  });

  // Add to history
  await userRef.collection('payment_history').doc(invoice.id).set({
    amount,
    date: new Date(),
    type: 'monthly-renewal',
    stripeInvoiceId: invoice.id
  }, { merge: true });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const stripeCustomerId = subscription.customer as string;

  const usersSnapshot = await db.collection('users').where('stripeCustomerId', '==', stripeCustomerId).limit(1).get();
  if (usersSnapshot.empty) return;

  const userRef = usersSnapshot.docs[0].ref;

  await userRef.update({
    subscriptionStatus: subscription.status, 
    subscriptionId: subscription.id
  });
}