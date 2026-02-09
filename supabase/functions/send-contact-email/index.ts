import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

async function sendEmail(to: string, subject: string, html: string, from: string, replyTo: string) {
  const GMAIL_EMAIL = Deno.env.get('GMAIL_EMAIL');
  const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');

  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured in environment variables');
  }

  // Create the email message in RFC 2822 format
  const boundary = "----=_Part_0_" + Date.now();
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    html,
    `--${boundary}--`
  ].join('\r\n');

  // Connect to Gmail SMTP using raw TCP with TLS
  const conn = await Deno.connectTls({
    hostname: "smtp.gmail.com",
    port: 465,
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Helper to read response
  async function readResponse(): Promise<string> {
    const buffer = new Uint8Array(1024);
    const n = await conn.read(buffer);
    return decoder.decode(buffer.subarray(0, n || 0));
  }

  // Helper to send command
  async function sendCommand(command: string): Promise<string> {
    await conn.write(encoder.encode(command + '\r\n'));
    return await readResponse();
  }

  try {
    // Read server greeting
    await readResponse();

    // EHLO
    await sendCommand(`EHLO localhost`);

    // AUTH LOGIN
    await sendCommand('AUTH LOGIN');
    await sendCommand(btoa(GMAIL_EMAIL));
    await sendCommand(btoa(GMAIL_APP_PASSWORD));

    // MAIL FROM
    await sendCommand(`MAIL FROM:<${GMAIL_EMAIL}>`);

    // RCPT TO
    await sendCommand(`RCPT TO:<${to}>`);

    // DATA
    await sendCommand('DATA');
    await sendCommand(message + '\r\n.');

    // QUIT
    await sendCommand('QUIT');

    conn.close();
    return 'Email sent successfully';
  } catch (error) {
    conn.close();
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, company, projectType, message }: ContactSubmission = await req.json();

    const emailHtml = `
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #000;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 14px;">Reply directly to ${email} to respond to this inquiry.</p>
      </body>
      </html>
    `;

    const GMAIL_EMAIL = Deno.env.get('GMAIL_EMAIL');
    if (!GMAIL_EMAIL) {
      throw new Error('Gmail email not configured');
    }

    await sendEmail(
      GMAIL_EMAIL,
      `New Contact: ${name}${projectType ? ` - ${projectType}` : ''}`,
      emailHtml,
      GMAIL_EMAIL,
      email
    );

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Detailed error:', errorMessage);

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        details: 'Check edge function logs for more information'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
