'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  settings: { heroName?: string; resumeUrl?: string }
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skill-certs', label: 'Certs' },
  { href: '#skills', label: 'Skills' },
  { href: '#stats', label: 'Stats' },
  { href: '#hackathons', label: 'Hackathons' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const pos = window.scrollY + 140
      for (const link of navLinks) {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id)
          break
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#07050E]/85 backdrop-blur-2xl border-b border-purple-900/30 shadow-2xl shadow-purple-950/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Stylish Cursive AJ Logo */}
        <button onClick={() => scrollTo('home')} className="group flex items-center gap-1 cursor-pointer">
          <span className="font-cursive text-3xl sm:text-4xl text-gold-gradient font-bold tracking-tight hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            aj
          </span>
        </button>

        {/* Desktop Navigation Bar - Clean, Premium Pill without icons */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0E0B19]/80 backdrop-blur-2xl rounded-full border border-purple-500/20 p-1.5 shadow-xl shadow-purple-950/30">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/15 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Action / Resume Button - Sleek Gradient Outline Pill */}
        <div className="hidden lg:flex items-center gap-3">
          {settings.resumeUrl ? (
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-[1px] rounded-full bg-linear-to-r from-amber-400 via-purple-500 to-indigo-500 group shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="px-5 py-2 rounded-full bg-[#0E0B19] group-hover:bg-transparent text-white text-xs font-medium tracking-wide transition-all duration-300">
                Resume
              </div>
            </a>
          ) : (
            <button
              onClick={() => scrollTo('contact')}
              className="relative p-[1px] rounded-full bg-linear-to-r from-amber-400 via-purple-500 to-indigo-500 group shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="px-5 py-2 rounded-full bg-[#0E0B19] group-hover:bg-transparent text-white text-xs font-medium tracking-wide transition-all duration-300">
                Get in Touch
              </div>
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-[#0E0B19] border border-purple-500/30 flex items-center justify-center text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-3 bg-[#0E0B19]/95 backdrop-blur-2xl rounded-3xl border border-purple-500/30 p-4 shadow-2xl shadow-black">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = active === id
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-medium tracking-wide transition-all ${
                    isActive ? 'bg-white/10 text-amber-400 border border-purple-500/30 font-semibold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </button>
              )
            })}
            {settings.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-purple-600 text-white text-xs font-medium tracking-wide mt-3 shadow-lg"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
