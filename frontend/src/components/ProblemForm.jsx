import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DIFFICULTIES, PLATFORMS, DSA_TOPICS } from '../utils/constants'

const empty = { title: '', platform: 'LeetCode', topic: 'Arrays',
                difficulty: 'Easy', problemLink: '', revisionStatus: false, solvedDate: '' }

export default function ProblemForm({ onSubmit, initial = null, onCancel }) {
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
        <Label>Problem Title *</Label>
        <Input value={form.title} onChange={e => set('title', e.target.value)}
               placeholder="e.g., Two Sum" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Platform</Label>
          <Select value={form.platform} onValueChange={val => set('platform', val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Topic</Label>
          <Select value={form.topic} onValueChange={val => set('topic', val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {DSA_TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Difficulty</Label>
          <Select value={form.difficulty} onValueChange={val => set('difficulty', val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Date Solved</Label>
          <Input type="date" value={form.solvedDate} onChange={e => set('solvedDate', e.target.value)} />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Problem Link</Label>
        <Input value={form.problemLink} onChange={e => set('problemLink', e.target.value)}
               placeholder="https://leetcode.com/problems/..." />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="revision" checked={form.revisionStatus}
               onChange={e => set('revisionStatus', e.target.checked)}
               className="w-4 h-4 accent-blue-600" />
        <Label htmlFor="revision">Mark for Revision</Label>
      </div>
      <div className="flex gap-2 pt-1">
        <Button type="submit">{initial ? 'Save Changes' : 'Add Problem'}</Button>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}