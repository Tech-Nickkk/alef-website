import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, organization, subject, message } = body;

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
                // Use /contacts/upsert to gracefully update existing users without overwriting tags
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
                    const ghlData = await ghlResponse.json();
                    const contactId = ghlData?.contact?.id;

                    if (contactId) {
                        try {
                            await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${ghlApiKey}`,
                                    'Version': '2021-07-28',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    tags: ['alef contact form']
                                }),
                            });
                            console.log('Successfully appended tag to GHL contact');
                        } catch (tagErr) {
                            console.error('Error adding tag to GHL contact:', tagErr);
                        }
                    }
                    console.log('Successfully added/updated contact in GHL from contact page');
                }
            } catch (ghlErr) {
                console.error('Error sending contact to GHL:', ghlErr);
            }
        }


        return NextResponse.json({ success: true, message: 'Contact submitted successfully' });
    } catch (error: any) {
        console.error('Detailed error:', error);
        return NextResponse.json({
            error: error?.message || 'Internal Server Error',
            details: error?.toString()
        }, { status: 500 });
    }
}