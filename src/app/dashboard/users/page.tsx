import { UserManagementPanel } from "@/components/features/dashboard/user-management-panel";

export default function UsersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage student, faculty, and admin accounts.
        </p>
      </div>
      <UserManagementPanel />
    </div>
  );
}
