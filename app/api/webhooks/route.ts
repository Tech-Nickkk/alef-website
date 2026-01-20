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
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // --- EXTRACT DATA ---
    const { firebaseUserId, donationType } = session.metadata || {};
    
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const customerEmail = session.customer_details?.email;
    const stripeCustomerId = session.customer as string;

    if (!firebaseUserId) {
      return NextResponse.json({ error: 'Missing User ID' }, { status: 400 });
    }

    try {
      // --- SAVE TO DATABASE ---
      await db.collection('donations').add({
        amount: amount,
        currency: session.currency,
        status: session.payment_status,
        date: admin.firestore.FieldValue.serverTimestamp(),
        donationType: donationType || 'one-time', 
        
        userId: firebaseUserId,
        email: customerEmail,
        stripeCustomerId: stripeCustomerId,
        stripeSessionId: session.id,
      });

      // Update User Total
      const userRef = db.collection('users').doc(firebaseUserId);
      await userRef.set({
        stripeCustomerId: stripeCustomerId,
        lastDonationDate: new Date(),
        totalDonated: admin.firestore.FieldValue.increment(amount),
      }, { merge: true });

      // Add to History
      await userRef.collection('payment_history').add({
        amount,
        date: new Date(),
        type: donationType || 'one-time'
      });

    } catch (error) {
      console.error('Error updating Firebase:', error);
      return NextResponse.json({ error: `Firebase update failed` }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}