// API Route: GET /api/users/faculty - Get all faculty
// API Route: POST /api/users/faculty - Create faculty member

import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services';

export async function GET() {
  try {
    const faculty = await UsersService.getFaculty();
    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const facultyMember = await request.json();
    const created = await UsersService.createFaculty(facultyMember);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create faculty member' },
      { status: 500 }
    );
  }
}
