'use client';

import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';

const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string(),
  tags: z.string(),
  visibility: z.enum(['division-wide', 'college-wide']),
  location: z.string().min(3, 'Location is required.'),
  date: z.string().min(1, 'Date is required.'),
  image: z.any().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface CreateEventSheetProps {
  children: React.ReactNode;
  onCreateEvent: (event: Omit<Event, 'id' | 'likes' | 'rsvps' | 'comments'>) => void;
}

export function CreateEventSheet({ children, onCreateEvent }: CreateEventSheetProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      visibility: 'college-wide',
      location: '',
      date: '',
    },
  });

  const onFormSubmit = form.handleSubmit((data) => {
    const newEvent = {
        title: data.title,
        description: data.description,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: new Date(data.date).toISOString(),
        location: data.location,
        image: 'https://picsum.photos/seed/new/600/400',
        imageHint: 'new event',
        createdBy: 'current-user', // This would be dynamic in a real app
    };
    onCreateEvent(newEvent);
    toast({
        title: "Event created!",
        description: "Your event has been successfully created.",
    });
    setIsOpen(false); // Close the sheet
    form.reset(); // Reset form for next time
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>{children}</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Create a New Event</SheetTitle>
          <SheetDescription>
            Fill in the details for your event.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <form id="event-form" onSubmit={onFormSubmit} className="space-y-4">
             <div>
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" {...form.register('title')} />
                {form.formState.errors.title && <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>}
             </div>
              <div>
                <Label htmlFor="date">Event Date and Time</Label>
                <Input id="date" type="datetime-local" {...form.register('date')} />
                {form.formState.errors.date && <p className="text-sm text-destructive mt-1">{form.formState.errors.date.message}</p>}
             </div>
             <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register('location')} placeholder="e.g., Main Auditorium" />
                {form.formState.errors.location && <p className="text-sm text-destructive mt-1">{form.formState.errors.location.message}</p>}
             </div>
             <div>
                <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="description">Description</Label>
                </div>
                <Textarea id="description" {...form.register('description')} rows={5} />
             </div>
             <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...form.register('tags')} placeholder="e.g., Tech, Workshop, AI" />
             </div>
             <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select onValueChange={(value) => form.setValue('visibility', value as 'division-wide' | 'college-wide')} defaultValue="college-wide">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="college-wide">College-Wide</SelectItem>
                    <SelectItem value="division-wide">Division-Wide</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </form>
        </div>
        <SheetFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" form="event-form">Create Event</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
