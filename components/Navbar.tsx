'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FileText, Home, User, Code, Briefcase, Mail, Award, Star } from 'lucide-react'

interface NavbarProps {
  settings: {
    heroName?: string
    resumeUrl?: string
  }
}

const navLinks = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#hackathons', label: 'Hackathons', icon: Award },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#skill-certs', label: 'Certifications', icon: Star },
  { href: '#skills', label: 'Skills', icon: Code },
  { href: '#contact', label: 'Contact', icon: Mail },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      const scrollPos = window.scrollY + 120
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveLink(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-xl bg-[#0A0F1C]/85 border-b border-white/5 shadow-2xl shadow-black/30'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              <span
                className="relative text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                {settings.heroName || 'Atul Jha'}
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 bg-[#0D1424]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-1.5">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                const isActive = activeLink === id
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(id)}
                    className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                    )}
                  </button>
                )
              })}
              {settings.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Resume
                </a>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#0D1424]/60 border border-white/10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-[#0D1424]/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    <link.icon className="w-4 h-4 text-purple-400" />
                    {link.label}
                  </button>
                )
              })}
              {settings.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium mt-2"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}