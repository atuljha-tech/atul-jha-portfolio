'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  GraduationCap, MapPin, Mail, Github, Linkedin,
  Code2, Cpu, Globe, Rocket, BookOpen, Star, Sparkles
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

const techStack = [
  { name: 'React', icon: '⚛️', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20 text-blue-300' },
  { name: 'Next.js', icon: '▲', color: 'from-slate-500/20 to-slate-400/20 border-slate-500/20 text-slate-300' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-500/20 to-emerald-500/20 border-green-500/20 text-green-300' },
  { name: 'Blockchain', icon: '🔗', color: 'from-purple-500/20 to-violet-500/20 border-purple-500/20 text-purple-300' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-600/20 to-teal-500/20 border-green-600/20 text-green-300' },
  { name: 'Solidity', icon: '💎', color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/20 text-indigo-300' },
  { name: 'Python', icon: '🐍', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/20 text-yellow-300' },
  { name: 'TypeScript', icon: '🔷', color: 'from-blue-600/20 to-blue-400/20 border-blue-600/20 text-blue-300' },
]

const interests = [
  { icon: Cpu, label: 'Blockchain & Web3', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Globe, label: 'Full Stack Dev', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Code2, label: 'Open Source', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Rocket, label: 'IoT & Embedded', color: 'text-orange-400', bg: 'bg-orange-500/10' },
]

export default function About({ settings }: AboutProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const name = settings.heroName || 'Atul Jha'
  const title = settings.heroTitle || 'Full Stack Developer'
  const about = settings.aboutText ||
    'Computer Science student at Heritage Institute of Technology with a passion for emerging technologies. I thrive on building innovative solutions that combine creativity with technical excellence.'

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-[#0A0F1C]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1424] border border-slate-800 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-mono tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              INTRODUCTION
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            About{' '}
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Me
            </span>
          </h2>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mb-6"
        >
          <div className="absolute -inset-px bg-linear-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-[#0D1424] rounded-3xl border border-slate-800/60 overflow-hidden">
            <div className="h-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-8">

                {/* Left — identity */}
                <div className="md:w-64 shrink-0">
                  {/* Avatar placeholder — initials */}
                  <div className="relative w-20 h-20 mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-purple-500/20">
                      {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0D1424]" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1">{name}</h3>
                  <p className="text-purple-400 font-medium text-sm mb-5">{title}</p>

                  {/* Quick info */}
                  <div className="space-y-2.5">
                    {settings.college && (
                      <div className="flex items-center gap-2.5">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="text-xs text-slate-400 leading-tight">{settings.college}</span>
                      </div>
                    )}
                    {settings.location && (
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span className="text-xs text-slate-400">{settings.location}</span>
                      </div>
                    )}
                    {settings.email && (
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="text-xs text-slate-400 truncate">{settings.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Social */}
                  <div className="flex gap-2 mt-5">
                    {settings.githubUrl && (
                      <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/60 border border-slate-700/50 rounded-xl text-xs text-slate-300 hover:text-white hover:border-purple-500/50 transition-all">
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {settings.linkedinUrl && (
                      <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/60 border border-slate-700/50 rounded-xl text-xs text-slate-300 hover:text-white hover:border-blue-500/50 transition-all">
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-slate-800/60 self-stretch" />

                {/* Right — content */}
                <div className="flex-1 min-w-0">
                  {/* Bio */}
                  <p className="text-slate-300 leading-relaxed text-base mb-8 border-l-2 border-purple-500/40 pl-4">
                    {about}
                  </p>

                  {/* Interests */}
                  <div className="mb-6">
                    <p className="text-xs font-mono text-slate-500 tracking-widest mb-3 uppercase">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(({ icon: Icon, label, color, bg }) => (
                        <div key={label} className={`flex items-center gap-2 px-3 py-1.5 ${bg} rounded-full border border-white/5`}>
                          <Icon className={`w-3.5 h-3.5 ${color}`} />
                          <span className="text-xs text-slate-300 font-medium">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p className="text-xs font-mono text-slate-500 tracking-widest mb-3 uppercase">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <div
                          key={tech.name}
                          className={`flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r ${tech.color} rounded-lg border text-xs font-medium`}
                        >
                          <span>{tech.icon}</span>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'CGPA', value: settings.cgpa || '8.9', sub: '1st Year', icon: '🎓', color: 'from-blue-500/15 to-purple-500/15 border-blue-500/20' },
            { label: 'Batch', value: settings.batch || '2024–28', sub: 'B.Tech CSE', icon: '📅', color: 'from-purple-500/15 to-pink-500/15 border-purple-500/20' },
            { label: 'Projects', value: '3+', sub: 'Built & Deployed', icon: '🚀', color: 'from-pink-500/15 to-orange-500/15 border-pink-500/20' },
            { label: 'Focus', value: 'Web3', sub: 'Blockchain & IoT', icon: '🔗', color: 'from-orange-500/15 to-yellow-500/15 border-orange-500/20' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`relative bg-linear-to-br ${stat.color} bg-[#0D1424] rounded-2xl border p-5 text-center hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs font-bold text-slate-300">{stat.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
