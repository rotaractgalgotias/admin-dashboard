"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import axios from "axios";

export const editEvent = async (
  id: string,
  event: {
    title: string;
    content: string;
    description: string;
    date: Date;
    location: string;
    numberOfVolunteers?: number | null;
    peopleImpacted?: number | null;
    duration?: number | null;
    coverImage: string | null;
  }
) => {
  try {
    let slug = slugify(event.title, { lower: true, strict: true });

    slug = slug.replace(/^:-/, "");

    const coverImage = event.coverImage ?? "";

    const mdxContent = await axios.post(
      "https://www.text2mdx.com/api/convert",
      {
        text: event.content,
      }
    );

    await prisma.event.update({
      where: { id },
      data: {
        slug,
        title: event.title,
        content: mdxContent.data.mdxContent,
        description: event.description,
        date: event.date,
        location: event.location,
        numberOfVolunteers: event.numberOfVolunteers,
        peopleImpacted: event.peopleImpacted,
        duration: event.duration,
        coverImage,
      },
    });

    revalidatePath("/events"); // Revalidate the events page after editing an event
    revalidatePath("/");

    return {
      success: true,
      message: "Event updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        (error as Error).message ??
        "An error occurred while updating the event",
    };
  }
};
