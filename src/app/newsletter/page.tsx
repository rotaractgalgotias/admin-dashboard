import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { AddNewsletterDialog } from "./_components/add-newsletter-dialogue";
import { prisma } from "@/lib/prisma";
import { EditNewsletterDialog } from "./_components/EditNewsletter";
import { DeleteNewsletterDialog } from "./_components/DeleteNewsletter";
import { currentYear } from "@/lib/utils";

export const revalidate = 60;
export default async function NewsletterPage() {
  const newsletters = await prisma.newsletter.findMany({
    where: {
      year: {
        year: currentYear,
      },
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Newsletter Management</h1>
        <AddNewsletterDialog>
          <Button>Add Newsletter</Button>
        </AddNewsletterDialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Pages</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell>{newsletter.title}</TableCell>
                <TableCell>{newsletter.month}</TableCell>
                <TableCell>{newsletter.totalPages}</TableCell>
                <TableCell>
                  {format(newsletter.createdAt, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <EditNewsletterDialog newsletter={newsletter}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </EditNewsletterDialog>
                  <DeleteNewsletterDialog newsletter={newsletter}>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Delete
                    </Button>
                  </DeleteNewsletterDialog>
                </TableCell>
              </TableRow>
            ))}
            {newsletters.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No newsletters found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
