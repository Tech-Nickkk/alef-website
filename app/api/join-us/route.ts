import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, phone } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and First Name are required' }, { status: 400 });
    }

    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (!ghlApiKey || !ghlLocationId) {
      console.error('GHL_API_KEY or GHL_LOCATION_ID is not set.');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // 1. Add or update contact in GoHighLevel without overwriting tags
    const ghlBody: Record<string, any> = {
      email,
      firstName,
      lastName: lastName || '',
      locationId: ghlLocationId,
    };

    if (phone) {
      ghlBody.phone = phone;
    }

    // Use /contacts/upsert to update existing user
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
      const errorText = await ghlResponse.text();
      console.error('GHL API Error:', ghlResponse.status, errorText);
      return NextResponse.json({ error: 'Failed to save contact. Please try again.' }, { status: 500 });
    }

    const ghlData = await ghlResponse.json();
    const contactId = ghlData?.contact?.id;

    if (contactId) {
      // Append the tag without overwriting existing tags
      try {
        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: [' alef our subscriber']
          }),
        });
        console.log('Successfully appended tag to contact in GHL');
      } catch (tagErr) {
        console.error('Error adding tag to GHL contact:', tagErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });

  } catch (error) {
    console.error('Join Us Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}