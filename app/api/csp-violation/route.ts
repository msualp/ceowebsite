import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const report = await req.json();
    console.warn('🛡️ CSP Violation Report:', JSON.stringify(report, null, 2));
  } catch (err) {
    console.error('❌ Failed to parse CSP report:', err);
  }

  return NextResponse.json({ received: true });
}
