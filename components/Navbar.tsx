'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FileText, Home, User, Code, Briefcase, Mail, Star, BarChart2, Sparkles } from 'lucide-react'

interface NavbarProps {
  settings: { heroName?: string; resumeUrl?: string }
}

const navLinks = [
  { href: '#home',       label: 'HOME',         icon: Home      },
  { href: '#about',      label: 'ABOUT',        icon: User      },
  { href: '#projects',   label: 'PROJECTS',     icon: Briefcase },
  { href: '#skill-certs',label: 'CERTS',        icon: Star      },
  { href: '#skills',     label: 'SKILLS',       icon: Code      },
  { href: '#stats',      label: 'STATS',        icon: BarChart2 },
  { href: '#hackathons', label: 'HACKATHONS',   icon: Sparkles  },
  { href: '#contact',    label: 'CONTACT',      icon: Mail      },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const pos = window.scrollY + 140
      for (const link of navLinks) {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3.5 bg-[#07050E]/85 backdrop-blur-2xl border-b border-purple-900/30 shadow-2xl shadow-purple-950/40'
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Mark */}
        <button onClick={() => scrollTo('home')} className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#07050E] rounded-[7px] flex items-center justify-center">
              <span className="text-amber-400 text-xs font-black tracking-tighter">AJ</span>
            </div>
          </div>
          <span className="text-lg font-black tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
            {settings.heroName?.toUpperCase() || 'ATUL JHA'}
            <span className="text-amber-400">.</span>
          </span>
        </button>

        {/* Desktop Navigation Bar */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0E0B19]/80 backdrop-blur-2xl rounded-full border border-purple-500/20 p-1.5 shadow-xl shadow-purple-950/30">
          {navLinks.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 rounded-full text-[11px] font-mono tracking-wider font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-purple-600/30 border border-purple-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className={`w-3 h-3 ${isActive ? 'text-amber-400' : 'text-purple-400'}`} />
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Action / Resume Button */}
        <div className="hidden lg:flex items-center gap-3">
          {settings.resumeUrl ? (
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-amber-500 via-purple-600 to-purple-800 text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-purple-900/40 hover:shadow-amber-500/20 hover:scale-105 transition-all duration-300 border border-amber-400/30"
            >
              <FileText className="w-3.5 h-3.5" />
              RESUME
            </a>
          ) : (
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-amber-500 via-purple-600 to-purple-800 text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-purple-900/40 hover:shadow-amber-500/20 hover:scale-105 transition-all duration-300 border border-amber-400/30"
            >
              <Mail className="w-3.5 h-3.5" />
              GET IN TOUCH
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-[#0E0B19] border border-purple-500/30 flex items-center justify-center text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-3 bg-[#0E0B19]/95 backdrop-blur-2xl rounded-3xl border border-purple-500/30 p-4 shadow-2xl shadow-black">
          <div className="space-y-1">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const isActive = active === id
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-mono tracking-wider transition-all ${
                    isActive ? 'bg-purple-600/30 text-amber-400 border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <link.icon className="w-4 h-4 text-purple-400" />
                    {link.label}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              )
            })}
            {settings.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-purple-600 text-white text-xs font-mono font-bold uppercase tracking-wider mt-3 shadow-lg"
              >
                <FileText className="w-4 h-4" />
                RESUME
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
