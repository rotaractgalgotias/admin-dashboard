import AdaptiveDashboard from "@/app/_components/dashboard-home";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import React, { Suspense } from "react";
import { DashboardLoadingSkeletonsComponent } from "./_components/dashboard-loading-skeletons";

const Dashboard = async () => {
  const totalUsersPromise = prisma.user.count();
  const verifiedUsersPromise = prisma.user.count({
    where: { firstTime: false },
  });
  const totalEventsPromise = prisma.event.count();
  const activeEventsPromise = prisma.event.count({
    where: {
      date: {
        gte: new Date(new Date().setDate(1)),
        lt: new Date(new Date().setMonth(new Date().getMonth() + 1, 1)),
      },
    },
  });

  const recentEventsPromise = prisma.event.findMany({
    take: 3,
    orderBy: { date: "desc" },
  });

  const activityLogPromise = prisma.activityLog.findMany({
    take: 3,
    orderBy: { timestamp: "desc" },
  });

  // resolve all promises
  const [
    totalUsers,
    verifiedUsers,
    totalEvents,
    activeEvents,
    recentEvents,
    activityLog,
  ] = await Promise.all([
    totalUsersPromise,
    verifiedUsersPromise,
    totalEventsPromise,
    activeEventsPromise,
    recentEventsPromise,
    activityLogPromise,
  ]);

  const mockData = {
    stats: {
      totalUsers,
      verifiedUsers,
      totalEvents,
      activeEvents,
    },
    recentEvents: recentEvents.map((event) => ({
      id: event.id,
      title: event.title,
      date: format(new Date(event.date), "dd/MM/yyyy"),
      location: event.location,
      numberOfVolunteers: 45,
      peopleImpacted: 200,
    })),
    activityLog: activityLog.map((log) => ({
      id: log.id,
      action: log.action as string,
      timestamp: new Date(log.timestamp).toISOString(),
      details: log.details ?? "",
    })),
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
  return <AdaptiveDashboard data={mockData} />;
};

function Page() {
  return (
    <div>
      <Suspense fallback={<DashboardLoadingSkeletonsComponent />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export default Page;
