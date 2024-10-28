'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Event {
  id: string
  title: string
  slug: string
  date: Date
  location: string
  numberOfVolunteers: number | null
  peopleImpacted: number | null
  duration: number | null
}

interface EventsTableProps {
  events: Event[]
}

export function EventsTable({ events: initialEvents }: EventsTableProps) {
  const [events, setEvents] = useState(initialEvents)
  const [sortColumn, setSortColumn] = useState<keyof Event>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const router = useRouter()

  const sortEvents = (column: keyof Event) => {
    const direction = column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc'
    const sorted = [...events].sort((a, b) => {
      if (a[column] == null) return 1
      if (b[column] == null) return -1
      if (a[column]! < b[column]!) return direction === 'asc' ? -1 : 1
      if (a[column]! > b[column]!) return direction === 'asc' ? 1 : -1
      return 0
    })
    setEvents(sorted)
    setSortColumn(column)
    setSortDirection(direction)
  }

  const deleteEvent = async (id: string) => {
    // TODO: Implement actual delete logic here
    setEvents(events.filter(event => event.id !== id))
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => sortEvents('title')}>
                Title
                {sortColumn === 'title' && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortEvents('date')}>
                Date
                {sortColumn === 'date' && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => sortEvents('numberOfVolunteers')}>
                Volunteers
                {sortColumn === 'numberOfVolunteers' && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => sortEvents('peopleImpacted')}>
                People Impacted
                {sortColumn === 'peopleImpacted' && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => sortEvents('duration')}>
                Duration (hours)
                {sortColumn === 'duration' && <ArrowUpDown className="ml-2 h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell className="text-right">{event.numberOfVolunteers ?? '-'}</TableCell>
              <TableCell className="text-right">{event.peopleImpacted ?? '-'}</TableCell>
              <TableCell className="text-right">{event.duration ?? '-'}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(event.id)}
                    >
                      Copy event ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/events/${event.slug}`)}>
                      View event
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/events/${event.slug}/edit`)}>
                      Edit event
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600"
                    >
                      Delete event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}