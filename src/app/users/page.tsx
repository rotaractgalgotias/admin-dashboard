import { Suspense } from "react";
import AddUserBtn from "./_components/AddUserBtn";
import UsersTableSkeleton from "./_components/UserTableSkeleton";
import UsersTable from "./_components/UsersTable";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const SearchParams = await searchParams;
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
        <AddUserBtn />
      </div>
      <div className="rounded-md border">
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable searchParams={SearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
