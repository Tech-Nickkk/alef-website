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

    interface GHLContactBody {
      email: string;
      firstName: string;
      lastName: string;
      locationId: string;
      phone?: string;
    }

    const ghlBody: GHLContactBody = {
      email,
      firstName,
      lastName: lastName || '',
      locationId: ghlLocationId,
    };

    if (phone) {
      ghlBody.phone = phone;
    }

    // Upsert the contact to avoid duplicates
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

    interface GHLUpsertResponse {
      contact?: {
        id: string;
      };
    }

    const ghlData = (await ghlResponse.json()) as GHLUpsertResponse;
    const contactId = ghlData?.contact?.id;

    if (contactId) {
      // Append the tags without overwriting existing ones
      try {
        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: ['alef our subscribers', 'haa petition signer']
          }),
        });
        console.log('Successfully tagged contact as petition signer in GHL');
      } catch (tagErr) {
        console.error('Error adding tags to GHL contact:', tagErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Petition signed successfully' });

  } catch (error) {
    console.error('Sign Petition Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
