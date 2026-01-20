import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // 1. Security Check
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // 2. Get the Stripe Customer ID from Firebase
    // We stored this in 'api/webhooks' when they first donated.
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.stripeCustomerId) {
      return NextResponse.json({ error: "No subscription history found for this user." }, { status: 404 });
    }

    // 3. Create the Portal Session
    // This generates a temporary, secure URL where they can manage billing.
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: `${req.headers.get('origin')}/profile`, // Where to send them after they are done
    });

    // 4. Send the URL to the frontend
    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Portal Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}