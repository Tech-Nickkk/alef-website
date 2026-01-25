import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const signature = req.headers.get('x-sanity-signature');
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  if (!signature || signature !== secret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, type, slug } = await req.json();

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    const routeMap: { [key: string]: string } = {
      blog: 'blogs-and-articles',
      video: 'videos',
      short: 'shorts',
      podcast: 'podcasts',
      event: 'events'
    };

    const folder = routeMap[type] || type;
    const fullUrl = `https://usalef.org/en/${folder}/${slug}`; 

    const contactsRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500`, {
      headers: { 'api-key': apiKey!, 'Accept': 'application/json' },
    });
    const data = await contactsRes.json();

    if (!data.contacts || data.contacts.length === 0) {
      return NextResponse.json({ message: 'No subscribers found' });
    }

    const sendRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateId: 12,
        messageVersions: data.contacts.map((c: any) => ({
          to: [{ email: c.email }],
          params: {
            FIRSTNAME: c.attributes?.FIRSTNAME || 'Friend', 
            CONTENT_TITLE: title,
            CONTENT_TYPE: type.toUpperCase(),
            CONTENT_URL: fullUrl
          }
        }))
      }),
    });

    const result = await sendRes.json();
    console.log('Brevo response:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}