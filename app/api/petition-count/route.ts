import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (!ghlApiKey || !ghlLocationId) {
      console.error('GHL_API_KEY or GHL_LOCATION_ID is not set.');
      return NextResponse.json({ count: 0, error: 'Server misconfigured' }, { status: 500 });
    }

    const response = await fetch('https://services.leadconnectorhq.com/contacts/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        locationId: ghlLocationId,
        filters: [
          {
            field: 'tags',
            operator: 'eq',
            value: 'haa petition signer'
          }
        ],
        pageLimit: 1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL API Search Error:', response.status, errorText);
      return NextResponse.json({ count: 0, error: 'Failed to fetch contact count' }, { status: 500 });
    }

    interface GHLSearchResponse {
      total?: number;
    }

    const data = (await response.json()) as GHLSearchResponse;
    const count = data.total || 0;

    return NextResponse.json({ count });

  } catch (error) {
    console.error('Petition Count Route Error:', error);
    return NextResponse.json({ count: 0, error: 'Internal Server Error' }, { status: 500 });
  }
}
