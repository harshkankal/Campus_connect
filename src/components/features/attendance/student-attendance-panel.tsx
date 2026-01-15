'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, UserCheck, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { mockDivisions, mockDepartments, mockClassrooms } from '@/lib/data';
import { attendanceAPI, usersAPI } from '@/lib/api/client';
import type { Student } from '@/lib/types';

type AttendanceStep = 'initial' | 'camera_verification' | 'completed' | 'not_in_session';

interface StudentAttendancePanelProps {
  userId: string | null;
}

export function StudentAttendancePanel({ userId }: StudentAttendancePanelProps) {
  const [step, setStep] = useState<AttendanceStep>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [sessionDetails, setSessionDetails] = useState<{
    isActive: boolean;
    divisionName: string;
    departmentName: string;
    classroomName: string;
  } | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState({ status: 'Absent', timestamp: '', method: ''});

  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Effect to sync with live attendance state from API
  useEffect(() => {
    const syncState = async () => {
      if (!userId) return;

      try {
        const liveState = await attendanceAPI.getLiveState();
        if (liveState && liveState.isSessionActive) {
          const myRecord = (liveState.students || []).find((s: {id: string}) => s.id === userId);
          
          const divisionName = mockDivisions.find(d => d.id === liveState.division)?.name || 'Any Division';
          const departmentId = mockDivisions.find(d => d.id === liveState.division)?.departmentId;
          const departmentName = mockDepartments.find(d => d.id === departmentId)?.name || 'Any Department';
          const classroomName = mockClassrooms.find(c => c.id === liveState.classroom)?.name || 'Any Classroom';

          setSessionDetails({
              isActive: true,
              divisionName,
              departmentName,
              classroomName,
          });
          
          // For demo purposes, always go to camera verification if session is active, even if already marked present.
          setStep('camera_verification');

          if (myRecord && myRecord.status === 'Present') {
              // Keep the status badge updated, but still allow re-verification
              setAttendanceStatus({ status: myRecord.status, timestamp: myRecord.timestamp, method: myRecord.method });
          }
        } else {
            // No active session
            setStep('initial');
            setSessionDetails(null);
            setAttendanceStatus({ status: 'Absent', timestamp: '', method: '' });
        }
      } catch (e) {
        console.error("Failed to sync state", e);
        setSessionDetails(null);
        setStep('initial');
        setAttendanceStatus({ status: 'Absent', timestamp: '', method: '' });
      }
    };

    syncState();
    const interval = setInterval(syncState, 3000); // Periodically sync state
    return () => {
        clearInterval(interval);
    }
  }, [userId]);

  // Effect to handle camera stream based on the current step
  useEffect(() => {
    // Ensure camera is only active during the verification step
    if (step !== 'camera_verification') {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setHasCameraPermission(null);
      return;
    }

    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    // Cleanup function to stop camera when component unmounts or step changes
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current?.srcObject) {
        // Double check to ensure stream is stopped
        const mediaStream = videoRef.current.srcObject as MediaStream;
        mediaStream?.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [step, toast]);


  const handleCameraVerification = async () => {
    if (hasCameraPermission !== true) {
        toast({ variant: 'destructive', title: 'Camera Permission Needed'});
        return;
    }
    if (!userId) return;
    
    setIsLoading(true);
    try {
        const liveState = await attendanceAPI.getLiveState();
        if (liveState && liveState.isSessionActive) {
            let updatedStudents = liveState.students || [];
            
            // Add student to list if not already present
            let studentExists = updatedStudents.some((s: any) => s.id === userId);
            if (!studentExists) {
                const students = await usersAPI.getStudents();
                const studentDetails = students.find(s => s.id === userId);
                if (studentDetails) {
                    updatedStudents.push({ ...studentDetails });
                }
            }

            updatedStudents = updatedStudents.map((s: any) => 
                s.id === userId ? { ...s, status: 'Present', method: 'Camera', timestamp: new Date().toISOString() } : s
            );
            await attendanceAPI.saveLiveState({ ...liveState, students: updatedStudents });
        }

        setStep('completed');
        toast({
          title: 'Attendance Verified!',
          description: 'You have been marked present.',
        });
    } catch (e) {
        console.error("Failed to verify attendance", e);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to mark attendance.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'camera_verification':
        return (
          <div className="space-y-4">
             <h3 className="text-xl font-semibold text-center">Step 1: Face Verification</h3>
             <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                 <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
                 {hasCameraPermission === null && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}
             </div>
             {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <Camera className="h-4 w-4" />
                  <AlertTitle>Camera Access Denied</AlertTitle>
                  <AlertDescription>Please allow camera access in your browser settings to use this feature.</AlertDescription>
                </Alert>
              )}
            <Button onClick={handleCameraVerification} className="w-full" disabled={isLoading || hasCameraPermission !== true}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
              Verify with Camera
            </Button>
          </div>
        );
      case 'completed':
        return (
            <div className="flex flex-col items-center justify-center h-48 text-center">
                <UserCheck className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold">Attendance Marked!</h3>
                <p className="text-muted-foreground">You have been successfully marked present for this session.</p>
                 <Button onClick={() => setStep('camera_verification')} variant="link" className="mt-4">Mark Again?</Button>
            </div>
        );
      case 'not_in_session': 
        return (
             <div className="flex flex-col items-center justify-center h-48 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold">Session Not For Your Division</h3>
                <p className="text-muted-foreground">An attendance session is active, but not for your current division.</p>
            </div>
        );
      case 'initial':
      default:
         return (
            <div className="flex flex-col items-center justify-center h-48 text-center">
                <Loader2 className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
                <h3 className="text-xl font-semibold">Checking for Active Session...</h3>
                <p className="text-muted-foreground">Please wait while we check for an active attendance session.</p>
            </div>
        )
    }
  };
  
  return (
    <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Verification</CardTitle>
                    <CardDescription>Follow the steps below to mark your attendance.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Your Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={attendanceStatus.status === 'Present' ? 'default' : 'destructive'} className={attendanceStatus.status === 'Present' ? 'bg-green-500 text-base' : 'text-base'}>
                            {attendanceStatus.status}
                        </Badge>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Verification Method</p>
                        <p className="font-semibold">{attendanceStatus.method || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Timestamp</p>
                        <p className="font-semibold">{attendanceStatus.timestamp ? format(new Date(attendanceStatus.timestamp), 'PPpp') : 'N/A'}</p>
                    </div>
                    {sessionDetails?.isActive && (
                        <Card className="bg-primary/10">
                            <CardHeader className="p-4">
                               <CardDescription>Current Session Details</CardDescription>
                               <div className="text-sm space-y-1 mt-2">
                                 <p><span className="font-semibold">Department:</span> {sessionDetails.departmentName}</p>
                                 <p><span className="font-semibold">Division:</span> {sessionDetails.divisionName}</p>
                                 <p><span className="font-semibold">Classroom:</span> {sessionDetails.classroomName}</p>
                               </div>
                            </CardHeader>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
