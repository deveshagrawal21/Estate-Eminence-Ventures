import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/data/static/users';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log('Registration error: Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      console.log('Registration error: Email already exists', email);
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = createUser({
      name,
      email,
      password,
      role: 'user',
      provider: 'credentials',
      savedProperties: [],
      preferences: {
        notifications: true,
        emailUpdates: true
      }
    });

    if (!newUser) {
      console.log('Registration error: Failed to create user');
      return NextResponse.json(
        { success: false, message: 'Failed to create user' },
        { status: 500 }
      );
    }

    console.log('User registered successfully:', email);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
