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
import { $Enums } from "@prisma/client";
import MemberTypeBadge from "./MemberTypeBadge";
import AddMemberDialog from "./AddMemberDialog";

// Types based on the schema

interface Member {
  id: string;
  name: string;
  position: $Enums.Position;
  imageUrl: string;
  memberType: $Enums.MemberType;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
const members: Member[] = [
  {
    id: "1",
    name: "John Smith",
    position: "PRESIDENT",
    imageUrl: "/placeholder.svg",
    memberType: "COUNCIL",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "SECRETARY",
    imageUrl: "/placeholder.svg",
    memberType: "DIRECTOR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock members as needed
];

export default function MembersTable() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Member Management</h1>
        <AddMemberDialog />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
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
    </div>
  );
}
