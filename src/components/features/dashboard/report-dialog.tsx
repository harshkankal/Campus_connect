"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockEvents, mockStudents, mockTimetable } from "@/lib/data";
import { Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ReportDialog({ children }: { children: React.ReactNode }) {
  const registeredStudentsByEvent = mockEvents.map(event => ({
    ...event,
    registeredStudents: mockStudents.filter(student => event.rsvps.includes(student.id))
  }));

  const handlePrint = () => {
    window.print();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Generated Report</DialogTitle>
          <DialogDescription>
            A comprehensive report of attendance and event registrations.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] p-4 border rounded-lg">
          <div className="printable-content space-y-8">
            {/* Attendance Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Total Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTimetable.slice(0, 5).map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.subject}</TableCell>
                      <TableCell>{entry.facultyName}</TableCell>
                      <TableCell>{entry.day}</TableCell>
                      <TableCell>{entry.timeSlot}</TableCell>
                      <TableCell>{mockStudents.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Separator />

            {/* Event Registration Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Event Registration Details</h2>
              <div className="space-y-6">
                {registeredStudentsByEvent.map(event => (
                  <div key={event.id}>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.registeredStudents.length} student(s) registered
                    </p>
                    {event.registeredStudents.length > 0 && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Division</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {event.registeredStudents.map(student => (
                            <TableRow key={student.id}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.division}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
            <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print Report
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
