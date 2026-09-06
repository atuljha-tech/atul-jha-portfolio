'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, ArrowRight } from 'lucide-react'
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
    "Specializing in modern web applications, distributed systems, and clean user experiences. Building software that bridges technical excellence with real-world impact."

  const socialLinks = [
    settings.githubUrl   && { icon: Github,   href: settings.githubUrl,         label: 'GitHub'   },
    settings.linkedinUrl && { icon: Linkedin,  href: settings.linkedinUrl,       label: 'LinkedIn' },
    settings.email       && { icon: Mail,      href: `mailto:${settings.email}`, label: 'Email'    },
    settings.twitterUrl  && { icon: Twitter,   href: settings.twitterUrl,        label: 'Twitter'  },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-[#07050E]"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow-purple w-[500px] h-[500px] -top-20 -left-20" />
        <div className="bg-glow-gold w-[450px] h-[450px] top-1/3 -right-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Intro & Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <p className="text-amber-400 text-xs font-mono tracking-[0.25em] uppercase mb-3">
                SOFTWARE ENGINEER & DEVELOPER
              </p>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.98] mb-4">
                {name}
              </h1>

              <p className="text-lg sm:text-xl font-semibold tracking-wider text-purple-300 font-mono">
                {title}
              </p>
            </div>

            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Action Triggers & Social Links */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 rounded-full bg-linear-to-r from-amber-500 via-purple-600 to-purple-800 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 border border-amber-400/40"
              >
                VIEW PROJECTS
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <ResumeViewer
                hasResume={!!(settings.hasResume || settings.resumeUrl)}
                fileName={settings.resumeFileName}
              />

              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#0E0B19] border border-purple-500/25 hover:border-amber-400/60 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all duration-300 shadow-md"
                    aria-label={label}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Clean Profile Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl bg-[#0E0B19]">
              <Image
                src={settings.aboutImage || '/atuljha.jpeg'}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
                sizes="(max-width: 768px) 256px, 320px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0E0B19]/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Minimal Scroll Down Trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            aria-label="Scroll to About"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400/80 group-hover:text-amber-400 transition-colors uppercase">
              SCROLL
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
