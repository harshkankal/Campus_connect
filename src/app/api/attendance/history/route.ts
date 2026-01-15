// API Route: GET /api/attendance/history - Get attendance history
// API Route: POST /api/attendance/history - Add attendance log

import { NextRequest, NextResponse } from 'next/server';
import { AttendanceService } from '@/backend/services';
import type { AttendanceHistoryLog } from '@/lib/types';

export async function GET() {
  try {
    const history = await AttendanceService.getAttendanceHistory();
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attendance history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const log: AttendanceHistoryLog = await request.json();
    await AttendanceService.addAttendanceLog(log);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save attendance log' },
      { status: 500 }
    );
  }
}
