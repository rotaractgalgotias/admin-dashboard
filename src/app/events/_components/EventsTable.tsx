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
            <TableHead className="w-[200px]">
              <Button variant="ghost">Title</Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost">Date</Button>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">Volunteers</Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">People Impacted</Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost">Duration (hours)</Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell className="text-right">
                {event.numberOfVolunteers ?? "-"}
              </TableCell>
              <TableCell className="text-right">
                {event.peopleImpacted ?? "-"}
              </TableCell>
              <TableCell className="text-right">
                {event.duration ?? "-"}
              </TableCell>
              <TableCell className="text-right">
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
                    <DropdownMenuItem>View event</DropdownMenuItem>
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
