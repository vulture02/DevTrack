import { useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',        sub: 'Overview of your progress'    },
  '/learning':  { title: 'Learning Tracker', sub: 'Manage your study topics'     },
  '/dsa':       { title: 'DSA Tracker',      sub: 'Track coding problems solved' },
  '/jobs':      { title: 'Job Applications', sub: 'Monitor your job hunt'        },
}

export default function Navbar() {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] || { title: 'DevTrack', sub: '' }

  return (
    <header className="bg-card border-b border-border px-6 py-3.5 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-foreground">{page.title}</h1>
        <p className="text-xs text-muted-foreground">{page.sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell size={18} />
        </Button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">D</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground leading-none">Developer</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}