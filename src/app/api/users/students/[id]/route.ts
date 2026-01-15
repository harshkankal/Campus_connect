// API Route: GET /api/users/students/[id] - Get student by ID
// API Route: PATCH /api/users/students/[id] - Update student
// API Route: DELETE /api/users/students/[id] - Delete student

import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await UsersService.getStudentById(params.id);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const updated = await UsersService.updateStudent(params.id, updates);
    if (!updated) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await UsersService.deleteStudent(params.id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
