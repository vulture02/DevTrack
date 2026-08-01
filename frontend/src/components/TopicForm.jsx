import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TOPIC_STATUSES } from '../utils/constants'

const empty = { title: '', description: '', status: 'Not Started', targetDate: '', notes: '' }

export default function TopicForm({ onSubmit, initial = null, onCancel }) {
  const [form, setForm] = useState(initial || empty)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return alert('Title is required')
    onSubmit(form)
    if (!initial) setForm(empty)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1">
        <Label>Topic Title *</Label>
        <Input value={form.title} onChange={e => set('title', e.target.value)}
               placeholder="e.g., Spring Boot REST APIs" required />
      </div>
      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="What will you learn?" rows={2} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={val => set('status', val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TOPIC_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Target Date</Label>
          <Input type="date" value={form.targetDate} onChange={e => set('targetDate', e.target.value)} />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Notes / Resources</Label>
        <Textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Links, books, references..." rows={2} />
      </div>
      <div className="flex gap-2 pt-1">
        <Button type="submit">{initial ? 'Save Changes' : 'Add Topic'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}