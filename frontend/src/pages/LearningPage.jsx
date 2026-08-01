import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { topicService } from '../services/topicService'
import TopicForm from '../components/TopicForm'
import TopicTable from '../components/TopicTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TOPIC_STATUSES } from '../utils/constants'
import { Plus, X } from 'lucide-react'

export default function LearningPage() {
  const { data: topics, loading, refetch } = useFetch(topicService.getAll)
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (data) => { await topicService.create(data); refetch(); setShowForm(false) }
  const handleUpdate = async (id, data) => { await topicService.update(id, data); refetch() }
  const handleDelete = async (id) => { await topicService.delete(id); refetch() }

  const filtered = filter === 'All' ? topics : topics.filter(t => t.status === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Learning Topics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {topics.length} total · {topics.filter(t => t.status === 'Completed').length} completed
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          {showForm ? <><X size={14} /> Close</> : <><Plus size={14} /> Add Topic</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-foreground mb-4">New Learning Topic</p>
            <TopicForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        {['All', ...TOPIC_STATUSES].map(s => (
          <Button key={s} size="sm" variant={filter === s ? 'default' : 'outline'} onClick={() => setFilter(s)}
                  className="text-xs h-7 px-3">
            {s}
          </Button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          {loading
            ? <p className="text-center text-muted-foreground py-12 text-sm">Loading...</p>
            : <TopicTable topics={filtered} onUpdate={handleUpdate} onDelete={handleDelete} />}
        </CardContent>
      </Card>
    </div>
  )
}