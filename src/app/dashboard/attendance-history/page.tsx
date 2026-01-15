'use client';

import { Suspense } from 'react';
import { AttendanceHistoryPanel } from "@/components/features/attendance/attendance-history-panel";
import { Skeleton } from '@/components/ui/skeleton';
import type { UserRole } from '@/lib/types';

function AttendanceHistoryContent({ role, userId }: { role: UserRole; userId: string | null; }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AttendanceHistoryPanel role={role} userId={userId} />
    </div>
  );
}

export default function AttendanceHistoryPage({ searchParams }: { searchParams: { role: string | null; userId: string | null; }}) {
    const role = (searchParams.role as UserRole) || 'student';
    const userId = searchParams.userId || null;
    
    return (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <AttendanceHistoryContent role={role} userId={userId} />
        </Suspense>
    );
}
