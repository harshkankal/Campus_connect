import { Suspense } from 'react';
import TimetableView from "@/components/features/dashboard/timetable-view";
import { Skeleton } from '@/components/ui/skeleton';
import type { UserRole } from '@/lib/types';

function TimetableContent({ role }: { role: UserRole }) {
  const title = role === 'faculty' ? "Your Teaching Schedule" : "Your Class Timetable";
  const description = role === 'faculty' ? "Here is your weekly teaching schedule." : "Here is your class schedule for the week.";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <TimetableView role={role} />
    </div>
  );
}

export default function TimetablePage({ searchParams }: { searchParams: { role: string | null }}) {
    const role = (searchParams.role as UserRole) || 'student';
    
    return (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <TimetableContent role={role} />
        </Suspense>
    );
}
