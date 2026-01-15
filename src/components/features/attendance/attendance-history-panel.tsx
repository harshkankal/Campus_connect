'use client';

import { useEffect, useState, useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import type { Student, AttendanceHistoryLog, UserRole } from '@/lib/types';
import { attendanceAPI } from '@/lib/api/client';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AttendanceHistoryPanelProps {
  role?: UserRole;
  userId: string | null;
}

export function AttendanceHistoryPanel({ role = 'student', userId }: AttendanceHistoryPanelProps) {
  const [rawHistory, setRawHistory] = useState<AttendanceHistoryLog[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await attendanceAPI.getHistory();
      setRawHistory(history);
    } catch (e) {
      console.error('Failed to load attendance history', e);
    }
  };

  const attendanceHistory = useMemo(() => {
    let history = rawHistory;
    // If the user is a student, filter the records to show only their own.
    if (role === 'student' && userId) {
      history = history.map(log => ({
        ...log,
        records: log.records.filter(record => record.id === userId),
      })).filter(log => log.records.length > 0); // Keep logs where the student was present
    }
    
    // Sort by most recent date
    return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [rawHistory, role, userId]);

  const title = role === 'student' ? "Your Attendance History" : "Full Attendance History";
  const description = role === 'student'
    ? "Below is the log of your personal attendance records."
    : "Below is the complete log of all attendance sessions.";

  if (attendanceHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">No attendance history found.</p>
            <p className="text-sm text-muted-foreground">
              Your attendance records will appear here once a session is completed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {attendanceHistory.map((log, index) => (
            <AccordionItem value={`item-${index}`} key={log.date}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4">
                  <span>{log.subject}</span>
                  <span>{format(new Date(log.date), 'PPP')}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {log.records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={record.status === 'Present' ? 'default' : 'destructive'}
                            className={record.status === 'Present' ? 'bg-green-500' : ''}
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {record.timestamp ? format(new Date(record.timestamp), 'pp') : 'N/A'}
                        </TableCell>
                        <TableCell>{record.method}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
