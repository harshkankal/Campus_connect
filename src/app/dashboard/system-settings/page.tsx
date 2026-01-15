import { SystemSettingsPanel } from "@/components/features/dashboard/system-settings-panel";

export default function SystemSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage system-wide configurations.
        </p>
      </div>
      <SystemSettingsPanel />
    </div>
  );
}
