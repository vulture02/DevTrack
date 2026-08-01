import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { problemService } from '../services/problemService'
import ProblemForm from '../components/ProblemForm'
import ProblemTable from '../components/ProblemTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { DIFFICULTIES } from '../utils/constants'
import { Plus, X, Search } from 'lucide-react'

export default function DsaTrackerPage() {
  const { data: problems, loading, refetch } = useFetch(problemService.getAll)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (data) => { await problemService.create(data); refetch(); setShowForm(false) }
  const handleUpdate = async (id, data) => { await problemService.update(id, data); refetch() }
  const handleDelete = async (id) => { await problemService.delete(id); refetch() }

  const filtered = problems
    .filter(p => filter === 'All' || p.difficulty === filter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">DSA Problem Tracker</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {problems.length} solved · {problems.filter(p => p.revisionStatus).length} for revision
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          {showForm ? <><X size={14} /> Close</> : <><Plus size={14} /> Add Problem</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-foreground mb-4">New Problem</p>
            <ProblemForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          {['All', ...DIFFICULTIES].map(d => (
            <Button key={d} size="sm" variant={filter === d ? 'default' : 'outline'}
                    onClick={() => setFilter(d)} className="text-xs h-7 px-3">
              {d}
            </Button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-8 h-8 w-48 text-xs bg-secondary border-border" placeholder="Search problems..."
                 value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          {loading
            ? <p className="text-center text-muted-foreground py-12 text-sm">Loading...</p>
            : <ProblemTable problems={filtered} onUpdate={handleUpdate} onDelete={handleDelete} />}
        </CardContent>
      </Card>
    </div>
  )
}