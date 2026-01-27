import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/app/components/EmailTemplate';
import * as React from 'react';

// Initialize with a fallback to avoid TS errors, or move inside the handler if you prefer.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, organization, subject, message } = body;

        const clientEmail = process.env.CLIENT_EMAIL;
        const fromEmail = process.env.RESEND_FROM_EMAIL;

        if (!process.env.RESEND_API_KEY || !clientEmail || !fromEmail) {
            console.error('RESEND_API_KEY, CLIENT_EMAIL, or RESEND_FROM_EMAIL is not set');
            return NextResponse.json({ error: 'Email service not fully configured' }, { status: 500 });
        }

        console.log('Attempting to send email with Resend...');

        const emailHtml = await render(
            React.createElement(EmailTemplate, {
                name,
                email,
                organization,
                subject,
                message
            })
        );

        const recipients = clientEmail.split(',').map(email => email.trim());

        const data = await resend.emails.send({
            from: fromEmail,
            to: recipients,
            subject: `Contact Form: ${subject}`,
            replyTo: email,
            html: emailHtml,
        });

        console.log('Resend response:', data);

        if (data.error) {
            console.error('Resend error:', data.error);
            return NextResponse.json({ error: data.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Detailed error:', error);
        return NextResponse.json({
            error: error?.message || 'Internal Server Error',
            details: error?.toString()
        }, { status: 500 });
    }
}