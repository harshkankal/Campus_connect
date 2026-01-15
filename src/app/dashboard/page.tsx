import { Suspense } from "react";
import AdminDashboard from "@/components/features/dashboard/admin-dashboard";
import FacultyDashboard from "@/components/features/dashboard/faculty-dashboard";
import StudentDashboard from "@/components/features/dashboard/student-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserRole } from "@/lib/types";

function DashboardContent({ role, userId }: { role: UserRole | null, userId: string | null }) {
  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "faculty":
        return <FacultyDashboard />;
      case "student":
        return <StudentDashboard userId={userId} />;
      default:
        return <StudentDashboard userId={userId} />; // Default to student dashboard
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {renderDashboard()}
    </div>
  );
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { role: string | null; userId: string | null };
}) {
  const role = (searchParams.role as UserRole) || 'student';

  return (
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <DashboardContent role={role} userId={searchParams.userId} />
    </Suspense>
  );
}
