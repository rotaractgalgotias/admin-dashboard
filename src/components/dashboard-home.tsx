'use client'

import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Users, 
  Calendar, 
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data based on your schema
const mockData = {
  stats: {
    totalUsers: 156,
    verifiedUsers: 142,
    totalEvents: 24,
    activeEvents: 8,
  },
  recentEvents: [
    {
      id: '1',
      title: 'Community Cleanup Drive',
      date: '2024-03-15',
      location: 'Central Park',
      numberOfVolunteers: 45,
      peopleImpacted: 200,
    },
    {
      id: '2',
      title: 'Youth Leadership Workshop',
      date: '2024-03-20',
      location: 'Community Center',
      numberOfVolunteers: 12,
      peopleImpacted: 60,
    },
    {
      id: '3',
      title: 'Food Distribution Drive',
      date: '2024-03-25',
      location: 'Downtown Area',
      numberOfVolunteers: 30,
      peopleImpacted: 150,
    },
  ],
  activityLog: [
    {
      id: '1',
      action: 'CREATE',
      timestamp: new Date().toISOString(),
      details: 'New event created: Community Cleanup Drive',
    },
    {
      id: '2',
      action: 'UPDATE',
      timestamp: new Date().toISOString(),
      details: 'Updated event details: Youth Leadership Workshop',
    },
    {
      id: '3',
      action: 'DELETE',
      timestamp: new Date().toISOString(),
      details: 'Deleted cancelled event: Evening Seminar',
    },
  ],
  monthlyData: [
    { month: 'Jan', events: 4, volunteers: 120, impacted: 450 },
    { month: 'Feb', events: 6, volunteers: 180, impacted: 680 },
    { month: 'Mar', events: 8, volunteers: 240, impacted: 920 },
    { month: 'Apr', events: 5, volunteers: 150, impacted: 540 },
    { month: 'May', events: 7, volunteers: 210, impacted: 780 },
    { month: 'Jun', events: 9, volunteers: 270, impacted: 1100 },
  ],
  userRoles: [
    { name: 'ADMIN', value: 12 },
    { name: 'EDITOR', value: 144 },
  ],
}

const COLORS = ['#22C55E', '#64748b'] // Green from the screenshot and a muted blue

export function DashboardHomeComponent() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 bg-sidebar-primary-foreground text-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white border-0">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: mockData.stats.totalUsers, icon: Users },
          { title: "Total Events", value: mockData.stats.totalEvents, icon: Calendar },
          { title: "Total Volunteers", value: "487", icon: UserCheck },
          { title: "People Impacted", value: "2,450", icon: Activity }
        ].map((stat, index) => (
          <Card key={index} className="bg-[#1A1A1A] border-[#2a2a2a]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-[#1A1A1A] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Event & Volunteer Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly overview of events and volunteer participation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.monthlyData}>
                  <XAxis 
                    dataKey="month" 
                    stroke="#666666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#666666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '4px',
                      color: '#ffffff'
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
        <Card className="col-span-3 bg-[#1A1A1A] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">User Distribution</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of user roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.userRoles}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.userRoles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: '1px solid #2a2a2a',
                      borderRadius: '4px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {mockData.userRoles.map((role, index) => (
                <div key={role.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-400">{role.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events and Activity Log */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#1A1A1A] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
            <CardDescription className="text-gray-400">
              Latest events in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-[#222222]">
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.recentEvents.map((event) => (
                  <TableRow key={event.id} className="border-[#2a2a2a] hover:bg-[#222222]">
                    <TableCell className="font-medium text-gray-200">{event.title}</TableCell>
                    <TableCell className="text-gray-300">{event.date}</TableCell>
                    <TableCell className="text-gray-300">{event.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1A1A] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Activity Log</CardTitle>
            <CardDescription className="text-gray-400">
              Recent system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.activityLog.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  {activity.action === 'CREATE' && <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />}
                  {activity.action === 'UPDATE' && <AlertCircle className="h-5 w-5 text-[#64748b]" />}
                  {activity.action === 'DELETE' && <Activity className="h-5 w-5 text-red-500" />}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-400">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}