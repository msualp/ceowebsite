import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the tags.json file
    const tagsPath = path.join(process.cwd(), 'data', 'tags.json');
    const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
    
    return NextResponse.json(tagsData);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
