import { StudentAttendancePanel } from "@/components/features/attendance/student-attendance-panel";

export default function MarkAttendancePage({ searchParams }: { searchParams: { userId: string | null } }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mark Attendance</h1>
        <p className="text-muted-foreground">
            Complete the two-step verification to mark your attendance.
        </p>
      </div>
      <StudentAttendancePanel userId={searchParams.userId} />
    </div>
  );
}
