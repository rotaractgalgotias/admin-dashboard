import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/userStore";
import SearchComp from "./SearchComp";

export default function Header() {
  const [greeting, setGreeting] = useState("Hey");
  const [notifications, setNotifications] = useState([
    "New user registered",
    "Event 'Annual Meeting' created",
    "5 new members joined",
  ]);
  const { user } = useUserStore();

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  //   console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl capitalize font-semibold">
            <span className="sr-only">Current greeting: </span>
            {greeting},{" "}
            {user?.name && user?.name?.split(" ")?.length > 0
              ? user?.name?.split(" ")[0] ?? "User"
              : user?.name ?? "User"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchComp />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span
                    className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  Notifications
                  {notifications.length > 0
                    ? `, ${notifications.length} unread`
                    : ""}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <DropdownMenuItem key={index}>
                    {notification}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
