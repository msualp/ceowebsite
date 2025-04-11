import { NextResponse } from 'next/server';
import { getInsights } from '@/app/insights/getInsights';

export async function GET() {
  try {
    const posts = await getInsights();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}
