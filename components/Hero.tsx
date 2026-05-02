'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Github, Linkedin, Mail, Twitter, ArrowDown, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface HeroProps {
  settings: {
    heroName?: string
    heroTitle?: string
    heroSubtitle?: string
    heroDescription?: string
    aboutImage?: string
    githubUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
    email?: string
    resumeUrl?: string
  }
}

const ROLES = ['Full Stack Developer', 'Blockchain Enthusiast', 'CS Student', 'Open Source Contributor']

export default function Hero({ settings }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const name = settings.heroName || 'Atul Jha'
  const subtitle = settings.heroSubtitle || 'Aspiring Full-Stack Developer'
  const description = settings.heroDescription ||
    "CS student building real-world products with React, Next.js, Blockchain & MongoDB. Turning ideas into scalable, production-ready applications."

  const socials = [
    settings.githubUrl    && { icon: Github,   href: settings.githubUrl,              label: 'GitHub'   },
    settings.linkedinUrl  && { icon: Linkedin,  href: settings.linkedinUrl,            label: 'LinkedIn' },
    settings.email        && { icon: Mail,      href: `mailto:${settings.email}`,      label: 'Email'    },
    settings.twitterUrl   && { icon: Twitter,   href: settings.twitterUrl,             label: 'Twitter'  },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080C18]"
    >
      {/* ── Parallax background ── */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <div className="glow-orb w-[600px] h-[600px] bg-violet-600/15 top-[-10%] left-[-10%]" />
        <div className="glow-orb w-[500px] h-[500px] bg-blue-600/12 bottom-[-5%] right-[-5%]" />
        <div className="glow-orb w-[300px] h-[300px] bg-pink-600/10 top-[40%] left-[50%]" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />

        {/* Horizontal lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.5) 80px)', backgroundSize: '100% 80px' }}
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-medium text-violet-300 tracking-wide">Passionate CS Student</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-slate-500 text-base mb-2 font-medium tracking-wide">Hi, I'm</p>
              <h1
                className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6 tracking-tight"
                style={{ fontFamily: 'var(--font-heading), sans-serif' }}
              >
                <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                  {name}
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-linear-to-r from-violet-500 to-pink-500 rounded-full" />
              <span className="text-xl text-slate-300 font-medium">{subtitle}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="w-[2px] h-6 bg-violet-400 rounded-full"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10"
            >
              {description}
            </motion.p>

            {/* CTA + Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-7 py-3.5 rounded-2xl overflow-hidden font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-violet-500 to-pink-500" />
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">View My Work →</span>
              </button>

              {/* Resume */}
              {settings.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-2xl border border-slate-700 text-slate-300 text-sm font-semibold hover:border-violet-500/50 hover:text-white hover:bg-violet-500/8 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Resume
                </a>
              )}

              {/* Divider */}
              <div className="w-px h-8 bg-slate-800" />

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 bg-linear-to-r from-blue-500/20 via-violet-500/20 to-pink-500/20 rounded-[2.5rem] blur-2xl" />

              {/* Card */}
              <div className="relative w-80 h-80 rounded-[2rem] overflow-hidden border border-white/8 shadow-2xl shadow-violet-500/10">
                <Image
                  src={settings.aboutImage || '/atuljha.jpeg'}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                  sizes="320px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#080C18]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3.5 py-2 glass-card shadow-xl"
              >
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Available for work
                </span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 px-3.5 py-2 glass-card shadow-xl"
              >
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  🚀 <span className="bg-linear-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">Building cool stuff</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-slate-600 tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-slate-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
