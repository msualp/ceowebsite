import { NextResponse } from 'next/server';
import { getInsights } from '@/app/insights/getInsights';

export async function GET() {
  try {
    const posts = await getInsights();
    
    // Ensure we're returning a properly formatted JSON array
    return new NextResponse(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}
