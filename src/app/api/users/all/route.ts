// API Route: GET /api/users/all - Get all users (for authentication)

import { NextResponse } from 'next/server';
import { UsersService } from '@/backend/services';

export async function GET() {
  try {
    const users = await UsersService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
