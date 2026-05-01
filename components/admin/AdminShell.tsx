'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Trophy,
  Briefcase,
  Award,
  Code2,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { JWTPayload } from '@/lib/auth'

interface AdminShellProps {
  children: React.ReactNode
  user: JWTPayload
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/hackathons', label: 'Hackathon Certs', icon: Trophy },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/skill-certificates', label: 'Skill Certs', icon: Award },
  { href: '/admin/skills', label: 'Skills Learned', icon: Code2 },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

export default function AdminShell({ children, user }: AdminShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Logged out')
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Portfolio CMS</p>
            <p className="text-slate-500 text-xs truncate max-w-[140px]">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${active ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-purple-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink className="w-4 h-4 text-slate-500" />
          View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 admin-sidebar flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 admin-sidebar flex flex-col z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0D1424]/50 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 text-slate-400" />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-slate-400">
              Welcome back, <span className="text-white font-medium">{user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-500 font-mono">LIVE</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
