import { SchedulerPanel } from "@/components/features/dashboard/scheduler-panel";

export default function SchedulerPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Timetable Scheduler</h1>
        <p className="text-muted-foreground">
          Define constraints and generate an optimized timetable.
        </p>
      </div>
      <SchedulerPanel />
    </div>
  );
}
