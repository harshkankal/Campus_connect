import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarDays, Megaphone, BookUser } from "lucide-react";
import TimetableView from "./timetable-view";

const features = (userId: string | null) => [
    {
        title: "My Timetable",
        description: "View your class schedule for the week.",
        icon: CalendarDays,
        href: `/dashboard/timetable?role=student&userId=${userId}`,
    },
    {
        title: "Campus Events",
        description: "Discover and RSVP to upcoming events.",
        icon: Megaphone,
        href: `/dashboard/events?role=student&userId=${userId}`,
    },
    {
        title: "Attendance History",
        description: "Track your attendance record.",
        icon: BookUser,
        href: `/dashboard/attendance-history?role=student&userId=${userId}`,
    },
];

export default function StudentDashboard({ userId }: { userId: string | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening on campus.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {features(userId).map(feature => (
          <Link href={feature.href} key={feature.title}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                  </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Timetable</h2>
          <TimetableView role="student" />
      </div>
    </div>
  );
}
