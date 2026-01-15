import type { TimetableEntry } from '../types';
import { mockDivisions } from './mock-data';
import { timetableTemplate } from './mock-data';

export const mockTimetable: TimetableEntry[] = mockDivisions.flatMap((division) => 
    timetableTemplate.map((entry, index) => ({
        ...entry,
        id: `${division.id}-${entry.day}-${entry.timeSlot}-${index}`,
        division: division.name,
    }))
);
