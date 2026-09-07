'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Mail, Award, Github, Linkedin } from 'lucide-react'

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

export default function About({ settings }: AboutProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const name = settings.heroName || 'ATUL JHA'
  const title = settings.heroTitle || 'FULL STACK DEVELOPER'
  const about = settings.aboutText ||
    'Computer Science student at Heritage Institute of Technology with a passion for modern web technologies and software engineering. I thrive on building clean, efficient applications that solve real-world problems.'

  const details = [
    {
      icon: GraduationCap,
      label: 'COLLEGE',
      value: settings.college || 'Heritage Institute of Technology',
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: settings.location || 'Kolkata, India',
    },
    {
      icon: Mail,
      label: 'EMAIL',
      value: settings.email || 'atuljha275@gmail.com',
    },
    {
      icon: Award,
      label: 'ACADEMICS',
      value: `CGPA ${settings.cgpa || '8.9'} (${settings.batch || '2024–2028'})`,
    },
  ]

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-14 md:py-16 px-6 overflow-hidden bg-[#07050E]"
    >
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section Label & Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-8"
        >
          <h2 className="section-heading">
            ABOUT{' '}
            <span className="text-gold-gradient">
              ME
            </span>
          </h2>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#0E0B19] rounded-3xl border border-purple-500/25 p-8 md:p-12 shadow-2xl shadow-black"
        >
          <div className="grid md:grid-cols-12 gap-10 items-center">

            {/* Left Bio Column */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">{name}</h3>
                <p className="text-purple-300 text-xs font-mono tracking-wider mt-1">{title}</p>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base border-l-2 border-amber-400 pl-4 py-1">
                {about}
              </p>

              <div className="flex gap-3 pt-2">
                {settings.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#130F23] border border-purple-500/30 text-xs font-mono text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                  >
                    <Github className="w-4 h-4 text-amber-400" /> GITHUB
                  </a>
                )}
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#130F23] border border-purple-500/30 text-xs font-mono text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-purple-400" /> LINKEDIN
                  </a>
                )}
              </div>
            </div>

            {/* Right Info List */}
            <div className="md:col-span-5 space-y-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#130F23] border border-purple-500/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0E0B19] border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest">{label}</p>
                    <p className="text-xs text-slate-200 font-semibold mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
