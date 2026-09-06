'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill { _id: string; name: string; category: string; proficiency: number; icon?: string }
interface Props { skills: Skill[] }

const catStyle: Record<string, { bar: string; badge: string; icon: string }> = {
  Frontend:    { bar: 'from-amber-400 to-purple-600',    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',    icon: '⚛️' },
  Backend:     { bar: 'from-purple-500 to-amber-400',   badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30', icon: '🔧' },
  Database:    { bar: 'from-amber-500 to-purple-500',   badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',   icon: '🗄️' },
  Blockchain:  { bar: 'from-amber-400 to-orange-500',   badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',   icon: '🔗' },
  DevOps:      { bar: 'from-purple-600 to-pink-500',    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30', icon: '🚀' },
  Tools:       { bar: 'from-amber-400 to-purple-600',   badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',   icon: '🛠️' },
  Other:       { bar: 'from-purple-500 to-amber-400',   badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30', icon: '💡' },
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
      <div className="bg-glow-purple w-[500px] h-[500px] top-0 -right-20" />
      <div className="bg-glow-gold w-[400px] h-[400px] bottom-0 -left-20" />

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
              CAPABILITIES
            </span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-xs font-mono tracking-wider uppercase">
            TECHNOLOGIES, FRAMEWORKS & SYSTEM PROFICIENCIES
          </p>
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
                className="group relative rounded-3xl border border-purple-500/25 bg-[#0E0B19] p-6 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-black"
              >
                {/* Category header */}
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-purple-500/20">
                  <div className="w-11 h-11 rounded-2xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center text-xl shadow-md">
                    {style.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-black text-base uppercase tracking-tight">{cat}</h3>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${style.badge}`}>
                      {catSkills.length} SKILLS
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {catSkills.map((skill, si) => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-sm">{skill.icon}</span>}
                          <span className="text-xs text-slate-200 font-mono tracking-wider font-semibold">{skill.name}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-400">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-[#130F23] rounded-full overflow-hidden border border-purple-500/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1.1, delay: ci * 0.08 + si * 0.04 + 0.3, ease: 'easeOut' }}
                          className={`h-full bg-linear-to-r ${style.bar} rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]`}
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
