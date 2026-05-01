'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

interface Props {
  skills: Skill[]
}

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-400 to-cyan-400',
  Backend: 'from-purple-400 to-pink-400',
  Database: 'from-green-400 to-emerald-400',
  Blockchain: 'from-orange-400 to-yellow-400',
  DevOps: 'from-red-400 to-orange-400',
  Tools: 'from-slate-400 to-slate-300',
  Other: 'from-pink-400 to-rose-400',
}

const categoryBg: Record<string, string> = {
  Frontend: 'from-blue-500/10 to-cyan-500/10',
  Backend: 'from-purple-500/10 to-pink-500/10',
  Database: 'from-green-500/10 to-emerald-500/10',
  Blockchain: 'from-orange-500/10 to-yellow-500/10',
  DevOps: 'from-red-500/10 to-orange-500/10',
  Tools: 'from-slate-500/10 to-slate-400/10',
  Other: 'from-pink-500/10 to-rose-500/10',
}

export default function Skills({ skills }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  if (skills.length === 0) return null

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 mb-4 block">EXPERTISE</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Skills{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Learned
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Technologies and tools I've worked with
          </p>
        </motion.div>

        {/* Category groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, categorySkills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColors[category] || categoryColors.Other} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}
              />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-5 hover:border-transparent transition-all duration-300">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryBg[category] || categoryBg.Other} flex items-center justify-center`}
                  >
                    <span className="text-xl">
                      {category === 'Frontend'
                        ? '⚛️'
                        : category === 'Backend'
                        ? '🔧'
                        : category === 'Database'
                        ? '🗄️'
                        : category === 'Blockchain'
                        ? '🔗'
                        : category === 'DevOps'
                        ? '🚀'
                        : category === 'Tools'
                        ? '🛠️'
                        : '💡'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{category}</h3>
                    <p className="text-xs text-slate-500 font-mono">{categorySkills.length} SKILLS</p>
                  </div>
                </div>

                {/* Skills list */}
                <div className="space-y-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-sm">{skill.icon}</span>}
                          <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                        </div>
                        <span
                          className={`text-xs font-mono bg-gradient-to-r ${
                            categoryColors[category] || categoryColors.Other
                          } text-transparent bg-clip-text`}
                        >
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                          className={`h-full bg-gradient-to-r ${
                            categoryColors[category] || categoryColors.Other
                          } rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
