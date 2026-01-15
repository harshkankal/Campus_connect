import type { User, Student } from '../types';

// Students
export const mockStudents: Student[] = [
    // Division: CA-FY-A
    { id: 'ca-fy-a-s1', name: 'Krushna Lasure', division: 'CA-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s1/100/100' },
    { id: 'ca-fy-a-s2', name: 'Arya Madkholkar', division: 'CA-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s2/100/100' },
    { id: 'ca-fy-a-s3', name: 'Harsh Kankal', division: 'CA-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s3/100/100' },
    { id: 'ca-fy-a-s4', name: 'Shruti Jhade', division: 'CA-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s4/100/100' },
    { id: 'ca-fy-a-s5', name: 'Karan Prasad', division: 'CA-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s5/100/100' },
    // Division: CA-SY-A
    { id: 'ca-sy-a-s1', name: 'Neha Gupta', division: 'CA-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s6/100/100' },
    { id: 'ca-sy-a-s2', name: 'Karan Lasure', division: 'CA-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s7/100/100' },
    { id: 'ca-sy-a-s3', name: 'Sarthak Londhe', division: 'CA-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s8/100/100' },
    { id: 'ca-sy-a-s4', name: 'Himanshu Mahire', division: 'CA-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s9/100/100' },
    // Division: CA-TY-A
    { id: 'ca-ty-a-s1', name: 'Suyog Makar', division: 'CA-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s10/100/100' },
    { id: 'ca-ty-a-s2', name: 'Riya', division: 'CA-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s11/100/100' },
    { id: 'ca-ty-a-s3', name: 'Pallavi Lasure', division: 'CA-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s12/100/100' },
    { id: 'ca-ty-a-s4', name: 'Suyash', division: 'CA-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s13/100/100' },
    // Division: AIDS-FY-A
    { id: 'aids-fy-a-s1', name: 'Viraj', division: 'AIDS-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s14/100/100' },
    { id: 'aids-fy-a-s2', name: 'Raj', division: 'AIDS-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s15/100/100' },
    { id: 'aids-fy-a-s3', name: 'Tushar', division: 'AIDS-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s16/100/100' },
    { id: 'aids-fy-a-s4', name: 'Aditi', division: 'AIDS-FY-A', status: 'Absent', image: 'https://picsum.photos/seed/s17/100/100' },
    // Division: AIDS-SY-A
    { id: 'aids-sy-a-s1', name: 'Samrudhi', division: 'AIDS-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s18/100/100' },
    { id: 'aids-sy-a-s2', name: 'Bhumika', division: 'AIDS-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s19/100/100' },
    { id: 'aids-sy-a-s3', name: 'Ardra', division: 'AIDS-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s20/100/100' },
    { id: 'aids-sy-a-s4', name: 'Pate Krishna', division: 'AIDS-SY-A', status: 'Absent', image: 'https://picsum.photos/seed/s21/100/100' },
    // Division: AIDS-TY-A
    { id: 'aids-ty-a-s1', name: 'Rahul', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s22/100/100' },
    { id: 'aids-ty-a-s2', name: 'Ganesh', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s23/100/100' },
    { id: 'aids-ty-a-s3', name: 'Mahadev', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s24/100/100' },
    { id: 'aids-ty-a-s4', name: 'Ram', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s25/100/100' },
    { id: 'aids-ty-a-s5', name: 'Sita', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s26/100/100' },
    { id: 'aids-ty-a-s6', name: 'Parvati', division: 'AIDS-TY-A', status: 'Absent', image: 'https://picsum.photos/seed/s27/100/100' },
];

// Faculty
export const mockFaculty: User[] = [
    { id: 'f-tb', name: 'Prof. Trupti Bhagat', role: 'faculty', email: 'trupti.bhagat@campus.com' },
    { id: 'f-rm', name: 'Prof. Radhika Malpani', role: 'faculty', email: 'radhika.malpani@campus.com' },
    { id: 'f-sk', name: 'Prof. Sandyarani Kalyane', role: 'faculty', email: 'sandyarani.kalyane@campus.com' },
    { id: 'f-rt', name: 'Prof. Radha Tripathi', role: 'faculty', email: 'radha.tripathi@campus.com' },
    { id: 'f-vw', name: 'Prof. Vrushali Wankhede', role: 'faculty', email: 'vrushali.wankhede@campus.com' },
    { id: 'f-st', name: 'Prof. Supriya Tambe', role: 'faculty', email: 'supriya.tambe@campus.com' },
    { id: 'f-tsr', name: 'Seminar Faculty', role: 'faculty', email: 'seminar.faculty@campus.com' },
    { id: 'f-foss', name: 'FOSS Faculty', role: 'faculty', email: 'foss.faculty@campus.com' },
    { id: 'f-kg', name: 'Prof. Kirti Gavhane', role: 'faculty', email: 'kirti.gavhane@campus.com' },
    { id: 'f-pk', name: 'Prof. P Kandekar', role: 'faculty', email: 'p.kandekar@campus.com' },
    { id: 'f-sm', name: 'Prof. S.Manwar', role: 'faculty', email: 's.manwar@campus.com' },
    { id: 'f-dj', name: 'Dr. D. Jadhav', role: 'faculty', email: 'd.jadhav@campus.com' },
    { id: 'f-rd', name: 'Prof. R. Dandage', role: 'faculty', email: 'r.dandage@campus.com' },
    { id: 'f-mr', name: 'Prof. Manjiri Raut', role: 'faculty', email: 'manjiri.raut@campus.com' },
    { id: 'f-ak', name: 'Prof. Avneet Kaur', role: 'faculty', email: 'avneet.kaur@campus.com' },
    { id: 'f-tr', name: 'Prof. Tejal Rane', role: 'faculty', email: 'tejal.rane@campus.com' },
    { id: 'f-vk', name: 'Dr. Veena Kadam', role: 'faculty', email: 'veena.kadam@campus.com' },
    { id: 'f-at', name: 'Dr. Alan Turing', role: 'faculty', email: 'alan.turing@campus.com' },
    { id: 'f-al', name: 'Dr. Ada Lovelace', role: 'faculty', email: 'ada.lovelace@campus.com' },
];

// Admins
export const mockAdmins: User[] = [
    { id: 'admin-kl', name: 'Krushna Lasure', role: 'admin', email: 'krushna.lasure@campus.com' },
];

// Combine all users into one list for easier lookup during login
export let mockUsers: User[] = [];

const updateMockUsers = () => {
    let students: Student[] = mockStudents;
    let faculty: User[] = mockFaculty;
    
    if (typeof window !== 'undefined') {
        try {
            const storedStudents = localStorage.getItem('students');
            if (storedStudents) students = JSON.parse(storedStudents);

            const storedFaculty = localStorage.getItem('faculty');
            if (storedFaculty) faculty = JSON.parse(storedFaculty);
        } catch (e) {
            console.error("Could not parse users from localStorage", e);
        }
    }
    
    mockUsers = [
        ...students.map(s => ({ id: s.id, name: s.name, role: 'student' as const, email: `${s.name.split(' ').join('.').toLowerCase()}@campus.com` })),
        ...faculty,
        ...mockAdmins,
    ];
};

// Initial load
updateMockUsers();

// Function to be called when user data changes
export const refreshUsers = () => {
    updateMockUsers();
};

// Also listen to storage events to update if changed in another tab
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
        if (e.key === 'students' || e.key === 'faculty') {
            refreshUsers();
        }
    });
}
