'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, Star, ArrowUpRight } from 'lucide-react'

interface Project {
  _id: string
  name: string
  description: string
  techStack: string[]
  githubLink?: string
  liveLink?: string
  image?: string
  category: string
  featured: boolean
}

interface Props { projects: Project[] }

const catAccent: Record<string, { pill: string; glow: string }> = {
  Blockchain:    { pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20',    glow: 'from-blue-500/20 to-violet-500/20'   },
  Web:           { pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', glow: 'from-emerald-500/20 to-teal-500/20' },
  'AI/ML':       { pill: 'bg-pink-500/10 text-pink-300 border-pink-500/20',    glow: 'from-pink-500/20 to-rose-500/20'     },
  Mobile:        { pill: 'bg-orange-500/10 text-orange-300 border-orange-500/20', glow: 'from-orange-500/20 to-yellow-500/20' },
  IoT:           { pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',    glow: 'from-cyan-500/20 to-blue-500/20'     },
  Cybersecurity: { pill: 'bg-red-500/10 text-red-300 border-red-500/20',       glow: 'from-red-500/20 to-orange-500/20'    },
  Other:         { pill: 'bg-slate-500/10 text-slate-300 border-slate-500/20', glow: 'from-slate-500/20 to-slate-400/20'   },
}

// Skeleton
function ProjectSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#0D1424]">
      <div className="skeleton h-44 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="flex gap-2 pt-1">
          {[1,2,3].map(i => <div key={i} className="skeleton h-5 w-14 rounded-full" />)}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  if (projects.length === 0) return null

  return (
    <section ref={ref} id="projects" className="section-base">
      {/* Glows */}
      <div className="glow-orb w-96 h-96 bg-violet-600/8 top-0 -left-20 pointer-events-none" />
      <div className="glow-orb w-80 h-80 bg-pink-600/8 bottom-0 -right-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-heading mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            My{' '}
            <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Projects
            </span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Real-world applications built with modern technologies
          </p>
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  filter === cat
                    ? 'bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-500/25'
                    : 'border-white/8 text-slate-400 hover:text-white hover:border-white/20 bg-white/3'
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => {
              const accent = catAccent[project.category] || catAccent.Other
              return (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group relative flex flex-col rounded-2xl border border-white/6 bg-[#0D1424] overflow-hidden hover:border-white/12 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/8"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden shrink-0 bg-[#111827]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`w-full h-full bg-linear-to-br ${accent.glow} flex items-center justify-center`}>
                        <span className="text-5xl opacity-30">🚀</span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0D1424] via-transparent to-transparent opacity-60" />

                    {/* Hover action buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm border border-white/20 text-white text-xs font-medium hover:bg-black/90 transition-colors">
                          <Github className="w-3.5 h-3.5" /> Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600/80 backdrop-blur-sm border border-violet-400/30 text-white text-xs font-medium hover:bg-violet-600 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" /> Live
                        </a>
                      )}
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-sm">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] text-amber-300 font-semibold">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Category pill */}
                    <span className={`self-start text-[10px] font-semibold px-2.5 py-1 rounded-full border mb-3 ${accent.pill}`}>
                      {project.category}
                    </span>

                    <h3 className="text-white font-bold text-base mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      {project.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] text-slate-500 bg-white/4 border border-white/6">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] text-slate-600 bg-white/4 border border-white/6">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer links */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex gap-3">
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                            <Github className="w-3.5 h-3.5" /> Code
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                            <ExternalLink className="w-3.5 h-3.5" /> Demo
                          </a>
                        )}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
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
