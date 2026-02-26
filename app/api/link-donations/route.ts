import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import * as admin from 'firebase-admin';

export async function POST(req: Request) {
    try {
        const { userId, userEmail } = await req.json();

        if (!userId || !userEmail) {
            return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
        }

        // Find all anonymous donations with this email
        const anonymousDonations = await db
            .collection('donations')
            .where('email', '==', userEmail)
            .where('userId', '==', 'anonymous')
            .get();

        if (anonymousDonations.empty) {
            return NextResponse.json({ linked: 0 });
        }

        const batch = db.batch();
        const userRef = db.collection('users').doc(userId);
        let totalAmount = 0;
        let latestDate = new Date(0);

        for (const doc of anonymousDonations.docs) {
            const donation = doc.data();

            // Update the donation record to link it to this user
            batch.update(doc.ref, { userId: userId });

            // Add to user's payment_history sub-collection
            batch.set(
                userRef.collection('payment_history').doc(doc.id),
                {
                    amount: donation.amount,
                    date: donation.date?.toDate?.() || new Date(),
                    type: donation.donationType || 'one-time',
                    stripePaymentId: donation.stripeSessionId || doc.id,
                },
                { merge: true }
            );

            totalAmount += donation.amount || 0;
            const donationDate = donation.date?.toDate?.() || new Date();
            if (donationDate > latestDate) {
                latestDate = donationDate;
            }

            // If this donation has a stripeCustomerId, link it to the user
            if (donation.stripeCustomerId) {
                batch.set(userRef, { stripeCustomerId: donation.stripeCustomerId }, { merge: true });
            }
        }

        // Update user's total donation amount
        batch.set(
            userRef,
            {
                totalDonated: admin.firestore.FieldValue.increment(totalAmount),
                lastDonationDate: latestDate,
            },
            { merge: true }
        );

        await batch.commit();

        return NextResponse.json({ linked: anonymousDonations.size });
    } catch (err: any) {
        console.error('Error linking donations:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
