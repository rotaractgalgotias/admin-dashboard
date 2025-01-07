'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import slugify from "slugify"

type Newsletter = {
  totalPages: number
  title: string
  month: string
  
}

export async function addNewsletter({
  title,
  totalPages,
  month,
}: Newsletter) {
  try {
    if(!title || !totalPages || !month) throw new Error("Please fill all fields")

    const slug = slugify(title, { lower: true, strict: true })

    const newsletterExists = await prisma.newsletter.findFirst({
      where: { slug }
    })

    if(newsletterExists) throw new Error("Newsletter already exists")

    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        totalPages,
        month,
        slug
      }
    })

    return {
      success: true,
      message: "Newsletter added successfully",
      data: newsletter
    }

    
  } catch (error) {
    console.error(error)
    return { success: false, message: (error as Error).message ?? "An error occurred while adding the newsletter" }
    
  } finally {
    revalidatePath("/newsletter")
    revalidatePath("/")
  }

}


