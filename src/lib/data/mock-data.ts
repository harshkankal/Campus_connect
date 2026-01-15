import type { Department, Division, Classroom, TimetableEntry } from '../types';

// Departments
export const mockDepartments: Department[] = [
    { id: 'ca', name: 'Computer Applications (CA)'},
    { id: 'aids', name: 'AI & Data Science (AIDS)'},
];

// Divisions
export const mockDivisions: Division[] = [
    { id: 'ca-fy-a', name: 'CA-FY-A', departmentId: 'ca' },
    { id: 'ca-sy-a', name: 'CA-SY-A', departmentId: 'ca' },
    { id: 'ca-ty-a', name: 'CA-TY-A', departmentId: 'ca' },
    { id: 'aids-fy-a', name: 'AIDS-FY-A', departmentId: 'aids' },
    { id: 'aids-sy-a', name: 'AIDS-SY-A', departmentId: 'aids' },
    { id: 'aids-ty-a', name: 'AIDS-TY-A', departmentId: 'aids' },
];

// Classrooms
export const mockClassrooms: Classroom[] = [
    { id: 'CR-1', name: 'Classroom 1' },
    { id: 'CR-2', name: 'Classroom 2' },
    { id: 'CR-3', name: 'Classroom 3' },
    { id: 'L1', name: 'Paloalto Networks' },
    { id: 'L2', name: 'AWS Lab' },
    { id: 'L3', name: 'FOSS lab' },
    { id: 'L3A', name: 'FOSS Lab A' },
    { id: 'L3B', name: 'FOSS lab B' },
    { id: 'L4', name: 'Oracle Lab' },
    { id: 'L5', name: 'Red Hat Academy' },
    { id: 'L6', name: 'DOMO Lab' },
    { id: 'L7', name: 'IoT Lab' },
    { id: 'L8', name: 'ETC Comp Lab' },
    { id: 'TA1', name: 'TA1' },
    { id: 'TA2', name: 'TA2' },
    { id: 'TA3', name: 'TA3' },
];

// Timetable Template
export const timetableTemplate: Omit<TimetableEntry, 'id' | 'division'>[] = [
    // Monday
    { day: 'Monday', timeSlot: '10:00 - 11:00', subject: 'DBMS', facultyName: 'Prof. Trupti Bhagat', facultyId: 'f-tb', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Monday', timeSlot: '11:00 - 12:00', subject: 'TOC', facultyName: 'Prof. Radhika Malpani', facultyId: 'f-rm', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Monday', timeSlot: '12:15 - 14:15', subject: 'LP-I(SPM)-TB3', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'L1', type: 'Lab' },
    { day: 'Monday', timeSlot: '12:15 - 14:15', subject: 'DBMSL-TB1', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L4', type: 'Lab' },
    { day: 'Monday', timeSlot: '12:15 - 14:15', subject: 'FOSS-TB2', facultyName: 'FOSS Faculty', facultyId: 'f-foss', classroomId: 'L2', type: 'Lab' },
    { day: 'Monday', timeSlot: '15:00 - 17:00', subject: 'CNS-TB2', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'L4', type: 'Lab' },
    { day: 'Monday', timeSlot: '15:00 - 17:00', subject: 'DBMSL-TB3', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L3A', type: 'Lab' },
    { day: 'Monday', timeSlot: '15:00 - 17:00', subject: 'FOSS-TB1', facultyName: 'FOSS Faculty', facultyId: 'f-foss', classroomId: 'L3', type: 'Lab' },

    // Tuesday
    { day: 'Tuesday', timeSlot: '10:00 - 11:00', subject: 'TOC', facultyName: 'Prof. Radhika Malpani', facultyId: 'f-rm', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Tuesday', timeSlot: '11:00 - 12:00', subject: 'DBMS', facultyName: 'Prof. Trupti Bhagat', facultyId: 'f-tb', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Tuesday', timeSlot: '12:15 - 14:15', subject: 'LP-I(SPOS)-TB1', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'L2', type: 'Lab' },
    { day: 'Tuesday', timeSlot: '12:15 - 14:15', subject: 'LP-I(SPM)-TB2', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'L1', type: 'Lab' },
    { day: 'Tuesday', timeSlot: '12:15 - 14:15', subject: 'DBMSL-TB3', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L6', type: 'Lab' },
    { day: 'Tuesday', timeSlot: '15:00 - 16:00', subject: 'CNS', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Tuesday', timeSlot: '16:00 - 17:00', subject: 'SPOS', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'CR-2', type: 'Lecture' },

    // Wednesday
    { day: 'Wednesday', timeSlot: '10:00 - 11:00', subject: 'TOC', facultyName: 'Prof. Radhika Malpani', facultyId: 'f-rm', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Wednesday', timeSlot: '11:00 - 12:00', subject: 'DBMS', facultyName: 'Prof. Trupti Bhagat', facultyId: 'f-tb', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Wednesday', timeSlot: '12:15 - 13:15', subject: 'CNS', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Wednesday', timeSlot: '13:15 - 14:15', subject: 'SPM', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Wednesday', timeSlot: '15:00 - 17:00', subject: 'CNS-TB1', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'L4', type: 'Lab' },
    { day: 'Wednesday', timeSlot: '15:00 - 17:00', subject: 'DBMSL-TB2', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L3A', type: 'Lab' },
    { day: 'Wednesday', timeSlot: '15:00 - 17:00', subject: 'FOSS-TB3', facultyName: 'FOSS Faculty', facultyId: 'f-foss', classroomId: 'L3', type: 'Lab' },

    // Thursday
    { day: 'Thursday', timeSlot: '10:00 - 11:00', subject: 'SPM', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Thursday', timeSlot: '11:00 - 12:00', subject: 'TOC', facultyName: 'Prof. Radhika Malpani', facultyId: 'f-rm', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Thursday', timeSlot: '12:15 - 13:15', subject: 'CNS', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Thursday', timeSlot: '13:15 - 14:15', subject: 'SPOS', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Thursday', timeSlot: '15:00 - 17:00', subject: 'LP-I(SPOS)-TB3', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'L2', type: 'Lab' },
    { day: 'Thursday', timeSlot: '15:00 - 17:00', subject: 'LP-I(SPM)-TB1', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'L1', type: 'Lab' },
    { day: 'Thursday', timeSlot: '15:00 - 17:00', subject: 'DBMSL-TB2', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L3A', type: 'Lab' },
    
    // Friday
    { day: 'Friday', timeSlot: '10:00 - 11:00', subject: 'SPOS', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Friday', timeSlot: '11:00 - 12:00', subject: 'SPM', facultyName: 'Prof. Vrushali Wankhede', facultyId: 'f-vw', classroomId: 'CR-2', type: 'Lecture' },
    { day: 'Friday', timeSlot: '12:15 - 14:15', subject: 'CNS-TB3', facultyName: 'Prof. Radha Tripathi', facultyId: 'f-rt', classroomId: 'L4', type: 'Lab' },
    { day: 'Friday', timeSlot: '12:15 - 14:15', subject: 'DBMSL-TB1', facultyName: 'Prof. Supriya Tambe', facultyId: 'f-st', classroomId: 'L1', type: 'Lab' },
    { day: 'Friday', timeSlot: '12:15 - 14:15', subject: 'LP-I(SPOS)-TB2', facultyName: 'Prof. Sandyarani Kalyane', facultyId: 'f-sk', classroomId: 'L3B', type: 'Lab' },
];
