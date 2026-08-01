import { Card, CardContent } from '@/components/ui/card'

const colorMap = {
  blue:   { glow: 'shadow-blue-500/10',   icon: 'bg-blue-500/15 text-blue-400',   val: 'text-blue-400'   },
  green:  { glow: 'shadow-green-500/10',  icon: 'bg-green-500/15 text-green-400', val: 'text-green-400'  },
  purple: { glow: 'shadow-purple-500/10', icon: 'bg-purple-500/15 text-purple-400', val: 'text-purple-400'},
  orange: { glow: 'shadow-orange-500/10', icon: 'bg-orange-500/15 text-orange-400', val: 'text-orange-400'},
  red:    { glow: 'shadow-red-500/10',    icon: 'bg-red-500/15 text-red-400',     val: 'text-red-400'    },
}

export default function DashboardCard({ title, value, icon, color = 'blue', sub }) {
  const c = colorMap[color]
  return (
    <Card className={`border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg ${c.glow}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className={`text-3xl font-bold ${c.val}`}>{value}</p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
          <div className={`${c.icon} p-2.5 rounded-xl text-xl leading-none`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}