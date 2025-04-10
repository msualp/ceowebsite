import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Store the email in a database
    // 2. Send a confirmation email
    // 3. Add the email to a newsletter service like Mailchimp, SendGrid, etc.
    
    // For now, we'll just simulate a successful subscription
    console.log(`Newsletter subscription: ${email}`);

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to the newsletter' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request' 
      },
      { status: 500 }
    );
  }
}
