"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockTimetable } from '@/lib/data';
import { Loader2, FileDown, AlertTriangle, Cog } from 'lucide-react';

export function SchedulerPanel() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [timetableGenerated, setTimetableGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setTimetableGenerated(true);
    }, 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
            <CardDescription>Set parameters for timetable generation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Faculty Availability</Label>
              <Input type="file" />
              <p className="text-xs text-muted-foreground">Upload a CSV of faculty schedules.</p>
            </div>
            <div className="space-y-2">
              <Label>Classroom Resources</Label>
              <Input type="file" />
              <p className="text-xs text-muted-foreground">Upload a CSV of classroom capabilities.</p>
            </div>
            <div className="space-y-2">
              <Label>Subject Constraints</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="no-consecutive" />
                <Label htmlFor="no-consecutive" className="font-normal">No consecutive lectures for same subject</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="labs-afternoon" defaultChecked />
                <Label htmlFor="labs-afternoon" className="font-normal">Prefer labs in the afternoon</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} className="w-full" disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Cog className="mr-2 h-4 w-4" />}
              {isGenerating ? 'Generating...' : 'Generate Timetable'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>Review, edit, and export the generated schedule.</CardDescription>
          </CardHeader>
          <CardContent>
            {timetableGenerated ? (
              <>
                <Alert className="mb-4 bg-yellow-50 border-yellow-200 text-yellow-800">
                    <AlertTriangle className="h-4 w-4 !text-yellow-600" />
                    <AlertTitle>2 Conflicts Detected</AlertTitle>
                    <AlertDescription>
                        Dr. Smith is scheduled for two classes at the same time.
                    </AlertDescription>
                </Alert>
                <div className="max-h-[400px] overflow-auto border rounded-lg">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Faculty</TableHead>
                            <TableHead>Room</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockTimetable.map(entry => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.day}</TableCell>
                                <TableCell>{entry.timeSlot}</TableCell>
                                <TableCell>{entry.subject}</TableCell>
                                <TableCell>{entry.facultyName}</TableCell>
                                <TableCell>{entry.classroomId}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as PDF
                    </Button>
                     <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Export as Excel
                    </Button>
                </div>
              </>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">Timetable has not been generated yet.</p>
                <p className="text-sm text-muted-foreground">Set constraints and click "Generate Timetable".</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
