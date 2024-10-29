import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const slug = params.slug;
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
    });
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the event",
      },
      {
        status: 500,
      }
    );
  }
}
