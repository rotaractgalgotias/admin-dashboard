import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenIcon, TrashIcon } from "lucide-react";
import MemberTypeBadge from "./MemberTypeBadge";
import { prisma } from "@/lib/prisma";
import { allPositions } from "@/utils/positions";

export default async function MembersTable() {
  const members = await prisma.member.findMany({
    where: {
      memberType: {
        in: ["COUNCIL", "DIRECTOR"],
      },
    },
  });

  const allMembersOtherThanCouncilAndDirector = await prisma.member.findMany({
    where: {
      memberType: {
        in: ["COORDINATOR", "MEMBER"],
      },
    },
  });

  const sortedMembers = members.sort((a, b) => {
    const order = ["COUNCIL", "DIRECTOR", "COORDINATOR"];
    const typeComparison =
      order.indexOf(a.memberType) - order.indexOf(b.memberType);
    if (typeComparison !== 0) return typeComparison;

    if (a.memberType === "COUNCIL" && b.memberType === "COUNCIL") {
      return (
        allPositions.indexOf(a.position) - allPositions.indexOf(b.position)
      );
    }

    return 0;
  });

  const data = [...sortedMembers, ...allMembersOtherThanCouncilAndDirector];
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">S.No</TableHead>
            <TableHead className="w-[50px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member, index) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.position.replace(/_/g, " ")}</TableCell>
              <TableCell>
                <MemberTypeBadge memberType={member.memberType} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <PenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
