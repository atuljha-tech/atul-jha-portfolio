'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github, Star, GitFork, Flame, Code2, Trophy,
  Zap, TrendingUp, Activity
} from 'lucide-react'

interface GitHubData {
  username: string
  name: string
  followers: number
  publicRepos: number
  totalStars: number
  currentStreak: number
  maxStreak: number
  totalContributions: number
  contributions: { date: string; count: number }[]
}

interface LeetCodeData {
  username: string
  ranking: number
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  streak: number
  totalActiveDays: number
  submissionDays: { date: string; count: number }[]
}

// Animated Counter
function Counter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [value, duration])
  return <>{display.toLocaleString()}</>
}

// GitHub Heatmap - GitHub Dark Green Theme
function GithubHeatmap({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null

  const getLevel = (count: number) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 9) return 3
    return 4
  }

  // GitHub Dark Mode Official Green Palette
  const colors = [
    'bg-[#161b22]',
    'bg-[#0e4429]',
    'bg-[#006d32]',
    'bg-[#26a641]',
    'bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.5)]',
  ]

  const weeks: { date: string; count: number }[][] = []
  let week: { date: string; count: number }[] = []
  data.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === data.length - 1) {
      weeks.push([...week])
      week = []
    }
  })

  const monthLabels: { label: string; col: number }[] = []
  weeks.forEach((w, wi) => {
    const d = new Date(w[0]?.date)
    if (d && (wi === 0 || new Date(weeks[wi - 1]?.[0]?.date).getMonth() !== d.getMonth())) {
      monthLabels.push({
        label: d.toLocaleString('default', { month: 'short' }),
        col: wi,
      })
    }
  })

  return (
    <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-600/30">
      <div className="relative min-w-max">
        <div className="flex mb-1" style={{ paddingLeft: '0px' }}>
          {monthLabels.map((m, i) => (
            <div
              key={i}
              className="text-[10px] font-mono text-[#8b949e] absolute uppercase"
              style={{ left: `${m.col * 13}px` }}
            >
              {m.label}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px] mt-5">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-[#3fb950] transition-all cursor-default`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] font-mono text-[#8b949e] uppercase">Less</span>
          {colors.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
          ))}
          <span className="text-[10px] font-mono text-[#3fb950] uppercase">More</span>
        </div>
      </div>
    </div>
  )
}

// LeetCode Heatmap - Black & Gold Theme
function LeetHeatmap({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const filtered = data
    .filter((d) => new Date(d.date) >= sixMonthsAgo)
    .sort((a, b) => a.date.localeCompare(b.date))

  const getLevel = (count: number) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 9) return 3
    return 4
  }

  // LeetCode Premium Black & Gold Palette
  const colors = [
    'bg-[#222222]',
    'bg-[#5e4200]',
    'bg-[#946700]',
    'bg-[#d49400]',
    'bg-[#ffa116] shadow-[0_0_8px_rgba(255,161,22,0.6)]',
  ]

  const weeks: { date: string; count: number }[][] = []
  let week: { date: string; count: number }[] = []
  filtered.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === filtered.length - 1) {
      weeks.push([...week])
      week = []
    }
  })

  return (
    <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-600/30">
      <div className="min-w-max">
        <div className="flex gap-[3px]">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} submissions`}
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-[#ffa116] transition-all cursor-default`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Less</span>
          {colors.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
          ))}
          <span className="text-[10px] font-mono text-[#ffa116] uppercase">More</span>
        </div>
      </div>
    </div>
  )
}

// Circular Progress Gauge for LeetCode
function CircularProgress({ solved, total, size = 110 }: { solved: number; total: number; size?: number }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const pct = Math.min(solved / total, 1)
  const dash = pct * circ

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#222222" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#leetcodeGrad)" strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s ease' }}
        />
        <defs>
          <linearGradient id="leetcodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffa116" />
            <stop offset="100%" stopColor="#feb600" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-black text-xl leading-none">{solved}</span>
        <span className="text-[#ffa116] font-mono text-[10px] mt-0.5">/ {total}</span>
      </div>
    </div>
  )
}

