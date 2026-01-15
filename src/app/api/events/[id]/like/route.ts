// API Route: POST /api/events/[id]/like - Like an event

import { NextRequest, NextResponse } from 'next/server';
import { EventsService } from '@/backend/services';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await EventsService.likeEvent(params.id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to like event' },
      { status: 500 }
    );
  }
}
