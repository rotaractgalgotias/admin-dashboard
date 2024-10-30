import React from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { ActivityLog } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ActivityLogEntry = ActivityLog;

const getActionIcon = (action: ActivityLogEntry["action"]) => {
  switch (action) {
    case "CREATE":
      return <PlusCircle className="h-5 w-5 text-green-500" />;
    case "UPDATE":
      return <Edit className="h-5 w-5 text-blue-500" />;
    case "DELETE":
      return <Trash2 className="h-5 w-5 text-red-500" />;
  }
};

const getActionColor = (action: ActivityLogEntry["action"]) => {
  switch (action) {
    case "CREATE":
      return "bg-green-100 text-green-800";
    case "UPDATE":
      return "bg-blue-100 text-blue-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
  }
};

export async function ActivityLogComponent() {
  const activityLogData = await prisma.activityLog.findMany({
    orderBy: {
      timestamp: "desc",
    },
  });
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
      <ul className="space-y-8">
        {activityLogData.map((entry, index) => (
          <li key={entry.id} className="relative pl-10 pb-8">
            {index !== activityLogData.length - 1 && (
              <div className="absolute left-[19px] top-[32px] bottom-0 w-px bg-primary" />
            )}
            <div className="flex items-start">
              <div className="absolute left-0 mt-1 bg-white p-1 rounded-full shadow-sm">
                {getActionIcon(entry.action)}
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getActionColor(
                      entry.action
                    )}`}
                  >
                    {entry.action}
                  </span>
                  <time
                    dateTime={entry.timestamp.toISOString()}
                    className="text-xs text-muted-foreground"
                  >
                    {entry.timestamp.toLocaleString()}
                  </time>
                </div>
                {entry.details && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.details}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
