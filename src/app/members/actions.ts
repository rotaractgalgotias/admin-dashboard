"use server";

import { prisma } from "@/lib/prisma";
import { $Enums, MemberType, Position } from "@prisma/client";
import {
  councilPositions,
  directorAndCoordinatorPositions,
} from "../../utils/positions";
import { revalidatePath } from "next/cache";
import { currentYear } from "@/lib/utils";

export async function createMember(data: {
  name: string;
  position: $Enums.Position;
  imageUrl: string;
  memberType?: $Enums.MemberType;
}) {
  try {
    const { memberType, position } = data;

    switch (memberType) {
      case $Enums.MemberType.COUNCIL:
        if (
          !councilPositions.includes(
            position as (typeof councilPositions)[number]
          )
        ) {
          throw new Error("Invalid position for council member");
        }
        break;
      case $Enums.MemberType.DIRECTOR:
      case $Enums.MemberType.COORDINATOR:
        if (
          !directorAndCoordinatorPositions.includes(
            position as (typeof directorAndCoordinatorPositions)[number]
          )
        ) {
          throw new Error("Invalid position for director or coordinator");
        }
        break;
      case $Enums.MemberType.MEMBER:
        if (position !== $Enums.Position.MEMBER) {
          throw new Error("Invalid position for member");
        }
        break;
      default:
        throw new Error("Invalid member type");
    }
    await prisma.member.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        roles: {
          create: {
            year: {
              connect: {
                year: currentYear,
              },
            },
            memberType: data.memberType ?? "MEMBER",
            position: data.position,
          },
        },
      },
    });

    revalidatePath("/members");
    return {
      success: true,
      message: "Member created successfully",
    };
  } catch (error) {
    console.error("Error creating member:", error);
    return {
      success: false,
      message: "Error creating member",
    };
  }
}

// edit member
export const updateMember = async ({
  data,
}: {
  data: {
    name: string;
    imageUrl: string;
    memberType: MemberType;
    position: Position;
    id: string;
  };
}) => {
  try {
    const { memberType, position } = data;

    switch (memberType) {
      case $Enums.MemberType.COUNCIL:
        if (
          !councilPositions.includes(
            position as (typeof councilPositions)[number]
          )
        ) {
          throw new Error("Invalid position for council member");
        }
        break;
      case $Enums.MemberType.DIRECTOR:
      case $Enums.MemberType.COORDINATOR:
        if (
          !directorAndCoordinatorPositions.includes(
            position as (typeof directorAndCoordinatorPositions)[number]
          )
        ) {
          throw new Error("Invalid position for director or coordinator");
        }
        break;
      case $Enums.MemberType.MEMBER:
        if (position !== $Enums.Position.MEMBER) {
          throw new Error("Invalid position for member");
        }
        break;
      default:
        throw new Error("Invalid member type");
    }

    const currentYearId = await prisma.year.findFirst({
      where: {
        year: currentYear,
      },
    });

    if (!currentYearId) {
      throw new Error("Current year not found");
    }

    await prisma.member.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        roles: {
          update: {
            where: {
              memberId_yearId: {
                memberId: data.id,
                yearId: currentYearId.id,
              },
            },
            data: {
              memberType: data.memberType,
              position: data.position,
            },
          },
        },
      },
    });

    revalidatePath("/members");
    return {
      success: true,
      message: "Member updated successfully",
    };
  } catch (error) {
    console.error("Error updating member:", error);
    return {
      success: false,
      message: "Error updating member",
    };
  }
};

// delete member
export const deleteMember = async (id: string) => {
  try {
    await prisma.member.delete({
      where: {
        id,
      },
    });

    revalidatePath("/members");
    return {
      success: true,
      message: "Member deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting member:", error);
    return {
      success: false,
      message: "Error deleting member",
    };
  }
};
