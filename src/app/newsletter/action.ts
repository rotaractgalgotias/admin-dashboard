'use server'

type Newsletter = {
  id: string
  title: string
  content: string
  createdAt: Date
  status: 'draft' | 'published'
}

// This is a mock database - replace with your actual database
const newsletters: Newsletter[] = []

export async function addNewsletter(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  const newsletter = {
    id: Math.random().toString(36).substring(7),
    title,
    content,
    createdAt: new Date(),
    status: 'draft' as const
  }
  
  newsletters.push(newsletter)
  return { success: true }
}

export async function getNewsletters() {
  return newsletters
}

