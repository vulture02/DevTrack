import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import ApplicationForm from './ApplicationForm'

const statusVariant = (s) => {
  if (s === 'Offer') return 'default'
  if (s === 'Rejected') return 'destructive'
  if (s === 'Interview') return 'secondary'
  return 'outline'
}

export default function ApplicationTable({ applications, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)

  if (!applications.length)
    return <p className="text-center text-slate-400 py-12">No applications yet. Start applying!</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Interview</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map(app => (
          <>
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.role || '—'}</TableCell>
              <TableCell><Badge variant={statusVariant(app.status)}>{app.status}</Badge></TableCell>
              <TableCell className="text-slate-500">{app.appliedDate || '—'}</TableCell>
              <TableCell className="text-slate-500">{app.interviewDate || '—'}</TableCell>
              <TableCell className="text-slate-500 max-w-xs truncate">{app.notes || '—'}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost"
                          onClick={() => setEditing(editing === app.id ? null : app.id)}>
                    <Pencil size={15} />
                  </Button>
                  <Button size="icon" variant="ghost"
                          onClick={() => { if (confirm('Delete?')) onDelete(app.id) }}
                          className="text-red-500 hover:text-red-700">
                    <Trash2 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {editing === app.id && (
              <TableRow key={`edit-${app.id}`}>
                <TableCell colSpan={7} className="bg-slate-50 p-4">
                  <ApplicationForm initial={app}
                                   onSubmit={(data) => { onUpdate(app.id, data); setEditing(null) }}
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