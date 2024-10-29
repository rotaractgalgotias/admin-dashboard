import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit,
  Trash2,
  Calendar,
  Info,
  UserPlus,
  UserCog,
} from "lucide-react";

type ActivityLogEntry = {
  id: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "NEW_USER" | "ROLE_CHANGE";
  timestamp: string;
  details?: string;
  userId: string;
  eventId?: string;
  targetUserId?: string;
  user: {
    name: string;
    image?: string;
  };
  event?: {
    name: string;
    date?: string;
  };
  targetUser?: {
    name: string;
    image?: string;
  };
  roleChange?: {
    from: string;
    to: string;
  };
};

const activityLogData: ActivityLogEntry[] = [
  {
    id: "1",
    action: "CREATE",
    timestamp: "2023-05-15T10:30:00Z",
    details: "New event created",
    userId: "user1",
    eventId: "event1",
    user: { name: "John Doe", image: "/placeholder.svg?height=40&width=40" },
    event: { name: "Summer Festival", date: "2023-07-15" },
  },
  {
    id: "2",
    action: "NEW_USER",
    timestamp: "2023-05-16T09:15:00Z",
    details: "New user was added",
    userId: "user2",
    targetUserId: "user3",
    user: { name: "Jane Smith", image: "/placeholder.svg?height=40&width=40" },
    targetUser: {
      name: "Alice Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    action: "ROLE_CHANGE",
    timestamp: "2023-05-17T14:45:00Z",
    details: "User role changed",
    userId: "user1",
    targetUserId: "user2",
    user: { name: "John Doe", image: "/placeholder.svg?height=40&width=40" },
    targetUser: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    roleChange: { from: "Member", to: "Admin" },
  },
  {
    id: "4",
    action: "UPDATE",
    timestamp: "2023-05-18T11:30:00Z",
    details: "Event details updated",
    userId: "user2",
    eventId: "event1",
    user: { name: "Jane Smith", image: "/placeholder.svg?height=40&width=40" },
    event: { name: "Summer Festival", date: "2023-07-20" },
  },
  {
    id: "5",
    action: "DELETE",
    timestamp: "2023-05-19T16:00:00Z",
    details: "Event cancelled",
    userId: "user1",
    eventId: "event2",
    user: { name: "John Doe", image: "/placeholder.svg?height=40&width=40" },
    event: { name: "Winter Gala", date: "2023-12-20" },
  },
];

const getActionIcon = (action: ActivityLogEntry["action"]) => {
  switch (action) {
    case "CREATE":
      return <PlusCircle className="h-5 w-5 text-green-500" />;
    case "UPDATE":
      return <Edit className="h-5 w-5 text-blue-500" />;
    case "DELETE":
      return <Trash2 className="h-5 w-5 text-red-500" />;
    case "NEW_USER":
      return <UserPlus className="h-5 w-5 text-purple-500" />;
    case "ROLE_CHANGE":
      return <UserCog className="h-5 w-5 text-orange-500" />;
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
    case "NEW_USER":
      return "bg-purple-100 text-purple-800";
    case "ROLE_CHANGE":
      return "bg-orange-100 text-orange-800";
  }
};

export function ActivityLogComponent() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
      <ul className="space-y-8">
        {activityLogData.map((entry, index) => (
          <li key={entry.id} className="relative pl-10 pb-8">
            {index !== activityLogData.length - 1 && (
              <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-gray-200" />
            )}
            <div className="flex items-start">
              <div className="absolute left-0 mt-1 bg-white p-1 rounded-full shadow-sm">
                {getActionIcon(entry.action)}
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={entry.user.image}
                        alt={entry.user.name}
                      />
                      <AvatarFallback>
                        {entry.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {entry.user.name}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getActionColor(
                          entry.action
                        )}`}
                      >
                        {entry.action.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{entry.details}</p>
                {entry.event && (
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {entry.event.name}
                    </div>
                    {entry.event.date && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Info className="h-4 w-4 mr-1" />
                        Event Date:{" "}
                        {new Date(entry.event.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}
                {entry.targetUser && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={entry.targetUser.image}
                        alt={entry.targetUser.name}
                      />
                      <AvatarFallback>
                        {entry.targetUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">
                      {entry.targetUser.name}
                    </span>
                  </div>
                )}
                {entry.roleChange && (
                  <p className="mt-1 text-sm text-gray-600">
                    Role changed from {entry.roleChange.from} to{" "}
                    {entry.roleChange.to}
                  </p>
                )}
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
