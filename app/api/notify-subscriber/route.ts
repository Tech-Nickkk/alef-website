import { NextResponse, NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
    console.log('🔔 Webhook endpoint hit at:', new Date().toISOString());

    try {
        const { isValidSignature, body } = await parseBody(
            req,
            process.env.SANITY_WEBHOOK_SECRET
        );

        console.log('📦 Webhook parsed - Valid:', isValidSignature, 'Body:', JSON.stringify(body, null, 2));

        if (!isValidSignature) {
            console.error('Invalid Signature');
            return new Response('Invalid Signature', { status: 401 });
        }

        interface WebhookBody {
            _type: string;
            title?: string | { [key: string]: string };
            slug?: { current: string } | string;
            type?: string;
            [key: string]: any;
        }

        const { title, type, _type, slug } = body as unknown as WebhookBody;
        console.log('Received Webhook:', { title, type, _type, slug });

        // Handle slug if it's an object (common in Sanity) or string
        const slugString = typeof slug === 'object' && slug !== null && 'current' in slug
            ? slug.current
            : slug;

        // Handle localized title (e.g. { en: "..." }) or string
        const titleString = typeof title === 'object' && title !== null
            ? (title.en || Object.values(title)[0] || 'New Update')
            : title;

        const docType = type || _type;

        if (!titleString || !docType || !slugString) {
            console.error('Missing required fields:', { title: titleString, type: docType, slug: slugString });
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = Number(process.env.BREVO_LIST_ID);

        if (!apiKey || isNaN(listId)) {
            console.error('Missing Brevo Config');
            return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
        }

        const routeMap: { [key: string]: string } = {
            blog: 'blogs-and-articles',
            video: 'videos',
            short: 'shorts',
            podcast: 'podcasts'
        };

        const folder = routeMap[docType] || docType;
        const fullUrl = `https://usalef.org/en/${folder}/${slugString}`;

        // Fetch contacts (consider pagination if list > 500 in future, but ok for now)
        const contactsRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500`, {
            headers: { 'api-key': apiKey, 'Accept': 'application/json' },
        });

        if (!contactsRes.ok) {
            const err = await contactsRes.text();
            console.error('Brevo Fetch Contacts Error:', err);
            return NextResponse.json({ message: 'Failed to fetch contacts' }, { status: 500 });
        }

        const data = await contactsRes.json();

        if (!data.contacts || data.contacts.length === 0) {
            console.log('No subscribers found in list', listId);
            return NextResponse.json({ message: 'No subscribers found' });
        }

        const sendRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                templateId: 12,
                messageVersions: data.contacts.map((c: any) => ({
                    to: [{ email: c.email }],
                    params: {
                        FIRSTNAME: c.attributes?.FIRSTNAME || 'Friend',
                        CONTENT_TITLE: titleString,
                        CONTENT_TYPE: docType.toUpperCase(),
                        CONTENT_URL: fullUrl
                    }
                }))
            }),
        });

        const result = await sendRes.json();

        if (!sendRes.ok) {
            console.error('Brevo Send Error:', result);
            return NextResponse.json({ message: 'Failed to send emails', details: result }, { status: 500 });
        }

        console.log('Brevo Success:', result);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Notification Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
