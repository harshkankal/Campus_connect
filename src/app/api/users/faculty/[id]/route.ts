// API Route: GET /api/users/faculty/[id] - Get faculty by ID
// API Route: PATCH /api/users/faculty/[id] - Update faculty
// API Route: DELETE /api/users/faculty/[id] - Delete faculty

import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faculty = await UsersService.getFacultyById(params.id);
    if (!faculty) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
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
    const updated = await UsersService.updateFaculty(params.id, updates);
    if (!updated) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update faculty' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await UsersService.deleteFaculty(params.id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    );
  }
}
