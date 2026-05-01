'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Mail, Github, Linkedin, BookOpen, Star } from 'lucide-react'
import Image from 'next/image'

interface AboutProps {
  settings: {
    heroName?: string
    heroTitle?: string
    aboutText?: string
    aboutImage?: string
    email?: string
    githubUrl?: string
    linkedinUrl?: string
    location?: string
    cgpa?: string
    batch?: string
    college?: string
  }
}

export default function About({ settings }: AboutProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { label: 'CGPA', value: settings.cgpa || '8.9', icon: Star, color: 'from-blue-400 to-purple-400' },
    { label: 'Batch', value: settings.batch || '2024-2028', icon: GraduationCap, color: 'from-purple-400 to-pink-400' },
    { label: 'College', value: 'HIT', icon: BookOpen, color: 'from-pink-400 to-blue-400' },
  ]

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 mb-4 block">INTRODUCTION</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-slate-800/50">
                <Image
                  src={settings.aboutImage || '/atuljha.jpeg'}
                  alt={settings.heroName || 'Atul Jha'}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 grid grid-cols-3 gap-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#0D1424]/90 backdrop-blur-sm border border-slate-800/50 rounded-xl p-3 text-center"
                  >
                    <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2">{settings.heroName || 'Atul Jha'}</h3>
            <p className="text-purple-400 font-medium mb-6">{settings.heroTitle || 'Full Stack Developer'}</p>

            <p className="text-slate-400 leading-relaxed mb-8 text-base">
              {settings.aboutText ||
                'Computer Science student at Heritage Institute of Technology with a passion for emerging technologies. I thrive on building innovative solutions that combine creativity with technical excellence.'}
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {settings.college && (
                <div className="flex items-center gap-3 p-3 bg-[#0D1424]/50 rounded-xl border border-slate-800/50">
                  <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300 truncate">{settings.college}</span>
                </div>
              )}
              {settings.location && (
                <div className="flex items-center gap-3 p-3 bg-[#0D1424]/50 rounded-xl border border-slate-800/50">
                  <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{settings.location}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-3 p-3 bg-[#0D1424]/50 rounded-xl border border-slate-800/50">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300 truncate">{settings.email}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {settings.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D1424] border border-slate-800 rounded-xl text-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0D1424] border border-slate-800 rounded-xl text-sm text-slate-300 hover:text-white hover:border-blue-500/50 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
