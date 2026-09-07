'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

interface FooterProps {
  settings: {
    heroName?: string
    githubUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
    email?: string
  }
}

export default function Footer({ settings }: FooterProps) {
  const [year, setYear] = useState(2026)
  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const name = settings.heroName || 'Atul Jha'

  const socials = [
    settings.githubUrl && { href: settings.githubUrl, label: 'GitHub' },
    settings.linkedinUrl && { href: settings.linkedinUrl, label: 'LinkedIn' },
    settings.twitterUrl && { href: settings.twitterUrl, label: 'Twitter' },
    settings.email && { href: `mailto:${settings.email}`, label: 'Email' },
  ].filter(Boolean) as { href: string; label: string }[]

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#stats', label: 'Stats' },
    { href: '#contact', label: 'Contact' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#07050E] border-t border-purple-500/15 py-12 px-6 overflow-hidden">
      {/* Top Gradient Accent Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-purple-500/10">

          {/* Left Column: Brand & Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-cursive text-3xl text-gold-gradient font-bold tracking-tight">
                aj
              </span>
              <span className="text-white text-base font-semibold tracking-wide ml-1">
                {name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for engineering & software roles</span>
            </div>
          </div>

          {/* Center Column: Quick Nav Links */}
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Column: Sleek Social Text Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            {socials.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© {year} {name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Based in India</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-full bg-[#0E0B19] border border-purple-500/20 text-slate-300 hover:text-white hover:border-amber-400/40 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
