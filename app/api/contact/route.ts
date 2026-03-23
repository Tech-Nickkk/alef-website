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

        // --- 1. Add contact to GoHighLevel with "alef contact form" tag ---
        const ghlApiKey = process.env.GHL_API_KEY;
        const ghlLocationId = process.env.GHL_LOCATION_ID;

        if (ghlApiKey && ghlLocationId) {
            const nameParts = name ? name.split(' ') : [''];
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');

            const ghlBody: Record<string, any> = {
                email,
                firstName,
                lastName,
                tags: ['alef contact form'],
                locationId: ghlLocationId,
                customFields: [
                    {
                        key: "alef_website_message",
                        field_value: message || "",
                    },
                    {
                        key: "alef_website_subject",
                        field_value: subject || "",
                    },
                    {
                        key: "alef_website_organization",
                        field_value: organization || "",
                    }
                ]
            };

            if (organization) {
                ghlBody.companyName = organization;
            }

            try {
                // Use /contacts/upsert to gracefully update existing users
                const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${ghlApiKey}`,
                        'Version': '2021-07-28',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ghlBody),
                });

                if (!ghlResponse.ok) {
                    console.error('GHL API Error in Contact:', ghlResponse.status, await ghlResponse.text());
                } else {
                    console.log('Successfully added contact to GHL from contact page');
                }
            } catch (ghlErr) {
                console.error('Error sending contact to GHL:', ghlErr);
            }
        }


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