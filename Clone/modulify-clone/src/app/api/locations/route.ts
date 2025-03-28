import { NextRequest, NextResponse } from 'next/server';
import { locations } from '@/data/static/db';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
