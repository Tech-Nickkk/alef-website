import { NextResponse, NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody(
            req,
            process.env.SANITY_WEBHOOK_SECRET
        );

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
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const routeMap: { [key: string]: string } = {
            blog: 'blogs-and-articles',
            video: 'videos',
            short: 'shorts',
            podcast: 'podcasts'
        };

        const folder = routeMap[docType] || docType;
        const fullUrl = `https://usalef.org/en/${folder}/${slugString}`;

        // === 1. Fetch Contacts from GHL ===
        const ghlApiKey = process.env.GHL_API_KEY;
        const ghlLocationId = process.env.GHL_LOCATION_ID;
        const ghlWorkflowId = process.env.GHL_NOTIFY_WORKFLOW_ID;

        if (!ghlApiKey || !ghlLocationId || !ghlWorkflowId) {
            console.error('GHL credentials or GHL_NOTIFY_WORKFLOW_ID missing');
            return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
        }

        // We fetch contacts that have the tag. GHL lets us search.
        const searchRes = await fetch('https://services.leadconnectorhq.com/contacts/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ghlApiKey}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locationId: ghlLocationId,
                query: "alef our subscriber",
                limit: 100 // Paging may be needed for very large lists
            }),
        });

        if (!searchRes.ok) {
            return NextResponse.json({ message: 'Failed to fetch GHL contacts' }, { status: 500 });
        }

        const { contacts } = await searchRes.json();

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ message: 'No subscribers found in GHL' });
        }

        // === 2. Add Contacts to a GHL Workflow ===
        // Note: You must create a workflow in GHL that handles the email sending.
        let successCount = 0;

        for (const contact of contacts) {
            // First update custom fields for title, url, type so the workflow email can use them
            await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${ghlApiKey}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customFields: [
                        { key: "latest_post_title", field_value: titleString },
                        { key: "latest_post_url", field_value: fullUrl },
                        { key: "latest_post_type", field_value: docType.toUpperCase() },
                    ]
                }),
            });

            // Then add to workflow
            const wfRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/workflow/${ghlWorkflowId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ghlApiKey}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventStartTime: new Date().toISOString()
                })
            });

            if (wfRes.ok) {
                successCount++;
            }
        }

        return NextResponse.json({ success: true, message: `Successfully triggered workflow for ${successCount} contacts.` });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
