'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Code2, Cpu, Database, Rocket, Sparkles } from 'lucide-react'
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

export default function Hero({ settings }: HeroProps) {
  const name = settings.heroName || 'Atul Jha'
  const title = settings.heroSubtitle || 'Aspiring Full-Stack Developer'
  const description =
    settings.heroDescription ||
    "I'm a passionate Computer Science student exploring the world of web development. Currently learning modern stacks like React, Next.js, Blockchain and MongoDB."

  const socialLinks = [
    settings.githubUrl   && { icon: Github,   href: settings.githubUrl,             label: 'GitHub'   },
    settings.linkedinUrl && { icon: Linkedin,  href: settings.linkedinUrl,           label: 'LinkedIn' },
    settings.email       && { icon: Mail,      href: `mailto:${settings.email}`,     label: 'Email'    },
    settings.twitterUrl  && { icon: Twitter,   href: settings.twitterUrl,            label: 'Twitter'  },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string }[]

  const stack = [
    { icon: Code2,    label: 'React'      },
    { icon: Rocket,   label: 'Next.js'    },
    { icon: Cpu,      label: 'Blockchain' },
    { icon: Database, label: 'MongoDB'    },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-28 overflow-hidden bg-[#080C18]"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60 blur transition duration-500 group-hover:opacity-100" />
            <div className="relative px-6 py-2.5 bg-[#0D1424] rounded-full border border-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Passionate CS Student
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-slate-400 text-lg mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-linear-to-r from-blue-400 to-purple-400" />
              Hi, I'm
            </p>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none">
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                {name}
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-xl text-slate-300 font-light">{title}</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                className="w-0.5 h-6 bg-linear-to-b from-blue-400 to-purple-400"
              />
            </div>

            <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-8">{description}</p>

            {/* Stack pills */}
            <div className="mb-8">
              <p className="text-xs text-slate-500 font-mono mb-3 tracking-wider">CURRENTLY EXPLORING</p>
              <div className="flex flex-wrap gap-2">
                {stack.map(({ icon: Icon, label }) => (
                  <div key={label}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#0D1424] rounded-lg border border-slate-800 hover:border-purple-500/50 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-sm text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social + Resume */}
            <div className="flex items-center gap-3 flex-wrap">
              {settings.resumeUrl && (
                <a href={settings.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Resume
                </a>
              )}
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full bg-[#0D1424] border border-slate-800 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={label}>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-pink-500/20"
              />
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-slate-800/50 shadow-2xl">
                <Image
                  src={settings.aboutImage || '/atuljha.jpeg'}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-3 py-1.5 bg-[#0D1424] rounded-full border border-slate-800 shadow-xl"
              >
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <Rocket className="w-3 h-3 text-purple-400" />
                  <span className="bg-linear-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Learning</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-10 h-16 border-2 border-slate-700 rounded-full flex justify-center items-start pt-2 hover:border-purple-500 transition-colors"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ height: [6, 18, 6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 bg-linear-to-b from-blue-400 to-purple-400 rounded-full"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
