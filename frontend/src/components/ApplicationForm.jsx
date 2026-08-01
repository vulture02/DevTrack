import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { APP_STATUSES } from '../utils/constants'

const empty = { company: '', role: '', status: 'Applied', appliedDate: '', interviewDate: '', notes: '' }

export default function ApplicationForm({ onSubmit, initial = null, onCancel }) {
  const [form, setForm] = useState(initial || empty)
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.company.trim()) return alert('Company is required')
    onSubmit(form)
    if (!initial) setForm(empty)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Company *</Label>
          <Input value={form.company} onChange={e => set('company', e.target.value)}
                 placeholder="e.g., Google" required />
        </div>
        <div className="space-y-1">
          <Label>Role</Label>
          <Input value={form.role} onChange={e => set('role', e.target.value)}
                 placeholder="e.g., Software Engineer" />
        </div>
        <div className="space-y-1">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={val => set('status', val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {APP_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Applied Date</Label>
          <Input type="date" value={form.appliedDate} onChange={e => set('appliedDate', e.target.value)} />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Interview Date</Label>
          <Input type="date" value={form.interviewDate} onChange={e => set('interviewDate', e.target.value)} />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Notes</Label>
          <Textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                    placeholder="Round details, contacts..." rows={2} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button type="submit">{initial ? 'Save Changes' : 'Add Application'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}