import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3, CalendarDays, Megaphone, Users } from "lucide-react";
import { AnalyticsPanel } from "./analytics-panel";

const features = [
    {
        title: "Timetable Scheduler",
        description: "Generate and manage academic timetables.",
        icon: CalendarDays,
        href: "/dashboard/scheduler?role=admin",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "Analytics Dashboard",
        description: "View attendance and event participation data.",
        icon: BarChart3,
        href: "/dashboard/analytics?role=admin",
        color: "text-purple-500",
        bgColor: "bg-purple-50",
    },
    {
        title: "Event Management",
        description: "Create, publish, and manage campus events.",
        icon: Megaphone,
        href: "/dashboard/events?role=admin",
        color: "text-pink-500",
        bgColor: "bg-pink-50",
    },
    {
        title: "User Management",
        description: "Manage student photos for verification.",
        icon: Users,
        href: "/dashboard/users?role=admin",
        color: "text-green-500",
        bgColor: "bg-green-50",
    },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's your overview.</p>
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
      
      <AnalyticsPanel />
    </div>
  );
}
