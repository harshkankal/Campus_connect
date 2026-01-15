'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Play, StopCircle, Loader2, Users } from 'lucide-react';
import { mockClassrooms, mockDivisions, mockDepartments } from '@/lib/data';
import { usersAPI, attendanceAPI } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';
import type { Student, AttendanceMethod } from '@/lib/types';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type SessionStep = 'config' | 'active';

export function AttendancePanel() {
  const [sessionStep, setSessionStep] = useState<SessionStep>('config');
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const { toast } = useToast();
  const [selectedClassroom, setSelectedClassroom] = useState<string>();
  const [selectedDivision, setSelectedDivision] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState<string>();
  const [headcount, setHeadcount] = useState<string>('');
  const [rfidVerifiedCount, setRfidVerifiedCount] = useState(0);

  // Filter divisions based on selected department
  const filteredDivisions = selectedDepartment
    ? mockDivisions.filter(d => d.departmentId === selectedDepartment)
    : mockDivisions;

  // Effect to load initial state from API and monitor live session
  useEffect(() => {
    const syncLiveState = async () => {
        try {
            const [studentList, liveState] = await Promise.all([
                usersAPI.getStudents(),
                attendanceAPI.getLiveState(),
            ]);

            if (liveState && liveState.isSessionActive) {
                setStudents(liveState.students || []);
                setSessionStep('active');
                setSelectedDivision(liveState.division);
                setSelectedClassroom(liveState.classroom);
                setSelectedDepartment(liveState.department);
                setHeadcount(liveState.headcount?.toString() || '');
                const verifiedCount = (liveState.students || []).filter((s: Student) => s.rfidVerified).length;
                setRfidVerifiedCount(verifiedCount);
            } else {
                const initialStudents = studentList.map(s => ({ ...s, status: 'Absent' as const, timestamp: undefined, method: undefined, rfidVerified: false }));
                setStudents(initialStudents);
                setSessionStep('config');
                setRfidVerifiedCount(0);
            }
        } catch (e) {
            console.error("Failed to sync live state", e);
        }
    };
    
    syncLiveState(); // Initial sync
    const intervalId = setInterval(syncLiveState, 2000); // Periodically check for updates

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Note: Cross-tab sync now handled via API polling in syncLiveState

  const handleManualStatusChange = async (studentId: string, newStatus: 'Present' | 'Absent') => {
    const newStudents = students.map(student => {
        if (student.id === studentId) {
            return {
                ...student,
                status: newStatus,
                method: newStatus === 'Present' ? 'Manual' as AttendanceMethod : undefined,
                timestamp: newStatus === 'Present' ? new Date().toISOString() : undefined,
            };
        }
        return student;
    });
    setStudents(newStudents);

    // Update API immediately
    try {
      const liveState = await attendanceAPI.getLiveState();
      if (liveState) {
        await attendanceAPI.saveLiveState({ ...liveState, students: newStudents });
      }
    } catch (e) {
      console.error("Failed to save live state", e);
    }
  };
  
  const handleStartSession = async () => {
    if (!selectedDivision || !selectedClassroom || !selectedDepartment) {
        toast({ variant: 'destructive', title: "Missing Information", description: "Please select a department, division, and classroom."});
        return;
    }
    
    setIsLoading(true);
    try {
        const divisionName = mockDivisions.find(d => d.id === selectedDivision)?.name;
        const studentList = await usersAPI.getStudents();
        
        // Pre-populate with some dummy students for demo purposes
        const initialStudents = studentList.slice(0, 4).map((s, idx) => {
            if (idx === 0 || idx === 2) {
                return { ...s, status: 'Present' as const, method: idx === 0 ? 'Camera' as AttendanceMethod : 'Manual' as AttendanceMethod, timestamp: new Date().toISOString(), rfidVerified: true };
            }
            return { ...s, status: 'Absent' as const, timestamp: undefined, method: undefined, rfidVerified: false };
        });

        const liveState = { 
            sessionId: `session-${Date.now()}`,
            isSessionActive: true, 
            students: initialStudents,
            division: selectedDivision, 
            classroom: selectedClassroom, 
            department: selectedDepartment, 
            headcount: parseInt(headcount, 10) || 50, // Default headcount if not set
        };
        await attendanceAPI.saveLiveState(liveState);
        setStudents(initialStudents);
        setSessionStep('active');
        toast({
            title: "Session Started",
            description: `Attendance session for ${divisionName} is now active. Any student can join.`
        });
    } catch (e) {
        console.error("Failed to start session", e);
        toast({
            variant: 'destructive',
            title: "Error",
            description: "Failed to start attendance session."
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleStopSession = async () => {
      setIsLoading(true);
      try {
          if (students.some(s => s.status === 'Present')) {
              const divisionName = mockDivisions.find(d => d.id === selectedDivision)?.name || "Unknown Division";
              const newHistory = {
                  subject: `${divisionName} Session`,
                  date: new Date().toISOString(),
                  records: students // Records all students who participated in the session
              };

              const existingHistory = await attendanceAPI.getHistory();
              await attendanceAPI.addLog(newHistory);
              toast({
                  title: "Session Ended",
                  description: "Attendance data has been saved to history."
              });
          } else {
              toast({
                  title: "Session Ended",
                  description: "No students were marked present. Nothing was saved to history."
              });
          }
          // Display final log to faculty
          const finalPresent = students.filter(s => s.status === 'Present').length;
          const finalAbsent = students.length - finalPresent;
          toast({
              title: "Final Attendance Log",
              description: `Present: ${finalPresent}, Absent: ${finalAbsent}.`,
              duration: 10000,
          });

          await attendanceAPI.saveLiveState(null);
          // Reset session state
          setStudents([]);
          setSelectedClassroom(undefined);
          setSelectedDivision(undefined);
          setSelectedDepartment(undefined);
          setRfidVerifiedCount(0);
          setSessionStep('config');
          setHeadcount('');
      } catch(e) {
          console.error("Failed to save attendance history:", e);
          toast({
              variant: 'destructive',
              title: "Error",
              description: "Could not save attendance data."
          });
      } finally {
          setIsLoading(false);
      }
  };

  const renderControlPanel = () => {
    switch (sessionStep) {
        case 'config':
            return (
                 <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select onValueChange={val => { setSelectedDepartment(val); setSelectedDivision(undefined); }} value={selectedDepartment}>
                            <SelectTrigger id="department"><SelectValue placeholder="Select a department" /></SelectTrigger>
                            <SelectContent>{mockDepartments.map((d) => (<SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>))}</SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="division">Division (for context)</Label>
                        <Select onValueChange={setSelectedDivision} value={selectedDivision} disabled={!selectedDepartment}>
                            <SelectTrigger id="division"><SelectValue placeholder="Select a division" /></SelectTrigger>
                            <SelectContent>{filteredDivisions.map((d) => (<SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>))}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="classroom">Classroom</Label>
                        <Select onValueChange={setSelectedClassroom} value={selectedClassroom}>
                            <SelectTrigger id="classroom"><SelectValue placeholder="Select a classroom" /></SelectTrigger>
                            <SelectContent>{mockClassrooms.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="headcount">Expected Headcount (RFID Limit)</Label>
                        <Input id="headcount" type="number" placeholder="e.g., 50" value={headcount} onChange={(e) => setHeadcount(e.target.value)} />
                        <p className="text-xs text-muted-foreground">Only this many students can proceed to camera verification.</p>
                    </div>
                    <Button onClick={handleStartSession} className="w-full" disabled={!selectedClassroom || !selectedDivision || isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                        Start Session
                    </Button>
                </CardContent>
            );
        case 'active':
            return (
                <CardContent className="space-y-4">
                    <Card className="text-center bg-primary/10">
                        <CardHeader>
                            <CardTitle>Session is Live</CardTitle>
                            <CardDescription>Students can now verify their attendance. Monitor progress below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">RFID Scanned / Headcount Limit</p>
                           <p className="text-2xl font-bold">{rfidVerifiedCount} / {headcount || 'N/A'}</p>
                        </CardContent>
                    </Card>
                    <Button onClick={handleStopSession} className="w-full" disabled={isLoading}>
                         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <StopCircle className="mr-2 h-4 w-4" />}
                        {isLoading ? 'Finalizing...' : 'Stop Session & Save'}
                    </Button>
                </CardContent>
            );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Control Panel</CardTitle>
          </CardHeader>
          {renderControlPanel()}
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Attendance Log</CardTitle>
            <CardDescription>Real-time status of student verification. You can manually override status.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="h-[600px] overflow-y-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Manual Override</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === 'Present'
                                ? 'default'
                                : 'destructive'
                            }
                            className={
                              student.status === 'Present'
                                ? 'bg-green-500'
                                : ''
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                            <Select 
                                value={student.status}
                                onValueChange={(value: 'Present' | 'Absent') => handleManualStatusChange(student.id, value)}
                            >
                                <SelectTrigger className="w-28 h-8">
                                    <SelectValue placeholder="Change..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Present">Present</SelectItem>
                                    <SelectItem value="Absent">Absent</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>{student.timestamp ? format(new Date(student.timestamp), 'pp') : 'N/A'}</TableCell>
                        <TableCell>{student.method || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                    {students.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                Waiting for session to start...
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
