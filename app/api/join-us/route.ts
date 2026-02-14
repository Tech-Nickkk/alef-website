import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Extracts the calling code digits from a phone number.
 * E.g., "+91 72838 29292" → tries "917", "91", "9"
 */
function extractCallingCode(phone: string): string | undefined {
  const cleaned = phone.replace(/[^\d+]/g, '');
  const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
  if (!digits) return undefined;
  return digits;
}

/**
 * Fetches the CloudTalk country_id by querying /countries/index.json and matching
 * the calling code extracted from the phone number against CloudTalk's `calling_code` field.
 */
async function getCloudTalkCountryId(phone: string, auth: string): Promise<number | undefined> {
  const phoneDigits = extractCallingCode(phone);
  if (!phoneDigits) return undefined;

  try {
    const url = 'https://my.cloudtalk.io/api/countries/index.json?limit=300';
    console.log('Fetching CloudTalk countries from:', url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('CloudTalk Countries API Error:', res.status, errText);
      return undefined;
    }

    const rawData = await res.json();
    console.log('CloudTalk Countries API raw response keys:', Object.keys(rawData));

    // Try various response structures CloudTalk might use
    let countries: any[] = [];
    if (rawData?.responseData?.data) {
      countries = rawData.responseData.data;
    } else if (rawData?.data) {
      countries = rawData.data;
    } else if (Array.isArray(rawData?.responseData)) {
      countries = rawData.responseData;
    } else if (Array.isArray(rawData)) {
      countries = rawData;
    }

    console.log(`CloudTalk Countries: found ${countries.length} entries`);
    if (countries.length > 0) {
      console.log('First country entry sample:', JSON.stringify(countries[0]));
    }

    // Try matching by calling_code (3-digit, 2-digit, 1-digit prefixes)
    for (const len of [3, 2, 1]) {
      const prefix = phoneDigits.slice(0, len);
      for (const entry of countries) {
        const c = entry?.Country || entry;
        const callingCode = String(c?.calling_code || '').replace(/\+/g, '');
        if (callingCode === prefix) {
          console.log(`Matched country: ${c?.name} (id: ${c?.id}) for calling code: ${prefix}`);
          return Number(c.id);
        }
      }
    }

    console.warn(`No country match found for phone: ${phone} (digits: ${phoneDigits})`);
    return undefined;
  } catch (err) {
    console.error('Error fetching CloudTalk countries:', err);
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, phone, country } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Email and First Name are required' }, { status: 400 });
    }

    // 1. Add to Brevo
    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    const brevoAttributes: any = {
      FIRSTNAME: firstName,
      LASTNAME: lastName || '',
    };

    if (phone) {
      brevoAttributes.SMS = phone;
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey!,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        attributes: brevoAttributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }

    // 2. Add to CloudTalk
    try {
      if (phone && process.env.CLOUDTALK_ACCESS_KEY_ID && process.env.CLOUDTALK_ACCESS_KEY_SECRET) {
        const cloudTalkUrl = 'https://my.cloudtalk.io/api/contacts/add.json';
        const auth = Buffer.from(`${process.env.CLOUDTALK_ACCESS_KEY_ID}:${process.env.CLOUDTALK_ACCESS_KEY_SECRET}`).toString('base64');

        const countryId = await getCloudTalkCountryId(phone, auth);

        const cloudTalkBody: Record<string, any> = {
          name: `${firstName} ${lastName || ''}`.trim(),
          company: "Alef Website Join Us",
          ContactNumber: [
            { public_number: phone }
          ],
          ContactEmail: [
            { email: email }
          ],
        };

        if (countryId) {
          cloudTalkBody.country_id = countryId;
        }

        console.log('CloudTalk Request Body:', JSON.stringify(cloudTalkBody, null, 2));

        const cloudTalkResponse = await fetch(cloudTalkUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cloudTalkBody),
        });

        const cloudTalkResponseText = await cloudTalkResponse.text();
        console.log('CloudTalk Response:', cloudTalkResponse.status, cloudTalkResponseText);

        if (!cloudTalkResponse.ok) {
          console.error('CloudTalk API Error:', cloudTalkResponse.status, cloudTalkResponseText);
        } else {
          console.log('Successfully added contact to CloudTalk');
        }
      }
    } catch (cloudTalkError) {
      console.error('CloudTalk Integration Error:', cloudTalkError);
    }

    // 3. Send Notification Email to Client (Admin)
    try {
      const clientEmail = process.env.CLIENT_EMAIL;
      const fromEmail = process.env.RESEND_FROM_EMAIL;

      if (process.env.RESEND_API_KEY && clientEmail && fromEmail) {
        const recipients = clientEmail.split(',').map(email => email.trim());

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
        console.warn('RESEND_API_KEY, RESEND_FROM_EMAIL, or CLIENT_EMAIL is not set, skipping notification email.');
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