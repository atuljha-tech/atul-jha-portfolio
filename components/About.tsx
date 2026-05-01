'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  GraduationCap, MapPin, Mail, Github, Linkedin,
  Cpu, Globe, Code2, Rocket
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
  { icon: Cpu,    label: 'Blockchain & Web3' },
  { icon: Globe,  label: 'Full Stack Dev'    },
  { icon: Code2,  label: 'Open Source'       },
  { icon: Rocket, label: 'IoT & Embedded'    },
]

export default function About({ settings }: AboutProps) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const name  = settings.heroName  || 'Atul Jha'
  const title = settings.heroTitle || 'Full Stack Developer'
  const about = settings.aboutText ||
    'Computer Science student at Heritage Institute of Technology with a passion for emerging technologies. I thrive on building innovative solutions that combine creativity with technical excellence.'

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-[#0A0F1C]"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-purple-700/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 w-[500px] h-[500px] bg-blue-700/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── label ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-mono tracking-[0.3em] text-purple-400 mb-5 uppercase"
        >
          About Me
        </motion.p>

        {/* ── heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-center text-5xl md:text-6xl font-black text-white mb-16 leading-tight"
        >
          Who I{' '}
          <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
            Am
          </span>
        </motion.h2>

        {/* ── main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative"
        >
          {/* glow border on hover */}
          <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-blue-500/25 via-purple-500/15 to-pink-500/25 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative bg-[#0D1424] rounded-3xl border border-slate-800/60 overflow-hidden">
            {/* top colour bar */}
            <div className="h-[3px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-10">

              {/* ── left: bio + interests ── */}
              <div className="space-y-8">

                {/* name + role */}
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{name}</h3>
                  <p className="text-purple-400 text-sm font-medium mt-1">{title}</p>
                </div>

                {/* bio */}
                <p className="text-slate-400 leading-[1.85] text-[15px] border-l-[3px] border-purple-500/40 pl-5">
                  {about}
                </p>

                {/* interests */}
                <div>
                  <p className="text-[11px] font-mono text-slate-600 tracking-[0.2em] uppercase mb-3">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 hover:border-purple-500/40 hover:text-white transition-all"
                      >
                        <Icon className="w-3 h-3 text-purple-400" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* social buttons */}
                <div className="flex gap-2 pt-1">
                  {settings.githubUrl && (
                    <a
                      href={settings.githubUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 hover:text-white hover:border-blue-500/50 transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* ── right: info strip ── */}
              <div className="flex md:flex-col gap-3 flex-wrap md:min-w-[180px]">
                {[
                  {
                    icon: GraduationCap,
                    color: 'text-purple-400',
                    bg: 'bg-purple-500/10 border-purple-500/20',
                    label: 'College',
                    value: settings.college || 'Heritage Institute of Technology',
                  },
                  {
                    icon: MapPin,
                    color: 'text-pink-400',
                    bg: 'bg-pink-500/10 border-pink-500/20',
                    label: 'Location',
                    value: settings.location || 'Kolkata, India',
                  },
                  {
                    icon: Mail,
                    color: 'text-blue-400',
                    bg: 'bg-blue-500/10 border-blue-500/20',
                    label: 'Email',
                    value: settings.email || '—',
                  },
                  {
                    icon: GraduationCap,
                    color: 'text-emerald-400',
                    bg: 'bg-emerald-500/10 border-emerald-500/20',
                    label: 'CGPA',
                    value: `${settings.cgpa || '8.9'} · ${settings.batch || '2024–28'}`,
                  },
                ].map(({ icon: Icon, color, bg, label, value }) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border ${bg} min-w-[160px] md:min-w-0`}
                  >
                    <div className={`mt-0.5 shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">{label}</p>
                      <p className="text-xs text-slate-300 font-medium mt-0.5 break-words leading-snug">{value}</p>
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
