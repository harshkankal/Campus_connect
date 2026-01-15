// API Route: GET /api/timetable - Get timetable
// API Route: POST /api/timetable - Save timetable

import { NextRequest, NextResponse } from 'next/server';
import { TimetableService } from '@/backend/services';
import type { TimetableEntry } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get('division');
    
    if (division) {
      const timetable = await TimetableService.getTimetableByDivision(division);
      return NextResponse.json(timetable);
    }
    
    const timetable = await TimetableService.getTimetable();
    return NextResponse.json(timetable);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch timetable' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const timetable: TimetableEntry[] = await request.json();
    await TimetableService.saveTimetable(timetable);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save timetable' },
      { status: 500 }
    );
  }
}
