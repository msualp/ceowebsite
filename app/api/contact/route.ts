import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected request body structure
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  reason: z.enum(['General Inquiry', 'Speaking / Media', 'Collaboration', 'Investment / Business']),
  message: z.string().min(1, 'Message is required'),
  _bot: z.string().optional(), // honeypot
  token: z.string().min(1, 'reCAPTCHA token is required'),
});

// Create a transporter for sending emails
// For production, you would use real SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASSWORD || 'password',
  },
});

const ipRateMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = ipRateMap.get(ip) || 0;
  if (now - last < 60 * 1000) return true;
  ipRateMap.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: 'Rate limited. Try again later.' }, { status: 429 });
    }

    const raw = await request.json();
    const result = contactSchema.safeParse(raw);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const data = result.data;

    if (data._bot && data._bot.trim() !== '') {
      return NextResponse.json({ success: false, message: 'Spam detected.' }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET;
    if (!secretKey) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA secret not set' }, { status: 500 });
    }

    const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${data.token}`
    });

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success || captchaJson.score < 0.5) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA failed. Please try again.' }, { status: 403 });
    }

    // Log the contact form submission
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      from: ip,
      name: data.name,
      email: data.email,
      subject: data.subject,
      reason: data.reason,
      message: data.message.slice(0, 100),
    }));
    
    // Prepare email to the site owner
    const mailOptions = {
      from: process.env.SMTP_FROM || 'website@sualp.com',
      to: process.env.CONTACT_EMAIL || 'mustafa@sualp.com',
      subject: `Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Reason: ${data.reason}
Subject: ${data.subject}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Reason:</strong> ${data.reason}</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Send the email
    // In development, you might want to comment this out or use a service like Mailtrap
    if (process.env.NODE_ENV === 'production') {
      try {
        await transporter.sendMail(mailOptions);
        console.log('Contact form email sent successfully');
      } catch (error) {
        console.error('Error sending contact form email:', error);
        // We don't want to fail the request if email sending fails
        // Just log the error and continue
      }
    } else {
      // In development, just log the email content
      console.log('Development mode - Email would be sent with:', mailOptions);
    }
    
    // Prepare confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM || 'mustafa@sualp.com',
      to: data.email,
      subject: 'Thank you for your message',
      text: `
Dear ${data.name},

Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.

Best regards,
Mustafa Sualp
      `,
      html: `
<h2>Thank you for your message</h2>
<p>Dear ${data.name},</p>
<p>Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br>Mustafa Sualp</p>
      `,
    };
    
    // Send confirmation email
    if (process.env.NODE_ENV === 'production') {
      try {
        await transporter.sendMail(confirmationMailOptions);
        console.log('Confirmation email sent successfully');
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        // We don't want to fail the request if email sending fails
        // Just log the error and continue
      }
    } else {
      // In development, just log the email content
      console.log('Development mode - Confirmation email would be sent with:', confirmationMailOptions);
    }
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. Thank you for reaching out!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
