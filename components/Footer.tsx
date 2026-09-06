'use client'

import { useState, useEffect } from 'react'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'

interface FooterProps {
  settings: { heroName?: string; githubUrl?: string; linkedinUrl?: string; twitterUrl?: string; email?: string }
}

export default function Footer({ settings }: FooterProps) {
  const [year, setYear] = useState(2026)
  useEffect(() => { setYear(new Date().getFullYear()) }, [])

  const socials = [
    settings.githubUrl   && { icon: Github,  href: settings.githubUrl,          label: 'GitHub'   },
    settings.linkedinUrl && { icon: Linkedin, href: settings.linkedinUrl,        label: 'LinkedIn' },
    settings.twitterUrl  && { icon: Twitter,  href: settings.twitterUrl,         label: 'Twitter'  },
    settings.email       && { icon: Mail,     href: `mailto:${settings.email}`,  label: 'Email'    },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  return (
    <footer className="relative bg-[#07050E] border-t border-purple-500/20 py-12 overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand Mark */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-purple-600 to-amber-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#07050E] rounded-[6px] flex items-center justify-center">
                <span className="text-amber-400 text-[10px] font-black tracking-tighter">AJ</span>
              </div>
            </div>
            <span className="text-base font-black tracking-wider text-white uppercase">
              {settings.heroName?.toUpperCase() || 'ATUL JHA'}
              <span className="text-amber-400">.</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-[#0E0B19] border border-purple-500/25 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright & Scroll to Top */}
          <div className="flex items-center gap-4">
            <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 uppercase">
              © {year} {settings.heroName?.toUpperCase() || 'ATUL JHA'} · BUILT WITH <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" /> IN INDIA
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full bg-[#0E0B19] border border-purple-500/30 flex items-center justify-center text-amber-400 hover:border-amber-400 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
