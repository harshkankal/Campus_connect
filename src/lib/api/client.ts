// Frontend API client - handles all API calls from the frontend

const API_BASE = '/api';

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Users API
export const usersAPI = {
  getStudents: () => fetchAPI('/users/students'),
  getStudent: (id: string) => fetchAPI(`/users/students/${id}`),
  createStudent: (student: any) =>
    fetchAPI('/users/students', {
      method: 'POST',
      body: JSON.stringify(student),
    }),
  updateStudent: (id: string, updates: any) =>
    fetchAPI(`/users/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  deleteStudent: (id: string) =>
    fetchAPI(`/users/students/${id}`, {
      method: 'DELETE',
    }),
  getFaculty: () => fetchAPI('/users/faculty'),
  getFacultyMember: (id: string) => fetchAPI(`/users/faculty/${id}`),
  createFaculty: (faculty: any) =>
    fetchAPI('/users/faculty', {
      method: 'POST',
      body: JSON.stringify(faculty),
    }),
  updateFaculty: (id: string, updates: any) =>
    fetchAPI(`/users/faculty/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  deleteFaculty: (id: string) =>
    fetchAPI(`/users/faculty/${id}`, {
      method: 'DELETE',
    }),
  getAllUsers: () => fetchAPI('/users/all'),
};

// Events API
export const eventsAPI = {
  getEvents: () => fetchAPI('/events'),
  getEvent: (id: string) => fetchAPI(`/events/${id}`),
  createEvent: (eventData: any) =>
    fetchAPI('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  updateEvent: (id: string, updates: any) =>
    fetchAPI(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  deleteEvent: (id: string) =>
    fetchAPI(`/events/${id}`, {
      method: 'DELETE',
    }),
  likeEvent: (id: string) =>
    fetchAPI(`/events/${id}/like`, {
      method: 'POST',
    }),
  rsvpEvent: (id: string, userId: string) =>
    fetchAPI(`/events/${id}/rsvp`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

// Attendance API
export const attendanceAPI = {
  getHistory: () => fetchAPI('/attendance/history'),
  addLog: (log: any) =>
    fetchAPI('/attendance/history', {
      method: 'POST',
      body: JSON.stringify(log),
    }),
  getLiveState: () => fetchAPI('/attendance/live'),
  saveLiveState: (state: any) =>
    fetchAPI('/attendance/live', {
      method: 'POST',
      body: JSON.stringify(state),
    }),
};

// Timetable API
export const timetableAPI = {
  getTimetable: (division?: string) =>
    fetchAPI(division ? `/timetable?division=${division}` : '/timetable'),
  saveTimetable: (timetable: any) =>
    fetchAPI('/timetable', {
      method: 'POST',
      body: JSON.stringify(timetable),
    }),
};
