"use client";

import { useState, useEffect, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDivisions, mockDepartments } from '@/lib/data';
import { usersAPI, attendanceAPI } from '@/lib/api/client';
import type { Student, AttendanceHistoryLog } from '@/lib/types';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

export function AttendanceCheckPanel() {
  const [allStudentsData, setAllStudentsData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState({ rollNumber: '', division: 'all' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [students, history] = await Promise.all([
        usersAPI.getStudents(),
        attendanceAPI.getHistory(),
      ]);

      const latestStatusMap = new Map<string, Partial<Student>>();
      history.forEach(log => {
        log.records.forEach(record => {
          latestStatusMap.set(record.id, {
            status: record.status,
            timestamp: record.timestamp,
            method: record.method
          });
        });
      });

      const updatedStudents = students.map(student => {
        const latestStatus = latestStatusMap.get(student.id);
        return latestStatus ? { ...student, ...latestStatus } : student;
      });
      setAllStudentsData(updatedStudents);
    } catch (e) {
      console.error("Failed to load data", e);
      setAllStudentsData([]);
    }
  };

  const filteredStudents = useMemo(() => {
    let students = allStudentsData;
    if (searchQuery.rollNumber) {
        students = students.filter(s => s.id.toLowerCase().includes(searchQuery.rollNumber.toLowerCase()) || s.name.toLowerCase().includes(searchQuery.rollNumber.toLowerCase()))
    }
    if (searchQuery.division && searchQuery.division !== 'all') {
        const divisionName = mockDivisions.find(d => d.id === searchQuery.division)?.name;
        students = students.filter(s => s.division === divisionName);
    }
    return students;
  }, [allStudentsData, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setSearchQuery({
      rollNumber: formData.get('rollNumber') as string,
      division: formData.get('division') as string,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
        <CardDescription>
          Filter and search for student attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="rollNumber">Roll Number / Name</label>
            <Input id="rollNumber" name="rollNumber" placeholder="e.g., s1 or Alice" />
          </div>
           <div className="space-y-2">
             <label htmlFor="department">Department</label>
            <Select name="department" defaultValue="all">
                <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                 <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {mockDepartments.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                            {d.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="division">Division</label>
            <Select name="division" defaultValue="all">
              <SelectTrigger id="division">
                <SelectValue placeholder="Select a division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Divisions</SelectItem>
                {mockDivisions.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Last Status</TableHead>
              <TableHead>Last Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.division}</TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === 'Present' ? 'default' : 'destructive'}
                    className={student.status === 'Present' ? 'bg-green-500' : ''}
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.timestamp ? format(new Date(student.timestamp), 'PPpp') : 'N/A'}</TableCell>
              </TableRow>
            ))}
             {filteredStudents.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No students found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
