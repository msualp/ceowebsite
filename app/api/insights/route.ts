import { NextResponse } from 'next/server';
import { getInsights } from '@/app/insights/getInsights';

export async function GET(request: Request) {
  try {
    // Get the category from the URL query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Fetch posts with optional category filter
    const posts = await getInsights(category || undefined);
    
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
