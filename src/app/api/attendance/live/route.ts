// API Route: GET /api/attendance/live - Get live attendance state
// API Route: POST /api/attendance/live - Save live attendance state

import { NextRequest, NextResponse } from 'next/server';
import { AttendanceService } from '@/backend/services';

export async function GET() {
  try {
    const state = await AttendanceService.getLiveAttendanceState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch live attendance state' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const state = await request.json();
    await AttendanceService.saveLiveAttendanceState(state);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save live attendance state' },
      { status: 500 }
    );
  }
}
