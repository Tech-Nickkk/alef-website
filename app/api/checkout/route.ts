import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/lib/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, donationType, userId, userEmail } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const isSubscription = donationType === 'monthly';

    // Fetch user to check for existing Stripe Customer ID
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    const session = await stripe.checkout.sessions.create({
      ...(isSubscription ? {} : { payment_method_types: ['card', 'paypal'] }),
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

      // If we have an existing customer ID, use it.
      // Otherwise, use the email and force creation of a new Customer ID (even for one-time payments).
      ...(userData?.stripeCustomerId
        ? { customer: userData.stripeCustomerId }
        : {
          customer_email: userEmail,
          ...(!isSubscription && { customer_creation: 'always' })
        }
      ),

      metadata: {
        donationType: donationType,
        firebaseUserId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}