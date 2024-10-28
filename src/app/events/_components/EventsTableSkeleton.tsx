import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function EventsTableSkeleton() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" disabled>
                Title
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" disabled>
                Date
              </Button>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" disabled>
                Volunteers
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" disabled>
                People Impacted
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" disabled>
                Duration (hours)
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="h-5 w-[180px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[150px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[50px] ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[50px] ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-[50px] ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
