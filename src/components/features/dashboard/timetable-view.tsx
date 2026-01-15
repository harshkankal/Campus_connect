'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockDivisions, mockDepartments, mockFaculty } from "@/lib/data";
import { timetableAPI } from '@/lib/api/client';
import type { TimetableEntry, UserRole } from "@/lib/types";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';


interface TimetableViewProps {
  role: UserRole;
}

const daysOfWeek: TimetableEntry['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 12:15",
    "12:15 - 13:15",
    "13:15 - 14:15",
    "12:15 - 14:15",
    "14:15 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "15:00 - 17:00",
];

const recessSlots: Record<string, string> = {
    "12:00-12:15": "SHORT RECESS",
    "14:15-15:00": "LONG RECESS",
};

export default function TimetableView({ role }: TimetableViewProps) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const { toast } = useToast();
  const isEditable = role === 'faculty' || role === 'admin';
  const [initialLoad, setInitialLoad] = useState(true);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('ca');
  const [selectedDivision, setSelectedDivision] = useState<string>('ca-sy-a');

  // Filter divisions based on selected department
  const filteredDivisions = selectedDepartment
    ? mockDivisions.filter(d => d.departmentId === selectedDepartment)
    : mockDivisions;

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      setInitialLoad(true);
      const data = await timetableAPI.getTimetable();
      setTimetable(data);
    } catch (e) {
      console.error("Failed to load timetable", e);
      toast({
        title: "Error",
        description: "Failed to load timetable",
        variant: 'destructive',
      });
    } finally {
      setInitialLoad(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await timetableAPI.saveTimetable(timetable);
      toast({
        title: "Timetable Saved",
        description: "Your changes to the timetable have been saved.",
      });
    } catch (e) {
      console.error("Failed to save timetable", e);
      toast({
        title: "Error",
        description: "Failed to save timetable",
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (id: string, field: keyof TimetableEntry, value: string) => {
    setTimetable(prev => prev.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
  };
  
  const divisionName = mockDivisions.find(d => d.id === selectedDivision)?.name;
  const filteredTimetable = timetable.filter(entry => entry.division === divisionName);


  const timetableMatrix: { [key: string]: { [key: string]: TimetableEntry[] } } = {};
  daysOfWeek.forEach(day => {
    timetableMatrix[day] = {};
    timeSlots.forEach(slot => {
        timetableMatrix[day][slot] = filteredTimetable.filter(e => e.day === day && e.timeSlot === slot);
    });
  });

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={val => { setSelectedDepartment(val); const firstDivision = mockDivisions.find(d => d.departmentId === val); if (firstDivision) {setSelectedDivision(firstDivision.id);}; }} defaultValue={selectedDepartment}>
                    <SelectTrigger id="department">
                        <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                        {mockDepartments.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex-1 space-y-2">
                <Label htmlFor="division">Class/Division</Label>
                <Select onValueChange={setSelectedDivision} value={selectedDivision} disabled={!selectedDepartment}>
                    <SelectTrigger id="division">
                        <SelectValue placeholder="Select a division" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredDivisions.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] min-w-[100px]">TIME/DAY</TableHead>
                {daysOfWeek.map(day => (
                  <TableHead key={day} className="min-w-[150px]">{day.toUpperCase()}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map(timeSlot => {
                const recessKey = timeSlot.replace(/\s/g, '');
                const recessName = recessSlots[recessKey];
                
                if (recessName) {
                    const hasLecturesInRecess = daysOfWeek.some(day => (timetableMatrix[day]?.[timeSlot] || []).length > 0);
                    if(!hasLecturesInRecess) {
                        return (
                            <TableRow key={timeSlot}>
                                <TableCell className="font-medium whitespace-pre-wrap">{timeSlot.replace(' - ', '-\n')}</TableCell>
                                <TableCell colSpan={5} className="text-center font-bold bg-muted/50 text-muted-foreground">{recessName}</TableCell>
                            </TableRow>
                        )
                    }
                }
                return (
                  <TableRow key={timeSlot}>
                    <TableCell className="font-medium whitespace-pre-wrap">{timeSlot.replace(' - ', '-\n')}</TableCell>
                    {daysOfWeek.map(day => {
                      const entries = timetableMatrix[day]?.[timeSlot] || [];
                      
                      if (entries.length === 0) return <TableCell key={`${day}-${timeSlot}`}>{isEditable ? <Input defaultValue="" className="h-8 text-xs" placeholder="Add..."/> : '-'}</TableCell>;

                      return (
                        <TableCell key={`${day}-${timeSlot}`} className="align-top p-1 space-y-1">
                           {entries.map(entry => {
                            if (isEditable) {
                                return (
                                    <div key={entry.id} className="p-1.5 rounded-lg border space-y-1 bg-background shadow-sm">
                                        <Input 
                                            value={entry.subject} 
                                            onChange={(e) => handleInputChange(entry.id, 'subject', e.target.value)} 
                                            className="h-8 font-semibold text-xs"
                                        />
                                        <Input 
                                            value={entry.classroomId} 
                                            onChange={(e) => handleInputChange(entry.id, 'classroomId', e.target.value)} 
                                            className="h-7 text-xs"
                                            placeholder="Room"
                                        />
                                        <Input 
                                            value={entry.facultyName} 
                                            onChange={(e) => handleInputChange(entry.id, 'facultyName', e.target.value)} 
                                            className="h-7 text-xs"
                                            placeholder="Faculty"
                                        />
                                    </div>
                                )
                            }
                            return (
                              <div key={entry.id} className="p-2 rounded-lg border bg-muted/20">
                                <span className="font-semibold block text-sm">{entry.subject}</span>
                                <span className="text-muted-foreground text-xs">Room: {entry.classroomId}</span>
                                <span className="text-xs block text-muted-foreground">{entry.facultyName}</span>
                              </div>
                            )
                           })}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        {isEditable && (
            <div className="mt-4 flex justify-end">
                <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
