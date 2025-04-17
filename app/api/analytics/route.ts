/**
 * Analytics API Route
 * 
 * This API route receives web vitals metrics and other analytics data.
 * In a production environment, this would typically send the data to an analytics service.
 * For now, it just logs the data and returns a success response.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check if the request has content
    const contentType = request.headers.get('content-type');
    const contentLength = request.headers.get('content-length');
    
    // If there's no content or it's not JSON, return a 400 Bad Request
    if (!contentType?.includes('application/json') || contentLength === '0') {
      return NextResponse.json(
        { success: false, message: 'Request must include JSON body' },
        { status: 400 }
      );
    }
    
    // Clone the request to read the body as text first
    const clonedRequest = request.clone();
    const bodyText = await clonedRequest.text();
    
    // Check if the body is empty
    if (!bodyText || bodyText.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Request body is empty' },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const body = JSON.parse(bodyText);
    
    // Log the metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics API]', body);
    }
    
    // In a production environment, you would send this data to your analytics service
    // For example:
    // await sendToAnalyticsService(body);
    
    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error
    console.error('[Analytics API] Error:', error);
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    // Return a general error response
    return NextResponse.json(
      { success: false, message: 'Failed to process analytics data' },
      { status: 500 }
    );
  }
}

/**
 * This is a placeholder function for sending data to an analytics service.
 * In a real implementation, this would send the data to your analytics service of choice.
 * 
 * @param data - The analytics data to send
 */
async function sendToAnalyticsService(data: any) {
  // This is where you would implement the logic to send data to your analytics service
  // For example:
  // await fetch('https://your-analytics-service.com/api/metrics', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
  //   },
  //   body: JSON.stringify(data),
  // });
  
  // For now, just log the data
  console.log('[Analytics Service] Would send:', data);
}
