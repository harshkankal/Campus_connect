// API Route: POST /api/events/[id]/rsvp - RSVP to an event

import { NextRequest, NextResponse } from 'next/server';
import { EventsService } from '@/backend/services';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const event = await EventsService.rsvpEvent(params.id, userId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to RSVP to event' },
      { status: 500 }
    );
  }
}
