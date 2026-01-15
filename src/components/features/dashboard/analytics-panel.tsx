"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, subDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { ReportDialog } from "./report-dialog"
import { mockDepartments } from "@/lib/data"

const attendanceData = [
  { division: "FY BSc CS", present: 85, absent: 15 },
  { division: "SY BSc CS", present: 92, absent: 8 },
  { division: "FY BCom", present: 78, absent: 22 },
  { division: "SY BCom", present: 95, absent: 5 },
  { division: "TY BA", present: 88, absent: 12 },
]

const eventData = [
  { name: 'Tech Events', value: 400 },
  { name: 'Cultural Fests', value: 300 },
  { name: 'Sports Days', value: 300 },
  { name: 'Workshops', value: 200 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const attendanceChartConfig = {
    present: { label: "Present", color: "hsl(var(--chart-2))" },
    absent: { label: "Absent", color: "hsl(var(--chart-5))" },
}

const eventChartConfig = {
    "Tech Events": { label: "Tech", color: "hsl(var(--chart-1))" },
    "Cultural Fests": { label: "Cultural", color: "hsl(var(--chart-2))" },
    "Sports Days": { label: "Sports", color: "hsl(var(--chart-3))" },
    "Workshops": { label: "Workshops", color: "hsl(var(--chart-4))" },
}

export function AnalyticsPanel() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
           <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {mockDepartments.map(d => (
                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Divisions</SelectItem>
              <SelectItem value="fy_cs">FY BSc CS</SelectItem>
              <SelectItem value="sy_bcom">SY BCom</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <ReportDialog>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </ReportDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance by Division</CardTitle>
            <CardDescription>Daily average attendance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={attendanceChartConfig} className="h-64">
              <BarChart data={attendanceData} layout="vertical" stackOffset="expand">
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="division" type="category" tickLine={false} axisLine={false} width={80} />
                <XAxis type="number" hide={true} />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="var(--color-present)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="absent" stackId="a" fill="var(--color-absent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Event Participation</CardTitle>
            <CardDescription>Participation distribution by event type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={eventChartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie data={eventData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                         {eventData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent hideLabel />} />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
