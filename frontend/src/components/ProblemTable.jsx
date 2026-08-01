import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2, ExternalLink, BookmarkCheck } from 'lucide-react'
import ProblemForm from './ProblemForm'

const diffVariant = (d) => d === 'Easy' ? 'default' : d === 'Medium' ? 'secondary' : 'destructive'

export default function ProblemTable({ problems, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)

  if (!problems.length)
    return <p className="text-center text-slate-400 py-12">No problems added yet!</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Revision</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map(p => (
          <>
            <TableRow key={p.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {p.title}
                  {p.problemLink && (
                    <a href={p.problemLink} target="_blank" rel="noopener noreferrer"
                       className="text-blue-500 hover:text-blue-700">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>{p.platform}</TableCell>
              <TableCell>{p.topic}</TableCell>
              <TableCell><Badge variant={diffVariant(p.difficulty)}>{p.difficulty}</Badge></TableCell>
              <TableCell>
                {p.revisionStatus
                  ? <BookmarkCheck size={16} className="text-yellow-500" />
                  : <span className="text-slate-300">—</span>}
              </TableCell>
              <TableCell className="text-slate-500">{p.solvedDate || '—'}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost"
                          onClick={() => setEditing(editing === p.id ? null : p.id)}>
                    <Pencil size={15} />
                  </Button>
                  <Button size="icon" variant="ghost"
                          onClick={() => { if (confirm('Delete?')) onDelete(p.id) }}
                          className="text-red-500 hover:text-red-700">
                    <Trash2 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {editing === p.id && (
              <TableRow key={`edit-${p.id}`}>
                <TableCell colSpan={7} className="bg-slate-50 p-4">
                  <ProblemForm initial={p}
                               onSubmit={(data) => { onUpdate(p.id, data); setEditing(null) }}
                               onCancel={() => setEditing(null)} />
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  )
}