// Difficulty Bar for LeetCode
function DiffBar({ label, solved, total, color, bg }: {
  label: string; solved: number; total: number; color: string; bg: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-[11px] font-mono font-bold uppercase ${color}`}>{label}</span>
        <span className="text-[11px] text-slate-300 font-mono">{solved}<span className="text-slate-500">/{total}</span></span>
      </div>
      <div className="h-1.5 bg-[#222222] rounded-full overflow-hidden border border-[#333333]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(solved / total) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full rounded-full ${bg}`}
        />
      </div>
    </div>
  )
}

// Mini Stat Pill
function Pill({ icon: Icon, label, value, bg, border, iconColor }: {
  icon: React.ElementType; label: string; value: string | number; bg: string; border: string; iconColor: string
}) {
  return (
    <div className={`flex items-center gap-2.5 p-3 rounded-2xl ${bg} ${border} transition-colors shadow-md`}>
      <div className="w-8 h-8 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-white font-black text-xs sm:text-sm leading-none font-mono uppercase truncate">{value}</p>
        <p className="text-slate-400 text-[10px] font-mono tracking-wider mt-0.5 uppercase truncate">{label}</p>
      </div>
    </div>
  )
}

// Skeleton
function Skeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {[0, 1].map((i) => (
        <div key={i} className="bg-[#0d1117] rounded-3xl border border-[#30363d] p-6 sm:p-8 space-y-5 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#161b22]" />
            <div className="space-y-2">
              <div className="w-28 h-4 bg-[#161b22] rounded" />
              <div className="w-20 h-3 bg-[#161b22] rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="h-16 bg-[#161b22] rounded-2xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [github, setGithub] = useState<GitHubData | null>(null)
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      Promise.all([
        fetch('/api/stats/github').then((r) => r.json()).catch(() => null),
        fetch('/api/stats/leetcode').then((r) => r.json()).catch(() => null),
      ]).then(([gh, lc]) => {
        if (gh && !gh.error) setGithub(gh)
        if (lc && !lc.error) setLeetcode(lc)
        setLoading(false)
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-14 md:py-16 px-4 sm:px-6 overflow-hidden bg-[#07050E]"
    >
      <div className="bg-glow-purple w-[500px] h-[500px] top-1/4 -left-32" />
      <div className="bg-glow-gold w-[450px] h-[450px] bottom-1/4 -right-32" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-heading">
            DEVELOPER{' '}
            <span className="text-gold-gradient">
              ACTIVITY
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* GitHub Card - GitHub Dark Green Theme */}
            {github && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative group"
              >
                <div className="relative bg-[#0d1117] rounded-3xl border border-[#30363d] overflow-hidden hover:border-[#2ea043]/60 transition-all duration-400 shadow-2xl">
                  {/* Top GitHub Black to Green Accent Bar */}
                  <div className="h-1 bg-linear-to-r from-black via-[#0e4429] via-[#2ea043] to-[#3fb950]" />

                  <div className="p-5 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#30363d]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#161b22] border border-[#30363d] flex items-center justify-center shadow-md">
                          <Github className="w-5 h-5 text-[#3fb950]" />
                        </div>
                        <div>
                          <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-tight">GITHUB TELEMETRY</h3>
                          <a
                            href={`https://github.com/${github.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#3fb950] font-mono hover:text-[#56d364] transition-colors"
                          >
                            @{github.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#238636]/20 border border-[#2ea043]/40 rounded-full">
                        <div className="w-2 h-2 bg-[#3fb950] rounded-full animate-pulse" />
                        <span className="text-[10px] text-[#3fb950] font-mono font-bold uppercase">LIVE API</span>
                      </div>
                    </div>

                    {/* Stat Pills */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
                      <Pill icon={GitFork} label="Public Repos" value={github.publicRepos} bg="bg-[#161b22]" border="border-[#30363d]" iconColor="text-[#3fb950]" />
                      <Pill icon={Star} label="Total Stars" value={github.totalStars} bg="bg-[#161b22]" border="border-[#30363d]" iconColor="text-[#3fb950]" />
                      <Pill icon={Flame} label="Current Streak" value={`${github.currentStreak}d`} bg="bg-[#161b22]" border="border-[#30363d]" iconColor="text-[#3fb950]" />
                      <Pill icon={Zap} label="Max Streak" value={`${github.maxStreak}d`} bg="bg-[#161b22]" border="border-[#30363d]" iconColor="text-[#3fb950]" />
                    </div>

                    {/* Contribution Total Bar */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#161b22] border border-[#30363d] rounded-2xl mb-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#3fb950]" />
                        <span className="text-xs font-mono text-slate-300 uppercase">Contributions this year</span>
                      </div>
                      <span className="text-[#3fb950] font-black text-lg sm:text-xl font-mono">
                        <Counter value={github.totalContributions} />
                      </span>
                    </div>

                    {/* Heatmap Matrix */}
                    <div className="bg-[#161b22] rounded-2xl p-4 sm:p-5 border border-[#30363d] overflow-hidden">
                      <p className="text-[10px] text-[#3fb950] font-mono mb-3 uppercase tracking-widest">
                        CONTRIBUTION MATRIX
                      </p>
                      <GithubHeatmap data={github.contributions} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LeetCode Card - Premium Black & Gold Theme */}
            {leetcode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
              >
                <div className="relative bg-[#0f0f0f] rounded-3xl border border-[#ffa116]/30 overflow-hidden hover:border-[#ffa116]/60 transition-all duration-400 shadow-2xl hover:shadow-[0_10px_40px_rgba(255,161,22,0.15)]">
                  {/* Top LeetCode Black to Gold Accent Bar */}
                  <div className="h-1 bg-linear-to-r from-black via-[#d49400] to-[#ffa116]" />

                  <div className="p-5 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#ffa116]/20">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#161616] border border-[#ffa116]/30 flex items-center justify-center text-xl shadow-md">
                          <span className="text-[#ffa116] font-bold">⚡</span>
                        </div>
                        <div>
                          <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-tight">LEETCODE ALGORITHMS</h3>
                          <a
                            href={`https://leetcode.com/${leetcode.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#ffa116] font-mono hover:text-[#feb600] transition-colors"
                          >
                            @{leetcode.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#ffa116]/10 border border-[#ffa116]/30 rounded-full">
                        <div className="w-2 h-2 bg-[#ffa116] rounded-full animate-pulse" />
                        <span className="text-[10px] text-[#ffa116] font-mono font-bold uppercase">LIVE API</span>
                      </div>
                    </div>

                    {/* Solved Stats Ring & Difficulty Breakdown - Mobile Responsive Stack */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 mb-6 p-4 sm:p-5 bg-[#161616] rounded-2xl border border-[#ffa116]/20">
                      <CircularProgress solved={leetcode.totalSolved} total={3916} size={100} />
                      <div className="w-full flex-1 space-y-2.5">
                        <DiffBar label="EASY" solved={leetcode.easySolved} total={940} color="text-[#00b8a3]" bg="bg-[#00b8a3]" />
                        <DiffBar label="MEDIUM" solved={leetcode.mediumSolved} total={2048} color="text-[#ffc01e]" bg="bg-[#ffc01e]" />
                        <DiffBar label="HARD" solved={leetcode.hardSolved} total={928} color="text-[#ff375f]" bg="bg-[#ff375f]" />
                      </div>
                    </div>

                    {/* Stat Pills */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                      <Pill icon={Flame} label="Streak" value={`${leetcode.streak}d`} bg="bg-[#161616]" border="border-[#ffa116]/20" iconColor="text-[#ffa116]" />
                      <Pill icon={Code2} label="Active" value={`${leetcode.totalActiveDays}d`} bg="bg-[#161616]" border="border-[#ffa116]/20" iconColor="text-[#ffa116]" />
                      <Pill icon={Trophy} label="Rank" value={`#${leetcode.ranking.toLocaleString()}`} bg="bg-[#161616]" border="border-[#ffa116]/20" iconColor="text-[#ffa116]" />
                    </div>

                    {/* Heatmap Matrix */}
                    <div className="bg-[#161616] rounded-2xl p-4 sm:p-5 border border-[#ffa116]/20 overflow-hidden">
                      <p className="text-[10px] text-[#ffa116] font-mono mb-3 uppercase tracking-widest">
                        SUBMISSION ACTIVITY (6 MONTHS)
                      </p>
                      <LeetHeatmap data={leetcode.submissionDays} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-amber-400/80 font-mono mt-8 tracking-[0.25em] uppercase"
        >
          • DATA AUTOMATICALLY REFRESHED FROM PUBLIC APIS •
        </motion.p>
      </div>
    </section>
  )
}
