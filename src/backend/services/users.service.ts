// Backend service for user management (students, faculty, admins)

import { StorageService } from './storage';
import { mockStudents, mockFaculty, mockAdmins } from '@/lib/data';
import type { Student, User, FacultyUser } from '@/lib/types';

export class UsersService {
  // Students
  static async getStudents(): Promise<Student[]> {
    const stored = StorageService.getStudents();
    return stored.length > 0 ? stored : mockStudents;
  }

  static async getStudentById(id: string): Promise<Student | null> {
    const students = await this.getStudents();
    return students.find(s => s.id === id) || null;
  }

  static async createStudent(student: Student): Promise<Student> {
    const students = await this.getStudents();
    const updated = [...students, student];
    StorageService.saveStudents(updated);
    return student;
  }

  static async updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
    const students = await this.getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    const updated = { ...students[index], ...updates };
    students[index] = updated;
    StorageService.saveStudents(students);
    return updated;
  }

  static async deleteStudent(id: string): Promise<boolean> {
    const students = await this.getStudents();
    const filtered = students.filter(s => s.id !== id);
    StorageService.saveStudents(filtered);
    return filtered.length < students.length;
  }

  // Faculty
  static async getFaculty(): Promise<User[]> {
    const stored = StorageService.getFaculty();
    return stored.length > 0 ? stored : mockFaculty;
  }

  static async getFacultyById(id: string): Promise<User | null> {
    const faculty = await this.getFaculty();
    return faculty.find(f => f.id === id) || null;
  }

  static async createFaculty(faculty: FacultyUser): Promise<FacultyUser> {
    const facultyList = await this.getFaculty();
    const updated = [...facultyList, faculty];
    StorageService.saveFaculty(updated);
    return faculty;
  }

  static async updateFaculty(id: string, updates: Partial<FacultyUser>): Promise<User | null> {
    const faculty = await this.getFaculty();
    const index = faculty.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    const updated = { ...faculty[index], ...updates };
    faculty[index] = updated;
    StorageService.saveFaculty(faculty);
    return updated;
  }

  static async deleteFaculty(id: string): Promise<boolean> {
    const faculty = await this.getFaculty();
    const filtered = faculty.filter(f => f.id !== id);
    StorageService.saveFaculty(filtered);
    return filtered.length < faculty.length;
  }

  // Get all users (for login/auth)
  static async getAllUsers(): Promise<User[]> {
    const [students, faculty] = await Promise.all([
      this.getStudents(),
      this.getFaculty(),
    ]);

    return [
      ...students.map(s => ({
        id: s.id,
        name: s.name,
        role: 'student' as const,
        email: `${s.name.split(' ').join('.').toLowerCase()}@campus.com`,
      })),
      ...faculty,
      ...mockAdmins,
    ];
  }
}
