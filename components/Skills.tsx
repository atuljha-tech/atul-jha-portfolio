'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill { _id: string; name: string; category: string; proficiency: number; icon?: string }
interface Props { skills: Skill[] }

const catStyle: Record<string, { bar: string; badge: string; icon: string }> = {
  Frontend:    { bar: 'from-blue-500 to-cyan-400',    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',    icon: '⚛️' },
  Backend:     { bar: 'from-violet-500 to-purple-400', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20', icon: '🔧' },
  Database:    { bar: 'from-emerald-500 to-teal-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', icon: '🗄️' },
  Blockchain:  { bar: 'from-orange-500 to-amber-400', badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20', icon: '🔗' },
  DevOps:      { bar: 'from-red-500 to-rose-400',     badge: 'bg-red-500/10 text-red-300 border-red-500/20',       icon: '🚀' },
  Tools:       { bar: 'from-slate-500 to-slate-400',  badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20', icon: '🛠️' },
  Other:       { bar: 'from-pink-500 to-rose-400',    badge: 'bg-pink-500/10 text-pink-300 border-pink-500/20',    icon: '💡' },
}

// Skeleton
function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="rounded-2xl border border-white/5 bg-[#0D1424] p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="skeleton w-10 h-10 rounded-xl" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-3 w-12" />
            </div>
          </div>
          {[1,2,3].map(j => (
            <div key={j} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="skeleton h-3 w-20" />
                <div className="skeleton h-3 w-8" />
              </div>
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
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
    <section ref={ref} id="skills" className="section-base">
      <div className="glow-orb w-80 h-80 bg-violet-600/8 top-0 -right-20 pointer-events-none" />
      <div className="glow-orb w-72 h-72 bg-blue-600/8 bottom-0 -left-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-heading mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Skills{' '}
            <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Learned
            </span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">Technologies and tools I work with</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(grouped).map(([cat, catSkills], ci) => {
            const style = catStyle[cat] || catStyle.Other
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: ci * 0.08 }}
                className="group relative rounded-2xl border border-white/6 bg-[#0D1424] p-5 hover:border-white/12 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${style.bar} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center text-lg">
                    {style.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{cat}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {catSkills.length} skills
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3.5">
                  {catSkills.map((skill, si) => (
                    <div key={skill._id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {skill.icon && <span className="text-sm">{skill.icon}</span>}
                          <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1.1, delay: ci * 0.08 + si * 0.04 + 0.3, ease: 'easeOut' }}
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
