import { NextRequest, NextResponse } from 'next/server';
import { amenities } from '@/data/static/db';

export async function GET(request: NextRequest) {
  try {
    // Format amenities as objects with id and name
    const formattedAmenities = amenities.map((name, index) => ({
      id: `amenity-${index}`,
      name
    }));

    return NextResponse.json({ amenities: formattedAmenities });
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
