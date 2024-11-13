import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import Image from "next/image";

export async function EventsTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const events = await prisma.event.findMany({
    where: {
      title: {
        contains: searchParams.q as string,
        mode: "insensitive",
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Button variant="ghost">S.No</Button>
            </TableHead>
            <TableHead className="w-[300px]">
              <Button variant="ghost">Title</Button>
            </TableHead>
            <TableHead className="w-48">
              <Button variant="ghost">Date</Button>
            </TableHead>
            <TableHead className="truncate w-48">Location</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">Volunteers</Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">People Impacted</Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">Duration (hours)</Button>
            </TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={event.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="size-14 min-w-14 relative rounded-md overflow-hidden">
                    <Image
                      src={event.coverImage ?? "/placeholder.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p>{event.title}</p>
                </div>
              </TableCell>
              <TableCell>{format(event.date.toUTCString(), "PPP")}</TableCell>
              <TableCell className="">{event.location}</TableCell>
              <TableCell className="text-center w-16">
                {event.numberOfVolunteers ?? "-"}
              </TableCell>
              <TableCell className="text-center w-16">
                {event.peopleImpacted ?? "-"}
              </TableCell>
              <TableCell className="text-center w-16">
                {event.duration ?? "-"}
              </TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Copy event ID</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link
                      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${event.slug}`}
                    >
                      <DropdownMenuItem>View event</DropdownMenuItem>
                    </Link>
                    <Link href={`/events/${event.slug}/edit`}>
                      <DropdownMenuItem>Edit event</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem asChild className="text-red-600">
                      <DeleteBtn id={event.id} name={event.title} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
