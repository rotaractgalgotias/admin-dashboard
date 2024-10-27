"use client";

import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-screen w-64 bg-background text-muted-foreground border-r border-border">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Rotaract Admin</h1>
        <button className="text-muted-foreground hover:text-foreground">
          <ChevronDown className="h-4 w-4" />
        </button>
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
            { icon: ShoppingCart, label: "Orders", link: "/orders" },
            { icon: Package, label: "Inventory", link: "/packages" },
            { icon: Users, label: "Customers", link: "/users" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.link === "/index" ? "/" : item.link}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
                  {
                    "bg-accent text-accent-foreground":
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
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </div>
              <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-full">
                1
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & support</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center space-x-3 w-full">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              layout="fill"
              className="aspect-square h-full w-full"
              alt="Olivia Williams"
              src="/placeholder.svg?height=40&width=40"
            />
          </span>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Olivia Williams</span>
            <span className="text-xs text-muted-foreground">
              olivia@example.com
            </span>
          </div>
          <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
