import React, { Suspense } from "react";
import { EventsTable } from "./_components/EventsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { EventsTableSkeleton } from "./_components/EventsTableSkeleton";
import Link from "next/link";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const SearchParams = await searchParams;
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <Link href="/events/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Events
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Suspense fallback={<EventsTableSkeleton />}>
          <EventsTable searchParams={SearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
