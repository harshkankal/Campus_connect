// Backend storage service - handles data persistence
// Currently uses localStorage as a mock, but can be replaced with database calls

import type { Student, User, Event, AttendanceHistoryLog } from '@/lib/types';

const STORAGE_KEYS = {
  STUDENTS: 'students',
  FACULTY: 'faculty',
  EVENTS: 'events',
  ATTENDANCE: 'attendanceHistory',
  TIMETABLE: 'timetable',
  LIVE_ATTENDANCE: 'liveAttendanceState',
} as const;

export class StorageService {
  // Students
  static getStudents(): Student[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get students from storage', e);
      return [];
    }
  }

  static saveStudents(students: Student[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to storage', e);
    }
  }

  // Faculty
  static getFaculty(): User[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACULTY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get faculty from storage', e);
      return [];
    }
  }

  static saveFaculty(faculty: User[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
    } catch (e) {
      console.error('Failed to save faculty to storage', e);
    }
  }

  // Events
  static getEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get events from storage', e);
      return [];
    }
  }

  static saveEvents(events: Event[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to save events to storage', e);
    }
  }

  // Attendance History
  static getAttendanceHistory(): AttendanceHistoryLog[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get attendance history from storage', e);
      return [];
    }
  }

  static saveAttendanceHistory(history: AttendanceHistoryLog[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save attendance history to storage', e);
    }
  }

  // Live Attendance State
  static getLiveAttendanceState(): any {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIVE_ATTENDANCE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get live attendance state from storage', e);
      return null;
    }
  }

  static saveLiveAttendanceState(state: any): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.LIVE_ATTENDANCE, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save live attendance state to storage', e);
    }
  }

  // Timetable
  static getTimetable(): any {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get timetable from storage', e);
      return null;
    }
  }

  static saveTimetable(timetable: any): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
    } catch (e) {
      console.error('Failed to save timetable to storage', e);
    }
  }
}
