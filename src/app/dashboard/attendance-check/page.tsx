import { AttendanceCheckPanel } from "@/components/features/attendance/attendance-check-panel";

export default function AttendanceCheckPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Check Attendance</h1>
        <p className="text-muted-foreground">
          Search for and view student attendance records.
        </p>
      </div>
      <AttendanceCheckPanel />
    </div>
  );
}
