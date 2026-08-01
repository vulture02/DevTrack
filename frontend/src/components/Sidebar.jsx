import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Code2, Briefcase, Zap } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/learning',  icon: BookOpen,         label: 'Learning'  },
  { to: '/dsa',       icon: Code2,            label: 'DSA'       },
  { to: '/jobs',      icon: Briefcase,        label: 'Jobs'      },
]

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap size={18} className="text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <p className="font-bold text-foreground tracking-tight">DevTrack</p>
            <p className="text-xs text-muted-foreground">Progress Tracker</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
          Navigation
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
               ${isActive
                 ? 'bg-primary/15 text-primary border border-primary/20 shadow-sm'
                 : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
               }`
            }>
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-primary' : ''} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-secondary/50 p-3 text-center">
          <p className="text-xs text-muted-foreground">Placement Ready</p>
          <p className="text-xs font-semibold text-primary mt-0.5">v1.0.0</p>
        </div>
      </div>
    </aside>
  )
}