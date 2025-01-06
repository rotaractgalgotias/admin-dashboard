'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'
import { useRef } from "react"
import { useRouter } from "next/navigation"

export function AddNewsletterDialog() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  async function handleSubmit(formData: FormData){
    // await addNewsletter(formData)
    console.log(formData)
    router.refresh()
    dialogRef.current?.close()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Newsletter</DialogTitle>
          <DialogDescription>
            Add a new newsletter to your collection.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea 
              id="content" 
              name="content" 
              required 
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create Newsletter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

