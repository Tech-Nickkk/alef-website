import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/lib/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, donationType, userId, userEmail } = await req.json();

    const isSubscription = donationType === 'monthly';

    // Only fetch user data if logged in
    let userData = null;
    if (userId) {
      const userDoc = await db.collection('users').doc(userId).get();
      userData = userDoc.exists ? userDoc.data() : null;
    }

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: donationType === 'sponsor'
                ? 'Sponsorship Contribution to ALEF'
                : isSubscription ? 'Monthly Donation to ALEF' : 'One-Time Donation to ALEF',
            },
            unit_amount: Math.round(amount * 100),
            ...(isSubscription && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/donate?canceled=true`,

      ...(userData?.stripeCustomerId
        ? { customer: userData.stripeCustomerId }
        : userEmail ? { customer_email: userEmail } : {}
      ),

      metadata: {
        donationType: donationType,
        ...(userId && { firebaseUserId: userId }),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}