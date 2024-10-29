import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: events,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: true,
        message: "An error occurred while fetching events",
      },
      {
        status: 500,
      }
    );
  }
}
