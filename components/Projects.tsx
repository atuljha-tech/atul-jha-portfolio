'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, Star, ArrowUpRight, Code2 } from 'lucide-react'

interface Project {
  _id: string
  name: string
  description: string
  techStack: string[]
  githubLink?: string
  liveLink?: string
  image?: string
  hasImage?: boolean
  category: string
  featured: boolean
}

interface Props { projects: Project[] }

const catAccent: Record<string, { pill: string; glow: string }> = {
  Blockchain:    { pill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',  glow: 'from-purple-600/30 to-amber-500/20'   },
  Web:           { pill: 'bg-purple-500/10 text-purple-300 border-purple-500/30', glow: 'from-purple-700/30 to-indigo-600/20' },
  'AI/ML':       { pill: 'bg-pink-500/10 text-pink-300 border-pink-500/30',    glow: 'from-pink-600/30 to-purple-600/20'   },
  Mobile:        { pill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',  glow: 'from-amber-600/30 to-purple-600/20'  },
  IoT:           { pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',    glow: 'from-cyan-600/30 to-purple-600/20'   },
  Cybersecurity: { pill: 'bg-red-500/10 text-red-300 border-red-500/30',       glow: 'from-red-600/30 to-purple-600/20'    },
  Other:         { pill: 'bg-slate-500/10 text-slate-300 border-slate-500/30', glow: 'from-slate-600/30 to-purple-600/20' },
}

export default function Projects({ projects }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  if (projects.length === 0) return null

  return (
    <section ref={ref} id="projects" className="section-base bg-[#07050E]">
      {/* Background Ambient Glows */}
      <div className="bg-glow-purple w-[550px] h-[550px] top-10 -left-20" />
      <div className="bg-glow-gold w-[450px] h-[450px] bottom-10 -right-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="section-heading">
            FEATURED{' '}
            <span className="text-gold-gradient">
              PROJECTS
            </span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2.5 mb-14"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-purple-600/40 border-amber-400 text-amber-300 shadow-lg shadow-purple-950/50'
                    : 'border-purple-500/20 text-slate-400 hover:text-white hover:border-purple-500/50 bg-[#0E0B19]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filtered.map((project, i) => {
              const accent = catAccent[project.category] || catAccent.Other
              return (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group relative flex flex-col rounded-[1.75rem] border border-purple-500/25 bg-[#0E0B19] overflow-hidden hover:border-amber-400/50 transition-all duration-400 hover:-translate-y-1.5 shadow-2xl shadow-black"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden shrink-0 bg-[#130F23]">
                    {(project.image || project.hasImage) ? (
                      <img
                        src={project.image || `/api/image/projects/${project._id}`}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-linear-to-br ${accent.glow} flex items-center justify-center`}>
                        <Code2 className="w-12 h-12 text-amber-400/40" />
                      </div>
                    )}

                    {/* Dark Violet Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0E0B19] via-[#0E0B19]/30 to-transparent opacity-80" />

                    {/* Hover Action Triggers */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#07050E]/70 backdrop-blur-xs">
                      {project.githubLink && (
                        <a
                          href={project.githubLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E0B19] border border-purple-500/40 text-white text-xs font-mono font-bold uppercase tracking-wider hover:border-amber-400 transition-colors shadow-lg"
                        >
                          <Github className="w-3.5 h-3.5 text-amber-400" /> SOURCE CODE
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-amber-500 to-purple-600 border border-amber-300/40 text-white text-xs font-mono font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                        </a>
                      )}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full backdrop-blur-md">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-amber-300 font-mono font-bold tracking-widest uppercase">FEATURED</span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-7 flex flex-col flex-1">
                    {/* Category Pill */}
                    <span className={`self-start text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 ${accent.pill}`}>
                      {project.category}
                    </span>

                    <h3 className="text-white font-black text-xl mb-2 tracking-tight uppercase group-hover:text-amber-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-300 bg-[#130F23] border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-amber-400 bg-[#130F23] border border-purple-500/20">
                          +{project.techStack.length - 4} MORE
                        </span>
                      )}
                    </div>

                    {/* Footer Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                      <div className="flex gap-4">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 uppercase">
                            <Github className="w-3.5 h-3.5" /> REPO
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-mono text-purple-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 uppercase">
                            <ExternalLink className="w-3.5 h-3.5" /> DEMO
                          </a>
                        )}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
