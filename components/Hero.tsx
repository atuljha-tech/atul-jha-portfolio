'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Code2, Cpu, Database, Rocket, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import ResumeViewer from '@/components/ResumeViewer'

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
    hasResume?: boolean
    resumeFileName?: string
  }
}

export default function Hero({ settings }: HeroProps) {
  const name = settings.heroName || 'ATUL JHA'
  const title = settings.heroSubtitle?.toUpperCase() || 'FULL-STACK DEVELOPER & CS STUDENT'
  const description =
    settings.heroDescription ||
    "Specializing in modern web systems, decentralized architectures, and high-performance applications. Combining technical rigor with intentional user experience."

  const socialLinks = [
    settings.githubUrl   && { icon: Github,   href: settings.githubUrl,             label: 'GitHub'   },
    settings.linkedinUrl && { icon: Linkedin,  href: settings.linkedinUrl,           label: 'LinkedIn' },
    settings.email       && { icon: Mail,      href: `mailto:${settings.email}`,     label: 'Email'    },
    settings.twitterUrl  && { icon: Twitter,   href: settings.twitterUrl,            label: 'Twitter'  },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  const stack = [
    { icon: Code2,    label: 'REACT & NEXT.JS' },
    { icon: Cpu,      label: 'BLOCKCHAIN'     },
    { icon: Database, label: 'MONGODB'        },
    { icon: Rocket,   label: 'IOT & SYSTEMS'  },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden bg-[#07050E]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow-purple w-[600px] h-[600px] -top-20 -left-20 animate-pulse" />
        <div className="bg-glow-gold w-[550px] h-[550px] top-1/3 -right-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-950/15 rounded-full blur-3xl" />
        
        {/* Sleek dark angled cutout background shape */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[45%] bg-[#0B0816] pointer-events-none border-t border-purple-500/15"
          style={{ clipPath: 'polygon(0 35%, 100% 0, 100% 100%, 0 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">


        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Main Intro & Headline) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <p className="text-amber-400 text-xs font-mono tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-amber-400/60" />
                WELCOME TO MY PORTFOLIO
              </p>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] mb-4">
                {name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold tracking-wider text-purple-300 font-mono">
                  {title}
                </span>
              </div>
            </div>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <p className="text-[10px] text-amber-400/90 font-mono mb-3 tracking-[0.25em] uppercase">PRIMARY TECH STACK</p>
              <div className="flex flex-wrap gap-2.5">
                {stack.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#0E0B19] rounded-xl border border-purple-500/25 hover:border-amber-400/50 hover:bg-purple-950/30 transition-all duration-300 shadow-md"
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-mono tracking-wider text-slate-200">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Triggers & Socials */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-full bg-linear-to-r from-amber-500 via-purple-600 to-purple-800 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-3 shadow-xl shadow-purple-900/40 hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 border border-amber-400/40"
              >
                EXPLORE WORK
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <ResumeViewer
                hasResume={!!(settings.hasResume || settings.resumeUrl)}
                fileName={settings.resumeFileName}
              />

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#0E0B19] border border-purple-500/25 hover:border-amber-400/60 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label={label}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column — Glowing 3D Cycloid Ring Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center items-center relative py-6"
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
              {/* Outer Golden Halo Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.3)] animate-spin-slow" />
              
              {/* Middle Electric Violet Ring */}
              <div className="absolute inset-5 rounded-full border-2 border-purple-500/50 shadow-[0_0_50px_rgba(147,51,234,0.4)] animate-spin-reverse" />
              
              {/* Glowing Cycloid Portal Glow */}
              <div className="absolute inset-10 rounded-full bg-linear-to-tr from-purple-700/30 via-amber-500/20 to-purple-900/40 blur-2xl animate-pulse-ring" />

              {/* Profile / Avatar Center Portal Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-amber-400/40 shadow-2xl shadow-purple-950/80 bg-[#0E0B19]">
                <Image
                  src={settings.aboutImage || '/atuljha.jpeg'}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0E0B19] via-transparent to-transparent opacity-40" />
              </div>


            </div>
          </motion.div>
        </div>

        {/* Minimal Scroll Down Trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            aria-label="Scroll to About"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400/80 group-hover:text-amber-400 transition-colors uppercase">
              SCROLL DOWN
            </span>
            <div className="w-5 h-9 border-2 border-purple-500/40 rounded-full flex justify-center pt-1.5 group-hover:border-amber-400 transition-colors">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1 h-2 bg-amber-400 rounded-full"
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
