import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin'; 
import * as admin from 'firebase-admin'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // --- FIX: Extract 'type' and rename it to 'donationType' ---
    // We also provide a default value ('one-time') just in case it's missing, to prevent crashes.
    const { firebaseUserId, type, isSponsor } = session.metadata || {};
    const donationType = type || 'one-time'; 

    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const customerEmail = session.customer_details?.email;
    const stripeCustomerId = session.customer as string;

    if (!firebaseUserId) {
        return NextResponse.json({ error: 'Missing User ID' }, { status: 400 });
    }

    try {
      // --- ACTION A: Log the Donation ---
      const donationRef = await db.collection('donations').add({
        amount: amount,
        currency: session.currency,
        email: customerEmail,
        status: session.payment_status,
        date: admin.firestore.FieldValue.serverTimestamp(),
        stripeSessionId: session.id,
        stripeCustomerId: stripeCustomerId,
        donationType: donationType, // Now guaranteed to be a string
        userId: firebaseUserId, 
      });

      // --- ACTION B: Update User Profile ---
      const userRef = db.collection('users').doc(firebaseUserId);
      
      await userRef.set({
        stripeCustomerId: stripeCustomerId,
        lastDonationDate: new Date(),
        totalDonated: admin.firestore.FieldValue.increment(amount),
        isSponsor: isSponsor === 'true' ? true : undefined
      }, { merge: true });
      
      await userRef.collection('payment_history').add({
          donationId: donationRef.id,
          amount,
          date: new Date()
      });

      // --- ACTION C: Add to Public Sponsors List ---
      if (isSponsor === 'true') {
        let tier = 'Strategic Sponsor';
        if (amount >= 25000) tier = 'Global Ally';
        else if (amount >= 10000) tier = 'Visionary Partner';

        const sponsorName = session.custom_fields?.[0]?.text?.value || customerEmail?.split('@')[0] || "Anonymous Sponsor";

        await db.collection('sponsors').add({
            name: sponsorName,
            amount: amount,
            tier: tier,
            joinedAt: new Date(),
            display: true 
        });
      }

    } catch (error) {
      console.error('Error updating Firebase:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: `Firebase update failed: ${errorMessage}` }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}