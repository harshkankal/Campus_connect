'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, PlusCircle } from 'lucide-react';
import { mockDivisions, mockDepartments } from '@/lib/data';
import { usersAPI } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';
import type { Student, Division, User as FacultyUser } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function AddStudentDialog({ divisions, onAddStudent }: { divisions: Division[], onAddStudent: (student: Student) => void }) {
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ id: '', name: '', division: '', image: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (open) {
        const randomSeed = `new-${Date.now()}`;
        const defaultImage = `https://picsum.photos/seed/${randomSeed}/100/100`;
        setNewStudent(prev => ({ ...prev, image: defaultImage }));
        setImagePreview(defaultImage);
    } else {
        setNewStudent({ id: '', name: '', division: '', image: '' });
        setImagePreview(null);
    }
  }, [open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setNewStudent(prev => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newStudent.id && newStudent.name && newStudent.division) {
        onAddStudent({ ...newStudent, status: 'Absent' });
        setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview || ''} />
              <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" value={newStudent.id} onChange={e => setNewStudent({ ...newStudent, id: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input id="studentName" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentDivision">Division</Label>
            <Select onValueChange={value => setNewStudent({ ...newStudent, division: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map(division => (
                  <SelectItem key={division.id} value={division.name}>{division.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button onClick={handleSave}>Save Student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddFacultyDialog({ onAddFaculty }: { onAddFaculty: (faculty: FacultyUser) => void }) {
  const [open, setOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    if (!open) {
      setNewFaculty({ id: '', name: '', email: '' });
    }
  }, [open]);

  const handleSave = () => {
    if (newFaculty.id && newFaculty.name && newFaculty.email) {
      onAddFaculty({ ...newFaculty, role: 'faculty' });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Faculty
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Faculty Member</DialogTitle>
          <DialogDescription>
            Enter the details for the new faculty member.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="facultyId">Faculty ID</Label>
            <Input id="facultyId" value={newFaculty.id} onChange={e => setNewFaculty({ ...newFaculty, id: e.target.value })} placeholder="e.g., f-tb" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facultyName">Full Name</Label>
            <Input id="facultyName" value={newFaculty.name} onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })} placeholder="e.g., Prof. Trupti Bhagat" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="facultyEmail">Email</Label>
            <Input id="facultyEmail" type="email" value={newFaculty.email} onChange={e => setNewFaculty({ ...newFaculty, email: e.target.value })} placeholder="e.g., trupti.bhagat@campus.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button onClick={handleSave}>Save Faculty</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export function UserManagementPanel() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(mockDepartments[0].id);
  const [selectedDivision, setSelectedDivision] = useState<string>(mockDivisions[0].id);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<FacultyUser[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const { toast } = useToast();
  const [initialLoad, setInitialLoad] = useState(true);

  // Filter divisions based on selected department
  const filteredDivisions = selectedDepartment
    ? mockDivisions.filter(d => d.departmentId === selectedDepartment)
    : mockDivisions;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setInitialLoad(true);
      const [studentsData, facultyData] = await Promise.all([
        usersAPI.getStudents(),
        usersAPI.getFaculty(),
      ]);
      setStudents(studentsData);
      setFaculty(facultyData as FacultyUser[]);
    } catch (e) {
      console.error("Failed to load data", e);
      toast({
        title: 'Error',
        description: 'Failed to load users data',
        variant: 'destructive',
      });
    } finally {
      setInitialLoad(false);
    }
  };

  const handleAddStudent = async (student: Student) => {
    try {
      const created = await usersAPI.createStudent(student);
      setStudents(prev => [...prev, created]);
      toast({
        title: 'Student Added',
        description: `${student.name} has been added.`
      });
    } catch (error) {
      console.error('Failed to add student', error);
      toast({
        title: 'Error',
        description: 'Failed to add student',
        variant: 'destructive',
      });
    }
  };

  const handleAddFaculty = async (newFacultyMember: FacultyUser) => {
    try {
      const created = await usersAPI.createFaculty(newFacultyMember);
      setFaculty(prev => [...prev, created]);
      toast({
        title: 'Faculty Added',
        description: `${newFacultyMember.name} has been added.`
      });
    } catch (error) {
      console.error('Failed to add faculty', error);
      toast({
        title: 'Error',
        description: 'Failed to add faculty',
        variant: 'destructive',
      });
    }
  };

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    const firstDivisionOfNewDept = mockDivisions.find(d => d.departmentId === departmentId);
    setSelectedDivision(firstDivisionOfNewDept?.id || '');
  };

  const handleUploadClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedStudentId) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        try {
          await usersAPI.updateStudent(selectedStudentId, { image: imageUrl });
          setStudents(prevStudents => prevStudents.map(student =>
            student.id === selectedStudentId
              ? { ...student, image: imageUrl }
              : student
          ));
          toast({
            title: 'Image Updated',
            description: `Image for student has been updated.`
          });
        } catch (error) {
          console.error('Failed to update student image', error);
          toast({
            title: 'Error',
            description: 'Failed to update image',
            variant: 'destructive',
          });
        }
      };
      reader.readAsDataURL(file);
    }
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    setSelectedStudentId(null);
  };

  const currentDivisionName = mockDivisions.find(d => d.id === selectedDivision)?.name;
  const currentStudents = students.filter(student => student.division === currentDivisionName);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
            Manage student and faculty accounts and their verification data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="students">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            <TabsContent value="students">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-4">
                    <div className="text-sm text-muted-foreground">View students by division and manage their photos.</div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select onValueChange={handleDepartmentChange} defaultValue={selectedDepartment}>
                            <SelectTrigger className="flex-1"><SelectValue placeholder="Filter by Department" /></SelectTrigger>
                            <SelectContent>{mockDepartments.map((dept) => (<SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>))}</SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedDivision} value={selectedDivision} disabled={!selectedDepartment}>
                            <SelectTrigger className="flex-1"><SelectValue placeholder="Filter by Division" /></SelectTrigger>
                            <SelectContent>{filteredDivisions.map((division) => (<SelectItem key={division.id} value={division.id}>{division.name}</SelectItem>))}</SelectContent>
                        </Select>
                        <AddStudentDialog divisions={mockDivisions} onAddStudent={handleAddStudent} />
                    </div>
                </div>
                <div className='mt-4'>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="text-center">Verification Photo</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.id}</TableCell>
                                <TableCell className="flex justify-center">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={student.image} alt={student.name} />
                                    <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                                </Avatar>
                                </TableCell>
                                <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleUploadClick(student.id)}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Photo
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                            {currentStudents.length === 0 && (
                                <TableRow><TableCell colSpan={4} className="h-24 text-center">No students found for this division.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>
             <TabsContent value="faculty">
                 <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-4">
                    <div className="text-sm text-muted-foreground">Add new faculty members to the system.</div>
                    <AddFacultyDialog onAddFaculty={handleAddFaculty} />
                </div>
                <div className='mt-4'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Faculty ID</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faculty.map((f) => (
                                <TableRow key={f.id}>
                                    <TableCell className="font-medium">{f.name}</TableCell>
                                    <TableCell>{f.id}</TableCell>
                                    <TableCell>{f.email}</TableCell>
                                </TableRow>
                            ))}
                            {faculty.length === 0 && (
                                <TableRow><TableCell colSpan={3} className="h-24 text-center">No faculty found.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
