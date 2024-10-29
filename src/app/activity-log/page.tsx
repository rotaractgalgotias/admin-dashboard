import React, { Suspense } from "react";
import { ActivityLogComponent } from "./_components/ActivityLog";
import ActivityLogSkeleton from "./_components/Skeleton";

export default function page() {
  return (
    <div>
      <Suspense fallback={<ActivityLogSkeleton />}>
        <ActivityLogComponent />
      </Suspense>
    </div>
  );
}
