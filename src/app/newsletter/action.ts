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

export async function deleteNewsletter(id: string) {
  try {
    if(!id) throw new Error("id is required")

    const newsletter = await prisma.newsletter.delete({
      where: { id }
    })

    return {
      success: true,
      message: "Newsletter deleted successfully",
      data: newsletter
    }
    
  } catch (error) {
    console.error(error)
    return { success: false, message: (error as Error).message ?? "An error occurred while deleting the newsletter" }
    
  } finally {
    revalidatePath("/newsletter")
    revalidatePath("/")
  }
}

export async function editNewsletter({
  title,
  totalPages,
  month,
  id
}: Newsletter & { id: string }) {
  try {
    if(!title || !totalPages || !month || !id) throw new Error("Please fill all fields")

    const newsletter = await prisma.newsletter.update({
      where: { id },
      data: {
        title,
        totalPages,
        month
      }
    })

    return {
      success: true,
      message: "Newsletter updated successfully",
      data: newsletter
    }
    
  } catch (error) {
    console.error(error)
    return { success: false, message: (error as Error).message ?? "An error occurred while updating the newsletter" }
    
  } finally {
    revalidatePath("/newsletter")
    revalidatePath("/")
  }
}