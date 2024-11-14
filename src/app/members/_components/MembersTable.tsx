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
        include: {
          year: true,
        },
      },
    },
  });

  const sortedMembers = members.sort((a, b) => {
    const order = ["COUNCIL", "DIRECTOR", "COORDINATOR", "MEMBER"];
    const typeComparison =
      order.indexOf(
        a.roles?.find((role) => role.year.year === currentYear)?.memberType ??
          ""
      ) -
      order.indexOf(
        b.roles.find((role) => role.year.year === currentYear)?.memberType ?? ""
      );
    if (typeComparison !== 0) return typeComparison;

    if (
      (a.roles.find((role) => role.year.year === currentYear)?.memberType ??
        "") === "COUNCIL" &&
      (b.roles.find((role) => role.year.year === currentYear)?.memberType ??
        "") === "COUNCIL"
    ) {
      return (
        allPositions.indexOf(
          a.roles.find((role) => role.year.year === currentYear)
            ?.position as Position
        ) -
        allPositions.indexOf(
          b.roles.find((role) => role.year.year === currentYear)
            ?.position as Position
        )
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
                {member.roles
                  .find((role) => role.year.year === currentYear)
                  ?.position.replace(/_/g, " ")}
              </TableCell>
              <TableCell>
                <MemberTypeBadge
                  memberType={
                    member.roles.find((role) => role.year.year === currentYear)
                      ?.memberType as MemberType
                  }
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
