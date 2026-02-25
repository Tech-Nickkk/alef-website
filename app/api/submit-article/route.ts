import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ArticleSubmissionTemplate } from '@/app/components/ArticleSubmissionTemplate';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const content = formData.get('content') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const showAuthorName = formData.get('showAuthorName') === 'true';
        const image = formData.get('image') as File | null;

        const clientEmail = process.env.CLIENT_EMAIL;
        const fromEmail = process.env.RESEND_FROM_EMAIL;

        if (!process.env.RESEND_API_KEY || !clientEmail || !fromEmail) {
            console.error('RESEND_API_KEY, CLIENT_EMAIL, or RESEND_FROM_EMAIL is not set');
            return NextResponse.json({ error: 'Email service not fully configured' }, { status: 500 });
        }

        let attachments = [];

        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            attachments.push({
                content: buffer,
                filename: image.name,
            });
        }

        const emailHtml = await render(
            React.createElement(ArticleSubmissionTemplate, {
                name,
                email,
                title,
                excerpt,
                content,
                showAuthorName
            })
        );

        const recipients = clientEmail.split(',').map(e => e.trim());

        const data = await resend.emails.send({
            from: fromEmail,
            to: recipients,
            subject: `New Article Submission: ${title}`,
            replyTo: email,
            html: emailHtml,
            attachments: attachments
        });

        if (data.error) {
            console.error('Resend error:', data.error);
            return NextResponse.json({ error: data.error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('Submission error:', error);
        return NextResponse.json({
            error: error?.message || 'Internal Server Error',
        }, { status: 500 });
    }
}
