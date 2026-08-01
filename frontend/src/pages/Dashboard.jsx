import { useEffect, useState } from 'react'
import api from '../services/api'
import DashboardCard from '../components/DashboardCard'
import { PieChartWidget, BarChartWidget } from '../components/ChartComponent'
import { Loader2 } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-muted-foreground">
      <Loader2 className="animate-spin" size={20} />
      <span className="text-sm">Loading dashboard...</span>
    </div>
  )

  if (!stats) return (
    <div className="flex items-center justify-center h-64 text-destructive text-sm">
      Failed to load dashboard. Is the backend running?
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Topics"    value={stats.totalTopics}       icon="📚" color="blue"   sub="Learning tracker" />
        <DashboardCard title="Topics Done"     value={stats.completedTopics}   icon="✅" color="green"  sub="Completed" />
        <DashboardCard title="Problems Solved" value={stats.totalProblems}     icon="💻" color="purple" sub="DSA tracker" />
        <DashboardCard title="Jobs Applied"    value={stats.totalApplications} icon="💼" color="orange" sub="Applications" />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard title="Offers Received" value={stats.offerCount}     icon="🎉" color="green"  />
        <DashboardCard title="Interviews"      value={stats.interviewCount} icon="🗓️" color="blue"   />
        <DashboardCard title="Hard Problems"   value={stats.hardProblems}   icon="🔥" color="red"    />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PieChartWidget title="Learning Status" data={[
          { name: 'Completed',   value: stats.completedTopics   },
          { name: 'In Progress', value: stats.inProgressTopics  },
          { name: 'Not Started', value: stats.notStartedTopics  },
        ]} />
        <BarChartWidget title="DSA by Difficulty" xKey="name" yKey="count" data={[
          { name: 'Easy',   count: stats.easyProblems   },
          { name: 'Medium', count: stats.mediumProblems },
          { name: 'Hard',   count: stats.hardProblems   },
        ]} />
        <PieChartWidget title="Job Applications" data={[
          { name: 'Applied',   value: stats.appliedCount   },
          { name: 'Interview', value: stats.interviewCount },
          { name: 'Offer',     value: stats.offerCount     },
          { name: 'Rejected',  value: stats.rejectedCount  },
        ]} />
      </div>
    </div>
  )
}