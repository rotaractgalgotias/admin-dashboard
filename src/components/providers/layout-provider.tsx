"use client";

import React from "react";
import Sidebar from "../layout/sidebar";
import { usePathname } from "next/navigation";

export default function LayoutProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }
  return (
    <main className="h-dvh w-full overflow-hidden flex">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
