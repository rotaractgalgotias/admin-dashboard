import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MemberTypeBadge from "./MemberTypeBadge";
import { prisma } from "@/lib/prisma";
import { allPositions } from "@/utils/positions";
import EditMemberDialog from "./EditMemberDialog";
import DeleteMemberDialog from "./DeleteMemberDialog";
import { MemberType, Position } from "@prisma/client";
import { currentYear } from "@/lib/utils";

export default async function MembersTable() {
  const members = await prisma.member.findMany({
    include: {
      roles: {
        where: {
          year: {
            year: currentYear,
          },
        },
      },
    },
    where: {
      verified: true,
      roles: {
        every: {
          year: {
            year: currentYear,
          },
        },
      },
    },
  });

  const sortedMembers = members.sort((a, b) => {
    const order = ["COUNCIL", "DIRECTOR", "COORDINATOR", "MEMBER"];
    const typeComparison =
      order.indexOf(a.roles[0].memberType) -
      order.indexOf(b.roles[0].memberType);
    if (typeComparison !== 0) return typeComparison;

    if (
      a.roles[0].memberType === "COUNCIL" &&
      b.roles[0].memberType === "COUNCIL"
    ) {
      return (
        allPositions.indexOf(a.roles[0]?.position as Position) -
        allPositions.indexOf(b.roles[0]?.position as Position)
      );
    }

    return 0;
  });
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
          {sortedMembers.map((member, index) => (
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
              <TableCell>
                {member.roles[0].position.replace(/_/g, " ")}
              </TableCell>
              <TableCell>
                <MemberTypeBadge
                  memberType={member.roles[0]?.memberType as MemberType}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditMemberDialog member={member} />
                  <DeleteMemberDialog member={member} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
