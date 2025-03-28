import { NextRequest, NextResponse } from 'next/server';
import { tags } from '@/data/static/db';

export async function GET(request: NextRequest) {
  try {
    // Format tags as objects with id and name
    const formattedTags = tags.map((name, index) => ({
      id: `tag-${index}`,
      name
    }));

    return NextResponse.json({ tags: formattedTags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
