'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill { _id: string; name: string; category: string; proficiency: number }
interface Props { skills: Skill[] }

const catStyle: Record<string, { bar: string }> = {
  Frontend:    { bar: 'from-amber-400 to-purple-600'  },
  Backend:     { bar: 'from-purple-500 to-amber-400' },
  Database:    { bar: 'from-amber-500 to-purple-500' },
  Blockchain:  { bar: 'from-amber-400 to-orange-500' },
  DevOps:      { bar: 'from-purple-600 to-pink-500'  },
  Tools:       { bar: 'from-amber-400 to-purple-600' },
  Other:       { bar: 'from-purple-500 to-amber-400' },
}

export default function Skills({ skills }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  if (skills.length === 0) return null

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <section ref={ref} id="skills" className="section-base bg-[#07050E]">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">TECHNICAL EXPERTISE</span>
          <h2 className="section-heading mb-3">
            SKILLS &{' '}
            <span className="text-gold-gradient">
              PROFICIENCIES
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([cat, catSkills], ci) => {
            const style = catStyle[cat] || catStyle.Other
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: ci * 0.08 }}
                className="rounded-3xl border border-purple-500/25 bg-[#0E0B19] p-6 shadow-2xl shadow-black"
              >
                {/* Category header */}
                <div className="mb-6 pb-3 border-b border-purple-500/20">
                  <h3 className="text-white font-bold text-base uppercase tracking-wider">{cat}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {catSkills.map((skill, si) => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-200 font-mono tracking-wider font-semibold">{skill.name}</span>
                        <span className="text-[11px] font-mono font-bold text-amber-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-[#130F23] rounded-full overflow-hidden border border-purple-500/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1.1, delay: ci * 0.08 + si * 0.04 + 0.2, ease: 'easeOut' }}
                          className={`h-full bg-linear-to-r ${style.bar} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
