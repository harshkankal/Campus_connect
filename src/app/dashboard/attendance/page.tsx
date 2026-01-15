import { AttendancePanel } from "@/components/features/attendance/attendance-panel";

export default function AttendancePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Attendance Automation</h1>
        <p className="text-muted-foreground">
          Start a session to automate attendance using CCTV and RFID.
        </p>
      </div>
      <AttendancePanel />
    </div>
  );
}
