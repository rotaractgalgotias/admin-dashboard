"use client";

import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Moon,
  Package,
  Search,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserProfileSkeleton } from "./UserProfileSkeleton";

export default function Sidebar() {
  // Sidebar comp
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  console.log("pathname", pathname);

  return (
    <aside className="flex flex-col h-screen w-64 max-w-64 min-w-64 bg-accent text-muted-foreground border-r border-border">
      <div className="p-4 flex items-center justify-between pt-6">
        <Link href="/">
          <h1 className="text-xl font-semibold dark:text-white">
            Rotaract Admin
          </h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 pr-12 bg-transparent text-muted-foreground ring-muted rounded-full"
            placeholder="Search"
            type="search"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
            ⌘F
          </span>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 p-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", link: "/index" },
            { icon: Package, label: "Events", link: "/events" },
            { icon: Users, label: "Users", link: "/users" },
            { icon: Bell, label: "Activity Logs", link: "/activity-logs", },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.link === "/index" ? "/" : item.link}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-primary text-muted-foreground hover:text-primary-foreground",
                  {
                    "bg-primary text-primary-foreground":
                      item.link === "/index"
                        ? pathname === "/"
                        : pathname.startsWith(item.link),
                  }
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <div>
            <Separator className="my-3" />
          </div>

          <li>
            <Link
              href="/help-support"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & support</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      {session ? (
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar className="size-8">
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {session?.user?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </span>
                </div>
                <ChevronDown className="size-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <Link
                href={"/profile"}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
             
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <UserProfileSkeleton />
      )}
    </aside>
  );
}
