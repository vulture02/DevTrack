import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { applicationService } from '../services/applicationService'
import ApplicationForm from '../components/ApplicationForm'
import ApplicationTable from '../components/ApplicationTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { APP_STATUSES } from '../utils/constants'
import { Plus, X } from 'lucide-react'

export default function JobTrackerPage() {
  const { data: apps, loading, refetch } = useFetch(applicationService.getAll)
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (data) => { await applicationService.create(data); refetch(); setShowForm(false) }
  const handleUpdate = async (id, data) => { await applicationService.update(id, data); refetch() }
  const handleDelete = async (id) => { await applicationService.delete(id); refetch() }

  const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Job Applications</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {apps.length} applied · {apps.filter(a => a.status === 'Offer').length} offers
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          {showForm ? <><X size={14} /> Close</> : <><Plus size={14} /> Add Application</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-foreground mb-4">New Application</p>
            <ApplicationForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 flex-wrap">
        {['All', ...APP_STATUSES].map(s => (
          <Button key={s} size="sm" variant={filter === s ? 'default' : 'outline'}
                  onClick={() => setFilter(s)} className="text-xs h-7 px-3">
            {s}
          </Button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          {loading
            ? <p className="text-center text-muted-foreground py-12 text-sm">Loading...</p>
            : <ApplicationTable applications={filtered} onUpdate={handleUpdate} onDelete={handleDelete} />}
        </CardContent>
      </Card>
    </div>
  )
}