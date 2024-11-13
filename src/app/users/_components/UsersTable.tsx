import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import DeleteUserBtn from "./DeleteUserBtn";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import EditUserBtn from "./EditUserBtn";

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

  const session = await auth();

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
              {session?.user?.email !== user.email ? (
                <>
                  <EditUserBtn
                    userData={{
                      email: user.email,
                      id: user.id,
                      name: user.name,
                      role: user.role,
                    }}
                  />
                  <DeleteUserBtn email={user.email} />
                </>
              ) : (
                <Badge className="pr-4">Me</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
