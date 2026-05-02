'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'

interface FooterProps {
  settings: { heroName?: string; githubUrl?: string; linkedinUrl?: string; twitterUrl?: string; email?: string }
}

export default function Footer({ settings }: FooterProps) {
  const [year, setYear] = useState(2025)
  useEffect(() => { setYear(new Date().getFullYear()) }, [])

  const socials = [
    settings.githubUrl   && { icon: Github,  href: settings.githubUrl,          label: 'GitHub'   },
    settings.linkedinUrl && { icon: Linkedin, href: settings.linkedinUrl,        label: 'LinkedIn' },
    settings.twitterUrl  && { icon: Twitter,  href: settings.twitterUrl,         label: 'Twitter'  },
    settings.email       && { icon: Mail,     href: `mailto:${settings.email}`,  label: 'Email'    },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  return (
    <footer className="relative bg-[#060A14] border-t border-white/5 py-10 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <span
            className="text-xl font-bold bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text"
            style={{ fontFamily: 'var(--font-dancing), cursive' }}
          >
            {settings.heroName || 'Atul Jha'}
          </span>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-600 flex items-center gap-1">
              © {year} {settings.heroName || 'Atul Jha'} · Made with <Heart className="w-3 h-3 text-pink-500 animate-pulse" /> in India
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/40 transition-all duration-200 hover:-translate-y-0.5"
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
