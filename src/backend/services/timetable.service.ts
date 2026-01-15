// Backend service for timetable management

import { StorageService } from './storage';
import { mockTimetable } from '@/lib/data';
import type { TimetableEntry } from '@/lib/types';

export class TimetableService {
  static async getTimetable(): Promise<TimetableEntry[]> {
    const stored = StorageService.getTimetable();
    return stored || mockTimetable;
  }

  static async getTimetableByDivision(division: string): Promise<TimetableEntry[]> {
    const timetable = await this.getTimetable();
    return timetable.filter(t => t.division === division);
  }

  static async saveTimetable(timetable: TimetableEntry[]): Promise<void> {
    StorageService.saveTimetable(timetable);
  }
}
