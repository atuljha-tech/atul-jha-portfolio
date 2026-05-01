'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Twitter, Mail, Heart, ChevronUp } from 'lucide-react'

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
  const [year, setYear] = useState(2025)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const socials = [
    settings.githubUrl && { icon: Github, href: settings.githubUrl, label: 'GitHub' },
    settings.linkedinUrl && { icon: Linkedin, href: settings.linkedinUrl, label: 'LinkedIn' },
    settings.twitterUrl && { icon: Twitter, href: settings.twitterUrl, label: 'Twitter' },
    settings.email && { icon: Mail, href: `mailto:${settings.email}`, label: 'Email' },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0F1C] to-[#05080F] py-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <span
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6"
            style={{ fontFamily: 'var(--font-dancing), cursive' }}
          >
            {settings.heroName || 'Atul Jha'}
          </span>

          <div className="flex items-center gap-3 mb-8">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0D1424] border border-slate-800 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between w-full pt-6 border-t border-slate-800/50">
            <p className="text-xs text-slate-600 font-mono">© {year} {settings.heroName || 'Atul Jha'}</p>
            <p className="text-xs text-slate-600 font-mono flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-pink-500 animate-pulse" /> in India
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full bg-[#0D1424] border border-slate-800 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110"
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
