import React from "react";
import { EditEventForm } from "./_components/EditEventForm";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

export default async function page({ params }: { params: Params }) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
  });

  return (
    <div>
      <EditEventForm event={event} />
    </div>
  );
}
