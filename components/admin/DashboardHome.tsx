'use client'

import Link from 'next/link'
import { Trophy, Briefcase, Award, Code2, ArrowRight, Sparkles } from 'lucide-react'

interface Props {
  stats: {
    projects: number
    hackathons: number
    skillCerts: number
    skills: number
  }
}

export default function DashboardHome({ stats }: Props) {
  const cards = [
    {
      label: 'Hackathon Certificates',
      value: stats.hackathons,
      icon: Trophy,
      href: '/admin/hackathons',
      gradient: 'from-yellow-500 to-orange-500',
      bg: 'from-yellow-500/10 to-orange-500/10',
    },
    {
      label: 'Projects',
      value: stats.projects,
      icon: Briefcase,
      href: '/admin/projects',
      gradient: 'from-blue-500 to-purple-500',
      bg: 'from-blue-500/10 to-purple-500/10',
    },
    {
      label: 'Skill Certificates',
      value: stats.skillCerts,
      icon: Award,
      href: '/admin/skill-certificates',
      gradient: 'from-green-500 to-teal-500',
      bg: 'from-green-500/10 to-teal-500/10',
    },
    {
      label: 'Skills Learned',
      value: stats.skills,
      icon: Code2,
      href: '/admin/skills',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'from-purple-500/10 to-pink-500/10',
    },
  ]

  const quickLinks = [
    { label: 'Add Hackathon Certificate', href: '/admin/hackathons/new', icon: Trophy },
    { label: 'Add Project', href: '/admin/projects/new', icon: Briefcase },
    { label: 'Add Skill Certificate', href: '/admin/skill-certificates/new', icon: Award },
    { label: 'Add Skill', href: '/admin/skills/new', icon: Code2 },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
        <p className="text-slate-400 text-sm">Manage your portfolio content from here</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-5 hover:border-transparent transition-all duration-300"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${card.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center mb-3`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl font-black text-white mb-1">{card.value}</div>
              <div className="text-xs text-slate-400 font-medium">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-purple-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
            >
              <link.icon className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400 ml-auto transition-all group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info card */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> Changes you make here are reflected on your public portfolio
          immediately. Add new certificates, projects, or skills using the forms in each section.
        </p>
      </div>
    </div>
  )
}
