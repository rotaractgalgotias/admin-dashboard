import React, { Suspense } from "react";
import MembersTable from "./_components/MembersTable";
import MembersTableSkeleton from "./_components/MembersTableSkeleton";
import AddMemberDialog from "./_components/AddMemberDialog";

export default function page() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Member Management</h1>
        <AddMemberDialog />
      </div>
      <Suspense fallback={<MembersTableSkeleton />}>
        <MembersTable />
      </Suspense>
    </div>
  );
}
