import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log('Successfully added/updated contact in GHL');

    // 2. Send admin notification email
    try {
      const clientEmail = process.env.CLIENT_EMAIL;
      const fromEmail = process.env.RESEND_FROM_EMAIL;

      if (process.env.RESEND_API_KEY && clientEmail && fromEmail) {
        const recipients = clientEmail.split(',').map((e) => e.trim());

        await resend.emails.send({
          from: fromEmail,
          to: recipients,
          subject: `New Member Joined: ${firstName}`,
          html: `
            <h2>New Member Alert</h2>
            <p>A new member has joined the community.</p>
            <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          `,
        });
      } else {
        console.warn('RESEND_API_KEY, RESEND_FROM_EMAIL, or CLIENT_EMAIL not set — skipping notification email.');
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });

  } catch (error) {
    console.error('Join Us Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}