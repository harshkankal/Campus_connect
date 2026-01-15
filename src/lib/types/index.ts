export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string; // email is optional
}

export interface Comment {
  id: string;
  user: string;
  role: UserRole;
  text: string;
  avatarUrl: string;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  imageHint: string;
  description: string;
  tags: string[];
  date: string;
  location: string;
  createdBy: string;
  rsvps: string[];
  likes: number;
  comments: Comment[];
}

export interface TimetableEntry {
  id: string;
  division: string;
  subject: string;
  facultyId: string;
  facultyName: string;
  classroomId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeSlot: string;
  type: 'Lecture' | 'Lab';
}

export interface Classroom {
  id: string;
  name: string;
}

export interface Department {
    id: string;
    name: string;
}

export interface Division {
  id: string;
  name: string;
  departmentId: string;
}

export type AttendanceMethod = 'Camera' | 'RFID' | 'Manual';

export interface Student {
  id: string;
  name: string;
  division: string;
  status: 'Present' | 'Absent';
  timestamp?: string;
  image?: string;
  method?: string;
  rfidVerified?: boolean;
  email?: string; // email is optional
}

export interface AttendanceHistoryLog {
    subject: string;
    date: string;
    records: Student[];
}
