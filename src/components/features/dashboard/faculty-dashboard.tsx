import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Camera, CalendarDays, Megaphone, BarChart3 } from "lucide-react";
import TimetableView from "./timetable-view";

const features = [
    {
        title: "Take Attendance",
        description: "Start automated attendance for your class.",
        icon: Camera,
        href: "/dashboard/attendance?role=faculty",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "View Timetable",
        description: "Check your weekly teaching schedule.",
        icon: CalendarDays,
        href: "/dashboard/timetable?role=faculty",
        color: "text-purple-500",
        bgColor: "bg-purple-50",
    },
    {
        title: "Manage Events",
        description: "Create and manage events for students.",
        icon: Megaphone,
        href: "/dashboard/events?role=faculty",
        color: "text-pink-500",
        bgColor: "bg-pink-50",
    },
    {
        title: "Analytics",
        description: "View attendance and event participation data.",
        icon: BarChart3,
        href: "/dashboard/analytics?role=faculty",
        color: "text-green-500",
        bgColor: "bg-green-50",
    },
];

export default function FacultyDashboard() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome back. Manage your classes and events.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
            <Link href={feature.href} key={feature.title}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
                </Card>
            </Link>
            ))}
        </div>
        
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Timetable Today</h2>
            <TimetableView role="faculty" />
        </div>
    </div>
  );
}
