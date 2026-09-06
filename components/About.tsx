'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  GraduationCap, MapPin, Mail, Github, Linkedin,
  Cpu, Globe, Code2, Rocket, Award, ShieldCheck
} from 'lucide-react'

interface AboutProps {
  settings: {
    heroName?: string
    heroTitle?: string
    aboutText?: string
    email?: string
    githubUrl?: string
    linkedinUrl?: string
    location?: string
    cgpa?: string
    batch?: string
    college?: string
  }
}

const interests = [
  { icon: Cpu,    label: 'BLOCKCHAIN & WEB3' },
  { icon: Globe,  label: 'FULL STACK DEV'    },
  { icon: Code2,  label: 'OPEN SOURCE'       },
  { icon: Rocket, label: 'IOT & EMBEDDED'    },
]

export default function About({ settings }: AboutProps) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const name  = settings.heroName  || 'ATUL JHA'
  const title = settings.heroTitle || 'FULL STACK DEVELOPER'
  const about = settings.aboutText ||
    'Computer Science student at Heritage Institute of Technology with a passion for emerging technologies. I thrive on building innovative solutions that combine creativity with technical excellence.'

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 px-6 overflow-hidden bg-[#07050E]"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-glow-purple w-[550px] h-[550px] top-1/4 -left-32" />
        <div className="bg-glow-gold w-[450px] h-[450px] bottom-1/4 -right-32" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section Label & Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="section-label">BACKGROUND & VISION</span>
          <h2 className="section-heading mt-2">
            WHO I{' '}
            <span className="text-gold-gradient">
              AM
            </span>
          </h2>
        </motion.div>

        {/* Main Card Container inspired by DIGITAL TRUST layout in reference image */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative"
        >
          {/* Subtle Ambient Hover Glow */}
          <div className="absolute -inset-px rounded-[2rem] bg-linear-to-r from-amber-500/30 via-purple-600/30 to-amber-500/30 opacity-60 blur-md pointer-events-none" />

          <div className="relative bg-[#0E0B19] rounded-[2rem] border border-purple-500/25 overflow-hidden shadow-2xl shadow-black">
            {/* Top Golden & Purple Gradient Accent Bar */}
            <div className="h-1 bg-linear-to-r from-amber-400 via-purple-600 to-amber-500" />

            <div className="p-8 md:p-12 grid md:grid-cols-12 gap-10">

              {/* Left Column: Bio & Core Interests */}
              <div className="md:col-span-7 space-y-8">

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">CS UNDERGRADUATE</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">{name}</h3>
                  <p className="text-purple-300 text-xs font-mono tracking-wider mt-1">{title}</p>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm md:text-base border-l-2 border-amber-400/80 pl-5 bg-purple-950/20 py-3 rounded-r-2xl">
                  {about}
                </p>

                {/* Core Focus Tags */}
                <div>
                  <p className="text-[10px] font-mono text-amber-400/90 tracking-[0.25em] uppercase mb-3">
                    CORE FOCUS AREAS
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {interests.map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#130F23] border border-purple-500/20 text-xs font-mono text-slate-200 hover:border-amber-400/50 transition-all"
                      >
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Quick Triggers */}
                <div className="flex gap-3 pt-2">
                  {settings.githubUrl && (
                    <a
                      href={settings.githubUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#130F23] border border-purple-500/30 text-xs font-mono text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-all shadow-md"
                    >
                      <Github className="w-4 h-4 text-amber-400" /> GITHUB
                    </a>
                  )}
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#130F23] border border-purple-500/30 text-xs font-mono text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-all shadow-md"
                    >
                      <Linkedin className="w-4 h-4 text-purple-400" /> LINKEDIN
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Info Grid Cards */}
              <div className="md:col-span-5 flex flex-col gap-3 justify-center">
                {[
                  {
                    icon: GraduationCap,
                    color: 'text-amber-400',
                    bg: 'bg-[#130F23] border-purple-500/25',
                    label: 'COLLEGE',
                    value: settings.college || 'Heritage Institute of Technology',
                  },
                  {
                    icon: MapPin,
                    color: 'text-purple-400',
                    bg: 'bg-[#130F23] border-purple-500/25',
                    label: 'LOCATION',
                    value: settings.location || 'Kolkata, India',
                  },
                  {
                    icon: Mail,
                    color: 'text-amber-400',
                    bg: 'bg-[#130F23] border-purple-500/25',
                    label: 'PRIMARY EMAIL',
                    value: settings.email || '—',
                  },
                  {
                    icon: Award,
                    color: 'text-purple-400',
                    bg: 'bg-[#130F23] border-purple-500/25',
                    label: 'ACADEMIC SCORE & BATCH',
                    value: `CGPA ${settings.cgpa || '8.9'} · BATCH ${settings.batch || '2024–28'}`,
                  },
                ].map(({ icon: Icon, color, bg, label, value }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border ${bg} hover:border-amber-400/40 transition-all duration-300 shadow-md`}
                  >
                    <div className={`mt-1 shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest">{label}</p>
                      <p className="text-xs text-slate-200 font-semibold mt-0.5 break-words">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
