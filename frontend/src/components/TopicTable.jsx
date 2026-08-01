import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import TopicForm from './TopicForm'

const badgeVariant = (status) => {
  if (status === 'Completed') return 'default'
  if (status === 'In Progress') return 'secondary'
  return 'outline'
}

export default function TopicTable({ topics, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)

  if (!topics.length)
    return <p className="text-center text-slate-400 py-12">No topics yet. Add one above!</p>

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target Date</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map(topic => (
            <>
              <TableRow key={topic.id}>
                <TableCell className="font-medium">{topic.title}</TableCell>
                <TableCell>
                  <Badge variant={badgeVariant(topic.status)}>{topic.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-500">{topic.targetDate || '—'}</TableCell>
                <TableCell className="text-slate-500 max-w-xs truncate">{topic.notes || '—'}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost"
                            onClick={() => setEditing(editing === topic.id ? null : topic.id)}>
                      <Pencil size={15} />
                    </Button>
                    <Button size="icon" variant="ghost"
                            onClick={() => { if (confirm('Delete?')) onDelete(topic.id) }}
                            className="text-red-500 hover:text-red-700">
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {editing === topic.id && (
                <TableRow key={`edit-${topic.id}`}>
                  <TableCell colSpan={5} className="bg-slate-50 p-4">
                    <TopicForm initial={topic}
                               onSubmit={(data) => { onUpdate(topic.id, data); setEditing(null) }}
                               onCancel={() => setEditing(null)} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}