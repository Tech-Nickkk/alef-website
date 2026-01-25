import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and First Name are required' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey!,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName || '',
        },
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}