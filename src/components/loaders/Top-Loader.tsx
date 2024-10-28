"use client";
import React, { Suspense, useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import * as NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    NProgress.done();
  }, [pathname, router, searchParams]);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Suspense>
      <NextTopLoader showSpinner={false} color={"#858585"} />
    </Suspense>
  );
}
