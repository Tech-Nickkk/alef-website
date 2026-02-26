import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId, email, verified } = await req.json();

    // Must have either userId (authenticated) or email (guest)
    if (!userId && !email) {
      return NextResponse.json({ error: "Authentication or email required" }, { status: 401 });
    }

    // For guest users (email-based), require verification
    if (!userId && email && !verified) {
      return NextResponse.json({ error: "Email verification required." }, { status: 403 });
    }

    let stripeCustomerId: string | null = null;

    if (userId) {
      // --- Authenticated User: Look up Stripe Customer ID from Firebase ---
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();

      if (userData?.stripeCustomerId) {
        stripeCustomerId = userData.stripeCustomerId;
      }
    }

    if (!stripeCustomerId && email) {
      // --- Guest User: Look up Stripe Customer by email ---
      const customers = await stripe.customers.list({
        email: email.toLowerCase().trim(),
        limit: 1,
      });

      if (customers.data.length > 0) {
        stripeCustomerId = customers.data[0].id;
      }
    }

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription history found. Please make sure you entered the email used during donation." },
        { status: 404 }
      );
    }

    // Create the Portal Session
    const returnUrl = userId
      ? `${req.headers.get('origin')}/profile`
      : `${req.headers.get('origin')}/donate`;

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
      ...(process.env.STRIPE_PORTAL_CONFIG_ID && {
        configuration: process.env.STRIPE_PORTAL_CONFIG_ID,
      }),
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Portal Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}