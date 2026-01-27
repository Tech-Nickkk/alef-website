import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and First Name are required' }, { status: 400 });
    }

    // 1. Add to Brevo
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

    // 2. Send Notification Email to Client (Admin)
    try {
      const clientEmail = process.env.CLIENT_EMAIL;
      const fromEmail = process.env.RESEND_FROM_EMAIL;

      if (process.env.RESEND_API_KEY && clientEmail && fromEmail) {
        const recipients = clientEmail.split(',').map(email => email.trim());

        await resend.emails.send({
          from: fromEmail,
          to: recipients,
          subject: `New Member Joined: ${firstName}`, // ...
          html: `
            <h2>New Member Alert</h2>
            <p>A new member has joined the community.</p>
            <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
            <p><strong>Email:</strong> ${email}</p>
          `,
        });
      } else {
        console.warn('RESEND_API_KEY, RESEND_FROM_EMAIL, or CLIENT_EMAIL is not set, skipping notification email.');
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // We don't block the success response if the email fails, but we log it.
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });

  } catch (error) {
    console.error('Join Us Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}