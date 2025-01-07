import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { AddNewsletterDialog } from "./_components/add-newsletter-dialogue";

// Dummy data
const dummyNewsletters = [
  {
    id: "1",
    title: "January Newsletter",
    content: "January content here",
    news: "Latest updates",
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    coverImage: "/images/january.jpg",
    month: "January",
    totalPages: 10,
  },
  {
    id: "2",
    title: "February Newsletter",
    content: "February content here",
    news: "Latest updates",
    date: new Date(),
    createdAt: new Date(2024, 1, 15),
    updatedAt: new Date(),
    coverImage: "/images/february.jpg",
    month: "February",
    totalPages: 8,
  },
];

export default function NewsletterPage() {
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
            {dummyNewsletters.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell>{newsletter.title}</TableCell>
                <TableCell>{newsletter.month}</TableCell>
                <TableCell>{newsletter.totalPages}</TableCell>
                <TableCell>{format(newsletter.createdAt, "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {dummyNewsletters.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
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
