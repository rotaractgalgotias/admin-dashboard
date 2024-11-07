"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Calendar,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data (unchanged)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockData = {
  stats: {
    totalUsers: 156,
    verifiedUsers: 142,
    totalEvents: 24,
    activeEvents: 8,
  },
  recentEvents: [
    {
      id: "1",
      title: "Community Cleanup Drive",
      date: "2024-03-15",
      location: "Central Park",
      numberOfVolunteers: 45,
      peopleImpacted: 200,
    },
    {
      id: "2",
      title: "Youth Leadership Workshop",
      date: "2024-03-20",
      location: "Community Center",
      numberOfVolunteers: 12,
      peopleImpacted: 60,
    },
    {
      id: "3",
      title: "Food Distribution Drive",
      date: "2024-03-25",
      location: "Downtown Area",
      numberOfVolunteers: 30,
      peopleImpacted: 150,
    },
  ],
  activityLog: [
    {
      id: "1",
      action: "CREATE",
      timestamp: new Date().toISOString(),
      details: "New event created: Community Cleanup Drive",
    },
    {
      id: "2",
      action: "UPDATE",
      timestamp: new Date().toISOString(),
      details: "Updated event details: Youth Leadership Workshop",
    },
    {
      id: "3",
      action: "DELETE",
      timestamp: new Date().toISOString(),
      details: "Deleted cancelled event: Evening Seminar",
    },
  ],
  monthlyData: [
    { month: "Jan", events: 4, volunteers: 120, impacted: 450 },
    { month: "Feb", events: 6, volunteers: 180, impacted: 680 },
    { month: "Mar", events: 8, volunteers: 240, impacted: 920 },
    { month: "Apr", events: 5, volunteers: 150, impacted: 540 },
    { month: "May", events: 7, volunteers: 210, impacted: 780 },
    { month: "Jun", events: 9, volunteers: 270, impacted: 1100 },
  ],
  userRoles: [
    { name: "ADMIN", value: 12 },
    { name: "EDITOR", value: 144 },
  ],
};

const COLORS = ["#22C55E", "#64748b"]; // Green and muted blue

export default function AdaptiveDashboard({ data }: { data: typeof mockData }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handler = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`flex-1 space-y-4 p-4 md:p-8`}>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">
          Dashboard Overview
        </h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: data.stats.totalUsers,
            icon: Users,
          },
          {
            title: "Total Events",
            value: data.stats.totalEvents,
            icon: Calendar,
          },
          { title: "Total Volunteers", value: "487", icon: UserCheck },
          { title: "People Impacted", value: "2,450", icon: Activity },
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Event & Volunteer Trends</CardTitle>
            <CardDescription>
              Monthly overview of events and volunteer participation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyData}>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                      borderRadius: "4px",
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="volunteers"
                    stroke="#22C55E"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="impacted"
                    stroke="#64748b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Distribution of user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.userRoles}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.userRoles.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                      borderRadius: "4px",
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {data.userRoles.map((role, index) => (
                <div key={role.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {role.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events and Activity Log */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest events in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Recent system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.activityLog.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  {activity.action === "CREATE" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {activity.action === "UPDATE" && (
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  )}
                  {activity.action === "DELETE" && (
                    <Activity className="h-5 w-5 text-red-500" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
