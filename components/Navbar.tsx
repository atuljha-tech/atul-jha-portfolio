'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FileText, Home, User, Code, Briefcase, Mail, Award, Star, BarChart2 } from 'lucide-react'

interface NavbarProps {
  settings: { heroName?: string; resumeUrl?: string }
}

const navLinks = [
  { href: '#home',       label: 'Home',         icon: Home      },
  { href: '#about',      label: 'About',        icon: User      },
  { href: '#projects',   label: 'Projects',     icon: Briefcase },
  { href: '#skill-certs',label: 'Certs',        icon: Star      },
  { href: '#skills',     label: 'Skills',       icon: Code      },
  { href: '#stats',      label: 'Stats',        icon: BarChart2 },
  { href: '#hackathons', label: 'Hackathons',   icon: Award     },
  { href: '#contact',    label: 'Contact',      icon: Mail      },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const pos = window.scrollY + 130
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
        ? 'py-3 bg-[#080C18]/80 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/20'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="group">
          <span
            className="text-xl font-bold bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text animate-gradient"
            style={{ fontFamily: 'var(--font-dancing), cursive' }}
          >
            {settings.heroName || 'Atul Jha'}
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5 bg-white/3 backdrop-blur-xl rounded-2xl border border-white/6 p-1.5">
          {navLinks.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-3 h-3" />
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                )}
              </button>
            )
          })}

          {settings.resumeUrl && (
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <FileText className="w-3 h-3" />
              Resume
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-3 right-3 mt-2 bg-[#0D1424]/98 backdrop-blur-2xl rounded-2xl border border-white/8 p-3 shadow-2xl">
          <div className="space-y-0.5">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <link.icon className="w-4 h-4 text-violet-400" />
                  {link.label}
                </button>
              )
            })}
            {settings.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold mt-2"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
