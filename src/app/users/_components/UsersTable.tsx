import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Edit } from "lucide-react";
import DeleteUserBtn from "./DeleteUserBtn";

export default async function UsersTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: searchParams.q as string,
        mode: "insensitive",
      },
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px] px-5">Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right px-5">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow className="" key={user.id}>
            <TableCell className="px-5">
              <Avatar className="">
                {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" className="mr-2">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <DeleteUserBtn email={user.email} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
