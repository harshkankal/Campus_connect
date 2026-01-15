'use client';

import { useState, Suspense, useEffect } from 'react';
import { EventCard } from '@/components/features/events/event-card';
import { CreateEventSheet } from '@/components/features/events/create-event-sheet';
import { eventsAPI } from '@/lib/api/client';
import { Plus } from 'lucide-react';
import type { UserRole, Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

function EventsContent({ role }: { role: UserRole }) {
  const canCreate = role === 'admin' || role === 'faculty';
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events', error);
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (newEventData: Omit<Event, 'id' | 'likes' | 'rsvps' | 'comments'>) => {
    try {
      const newEvent = await eventsAPI.createEvent(newEventData);
      setEvents(prevEvents => [newEvent, ...prevEvents]);
      toast({
        title: 'Event Created',
        description: 'The event has been successfully created.',
      });
    } catch (error) {
      console.error('Failed to create event', error);
      toast({
        title: 'Error',
        description: 'Failed to create event',
        variant: 'destructive',
      });
    }
  };
  
  const handleRemoveEvent = async (eventId: string) => {
    try {
      await eventsAPI.deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      toast({
        title: "Event Removed",
        description: "The event has been successfully removed.",
      });
    } catch (error) {
      console.error('Failed to delete event', error);
      toast({
        title: 'Error',
        description: 'Failed to remove event',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Events</h1>
          <p className="text-muted-foreground">
            Discover what's happening around you.
          </p>
        </div>
        {canCreate && (
          <CreateEventSheet onCreateEvent={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </CreateEventSheet>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} role={role} onRemove={handleRemoveEvent} />
        ))}
      </div>
    </div>
  );
}

// We need to extract the searchParams logic into a wrapper component
function EventsPageContent({ searchParams }: { searchParams: { role: string | null }}) {
    const role = (searchParams.role as UserRole) || 'student';
    return <EventsContent role={role} />;
}

export default function EventsPage({ searchParams }: { searchParams: { role: string | null }}) {
    return (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <EventsPageContent searchParams={searchParams} />
        </Suspense>
    );
}
