// API Route: GET /api/events - Get all events
// API Route: POST /api/events - Create an event

import { NextRequest, NextResponse } from 'next/server';
import { EventsService } from '@/backend/services';
import type { Event } from '@/lib/types';

export async function GET() {
  try {
    const events = await EventsService.getEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    const event = await EventsService.createEvent(eventData);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
