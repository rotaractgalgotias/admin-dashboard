import React, { Suspense } from "react";
import MembersTable from "./_components/MembersTable";
import MembersTableSkeleton from "./_components/MembersTableSkeleton";

export default function page() {
  return (
    <Suspense fallback={<MembersTableSkeleton />}>
      <MembersTable />
    </Suspense>
  );
}
