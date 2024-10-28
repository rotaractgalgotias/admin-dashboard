"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

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
      <div className="w-full">
        <Header />
        <div className="p-10 pt-6">{children}</div>
      </div>
    </main>
  );
}
