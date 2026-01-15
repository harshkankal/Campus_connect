// Backend service for attendance management

import { StorageService } from './storage';
import type { AttendanceHistoryLog, Student } from '@/lib/types';

export class AttendanceService {
  static async getAttendanceHistory(): Promise<AttendanceHistoryLog[]> {
    return StorageService.getAttendanceHistory();
  }

  static async saveAttendanceHistory(history: AttendanceHistoryLog[]): Promise<void> {
    StorageService.saveAttendanceHistory(history);
  }

  static async addAttendanceLog(log: AttendanceHistoryLog): Promise<void> {
    const history = await this.getAttendanceHistory();
    const updated = [log, ...history];
    await this.saveAttendanceHistory(updated);
  }

  static async getLiveAttendanceState(): Promise<any> {
    return StorageService.getLiveAttendanceState();
  }

  static async saveLiveAttendanceState(state: any): Promise<void> {
    StorageService.saveLiveAttendanceState(state);
  }
}
