// API Route: GET /api/users/students - Get all students
// API Route: POST /api/users/students - Create a student

import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services';

export async function GET() {
  try {
    const students = await UsersService.getStudents();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const student = await request.json();
    const created = await UsersService.createStudent(student);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}
