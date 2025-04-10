import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected request body structure
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  reason: string;
  message: string;
}

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

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json() as ContactFormData;
    
    // Validate required fields
    const validationErrors: Record<string, string> = {};
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      validationErrors.name = 'Name is required';
    }
    
    if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        validationErrors.email = 'Invalid email format';
      }
    }
    
    if (!data.subject || typeof data.subject !== 'string' || data.subject.trim() === '') {
      validationErrors.subject = 'Subject is required';
    }
    
    if (!data.message || typeof data.message !== 'string' || data.message.trim() === '') {
      validationErrors.message = 'Message is required';
    }
    
    // If there are validation errors, return them
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Log the contact form submission
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      reason: data.reason,
      message: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString(),
    });
    
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
