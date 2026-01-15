// Backend service for event management

import { StorageService } from './storage';
import { mockEvents } from '@/lib/data';
import type { Event } from '@/lib/types';

export class EventsService {
  static async getEvents(): Promise<Event[]> {
    const stored = StorageService.getEvents();
    return stored.length > 0 ? stored : mockEvents;
  }

  static async getEventById(id: string): Promise<Event | null> {
    const events = await this.getEvents();
    return events.find(e => e.id === id) || null;
  }

  static async createEvent(eventData: Omit<Event, 'id' | 'likes' | 'rsvps' | 'comments'>): Promise<Event> {
    const events = await this.getEvents();
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      likes: 0,
      rsvps: [],
      comments: [],
    };
    const updated = [newEvent, ...events];
    StorageService.saveEvents(updated);
    return newEvent;
  }

  static async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    const events = await this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    const updated = { ...events[index], ...updates };
    events[index] = updated;
    StorageService.saveEvents(events);
    return updated;
  }

  static async deleteEvent(id: string): Promise<boolean> {
    const events = await this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    StorageService.saveEvents(filtered);
    return filtered.length < events.length;
  }

  static async likeEvent(id: string): Promise<Event | null> {
    const event = await this.getEventById(id);
    if (!event) return null;
    return this.updateEvent(id, { likes: event.likes + 1 });
  }

  static async rsvpEvent(id: string, userId: string): Promise<Event | null> {
    const event = await this.getEventById(id);
    if (!event) return null;
    
    const rsvps = event.rsvps.includes(userId)
      ? event.rsvps.filter(u => u !== userId)
      : [...event.rsvps, userId];
    
    return this.updateEvent(id, { rsvps });
  }

  static async addComment(id: string, comment: { id: string; user: string; role: string; text: string; avatarUrl?: string }): Promise<Event | null> {
    const event = await this.getEventById(id);
    if (!event) return null;
    
    const comments = [...event.comments, comment];
    return this.updateEvent(id, { comments });
  }
}
