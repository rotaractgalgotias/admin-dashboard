"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import axios from "axios";
import { currentYear } from "@/lib/utils";

export const createEvent = async (event: {
  title: string;
  content: string;
  description: string;
  date: Date;
  location: string;
  numberOfVolunteers?: number | null;
  peopleImpacted?: number | null;
  duration?: number | null;
  coverImage: string | null;
  featured: boolean;
}) => {
  try {
    let slug = slugify(event.title, { lower: true, strict: true });

    slug = slug.replace(/^:-/, "");

    const existingEvent = await prisma.event.findUnique({
      where: { slug },
    });

    if (existingEvent) {
      const uniqueSuffix = Date.now().toString();
      slug = `${slug}-${uniqueSuffix}`;
    }

    const coverImage = event.coverImage ?? "";

    const mdxContent = await axios.post(
      "https://www.text2mdx.com/api/convert",
      {
        text: event.content,
      }
    );

    await prisma.event.create({
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
        featured: event.featured,
        year: {
          connect: {
            year: currentYear,
          },
        },
      },
    });

    revalidatePath("/events"); // Revalidate the events page after creating an event
    revalidatePath("/");

    return {
      success: true,
      message: "Event created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        (error as Error).message ??
        "An error occurred while creating the event",
    };
  }
};
