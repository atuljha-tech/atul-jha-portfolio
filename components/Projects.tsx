'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, ExternalLink, Star, Tag } from 'lucide-react'

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

interface Props {
  projects: Project[]
}

const categoryColors: Record<string, string> = {
  Blockchain: 'from-blue-400 to-purple-400',
  Web: 'from-green-400 to-teal-400',
  'AI/ML': 'from-pink-400 to-rose-400',
  Mobile: 'from-orange-400 to-yellow-400',
  IoT: 'from-cyan-400 to-blue-400',
  Cybersecurity: 'from-red-400 to-orange-400',
  Other: 'from-slate-400 to-slate-300',
}

export default function Projects({ projects }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  if (projects.length === 0) return null

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 mb-4 block">PORTFOLIO</span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real-world applications built with modern technologies
          </p>
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-[#0D1424] border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-transparent transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                {project.image ? (
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                    {project.featured && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-yellow-400">Featured</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="text-4xl">🚀</div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-yellow-400">Featured</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3 h-3 text-slate-500" />
                    <span
                      className={`text-xs font-medium bg-gradient-to-r ${
                        categoryColors[project.category] || categoryColors.Other
                      } text-transparent bg-clip-text`}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2">{project.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-slate-800/60 rounded-md text-xs text-slate-400 border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 bg-slate-800/60 rounded-md text-xs text-slate-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
