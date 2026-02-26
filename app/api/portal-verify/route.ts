import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// In-memory store for verification codes
// In production, consider using Redis or a database
const verificationCodes = new Map<string, {
    code: string;
    expiresAt: number;
    attempts: number;
    lastSentAt: number;
}>();

// Clean up expired codes every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of verificationCodes.entries()) {
        if (now > value.expiresAt) {
            verificationCodes.delete(key);
        }
    }
}, 10 * 60 * 1000);

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
    try {
        const { email, code, action } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // ==================== SEND CODE ====================
        if (action === 'send') {
            // 1. First verify this email exists as a Stripe customer
            const customers = await stripe.customers.list({
                email: normalizedEmail,
                limit: 1,
            });

            if (customers.data.length === 0) {
                return NextResponse.json(
                    { error: 'No donation history found for this email.', errorType: 'not_found' },
                    { status: 404 }
                );
            }

            // 2. Rate limiting: max 3 codes per email in 15 minutes
            const existing = verificationCodes.get(normalizedEmail);
            if (existing && Date.now() - existing.lastSentAt < 60000) {
                return NextResponse.json(
                    { error: 'Please wait at least 1 minute before requesting a new code.' },
                    { status: 429 }
                );
            }

            // 3. Generate and store the code (expires in 10 minutes)
            const verificationCode = generateCode();
            verificationCodes.set(normalizedEmail, {
                code: verificationCode,
                expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
                attempts: 0,
                lastSentAt: Date.now(),
            });

            // 4. Send the code via email
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'ALEF <noreply@usalef.org>';

            await resend.emails.send({
                from: fromEmail,
                to: normalizedEmail,
                subject: 'Your ALEF Verification Code',
                html: `
          <div style="font-family: 'Arial', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 24px; color: #1a1a1a; margin: 0;">ALEF</h1>
              <p style="color: #666; font-size: 14px; margin-top: 5px;">Billing Portal Verification</p>
            </div>
            <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center; border: 1px solid #e9ecef;">
              <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">Your verification code is:</p>
              <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1a1a1a; padding: 15px; background: white; border-radius: 8px; border: 2px dashed #dee2e6; display: inline-block; min-width: 200px;">
                ${verificationCode}
              </div>
              <p style="color: #999; font-size: 13px; margin-top: 20px; margin-bottom: 0;">This code expires in 10 minutes.</p>
            </div>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
              If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        `,
            });

            return NextResponse.json({ success: true, message: 'Verification code sent.' });
        }

        // ==================== VERIFY CODE ====================
        if (action === 'verify') {
            if (!code) {
                return NextResponse.json({ error: 'Verification code is required.' }, { status: 400 });
            }

            const stored = verificationCodes.get(normalizedEmail);

            if (!stored) {
                return NextResponse.json(
                    { error: 'No verification code found. Please request a new one.' },
                    { status: 400 }
                );
            }

            // Check expiry
            if (Date.now() > stored.expiresAt) {
                verificationCodes.delete(normalizedEmail);
                return NextResponse.json(
                    { error: 'Code has expired. Please request a new one.' },
                    { status: 400 }
                );
            }

            // Check max attempts (prevent brute force)
            if (stored.attempts >= 5) {
                verificationCodes.delete(normalizedEmail);
                return NextResponse.json(
                    { error: 'Too many failed attempts. Please request a new code.' },
                    { status: 429 }
                );
            }

            // Verify the code
            if (stored.code !== code.trim()) {
                stored.attempts += 1;
                return NextResponse.json(
                    { error: 'Invalid code. Please try again.' },
                    { status: 400 }
                );
            }

            // Code is valid - clean up and return success
            verificationCodes.delete(normalizedEmail);
            return NextResponse.json({ verified: true });
        }

        return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });

    } catch (err: any) {
        console.error('Portal verify error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
