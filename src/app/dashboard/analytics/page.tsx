import { AnalyticsPanel } from "@/components/features/dashboard/analytics-panel";

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Insights on attendance, event participation, and more.
        </p>
      </div>
      <AnalyticsPanel />
    </div>
  );
}
