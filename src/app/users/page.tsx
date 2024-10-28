import { Suspense } from "react";
import AddUserBtn from "./AddUserBtn";
import UsersTableSkeleton from "./UserTableSkeleton";
import UsersTable from "./UsersTable";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
        <AddUserBtn />
      </div>
      <div className="rounded-md border">
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable />
        </Suspense>
      </div>
    </div>
  );
}
