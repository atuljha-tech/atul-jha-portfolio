'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github, Star, GitFork, Users, Flame, Code2, Trophy,
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

// GitHub Heatmap
function GithubHeatmap({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null

  const getLevel = (count: number) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 9) return 3
    return 4
  }

  const colors = [
    'bg-[#130F23]',
    'bg-purple-900',
    'bg-purple-700',
    'bg-amber-500',
    'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
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
    <div className="overflow-x-auto pb-1">
      <div className="relative min-w-max">
        <div className="flex mb-1" style={{ paddingLeft: '0px' }}>
          {monthLabels.map((m, i) => (
            <div
              key={i}
              className="text-[10px] font-mono text-purple-300 absolute uppercase"
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
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-amber-300 transition-all cursor-default`}
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
          <span className="text-[10px] font-mono text-amber-400 uppercase">More</span>
        </div>
      </div>
    </div>
  )
}

// LeetCode Heatmap
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

  const colors = [
    'bg-[#130F23]',
    'bg-purple-900',
    'bg-purple-700',
    'bg-amber-500',
    'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
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
    <div className="overflow-x-auto pb-1">
      <div className="min-w-max">
        <div className="flex gap-[3px]">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} submissions`}
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-amber-300 transition-all cursor-default`}
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
          <span className="text-[10px] font-mono text-amber-400 uppercase">More</span>
        </div>
      </div>
    </div>
  )
}

// Circular Progress Gauge
function CircularProgress({ solved, total, size = 120 }: { solved: number; total: number; size?: number }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const pct = Math.min(solved / total, 1)
  const dash = pct * circ

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#130F23" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#one37Grad)" strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s ease' }}
        />
        <defs>
          <linearGradient id="one37Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-black text-2xl leading-none">{solved}</span>
        <span className="text-amber-400 font-mono text-[11px] mt-0.5">/ {total}</span>
      </div>
    </div>
  )
}

// Difficulty Bar
function DiffBar({ label, solved, total, color }: {
  label: string; solved: number; total: number; color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-mono font-bold uppercase ${color}`}>{label}</span>
        <span className="text-xs text-slate-300 font-mono">{solved}<span className="text-slate-500">/{total}</span></span>
      </div>
      <div className="h-1.5 bg-[#130F23] rounded-full overflow-hidden border border-purple-500/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(solved / total) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  )
}

// Mini Stat Pill
function Pill({ icon: Icon, label, value, accent }: {
  icon: React.ElementType; label: string; value: string | number; accent: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#130F23] border border-purple-500/20 hover:border-amber-400/50 transition-colors shadow-md">
      <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <div>
        <p className="text-white font-black text-sm leading-none font-mono uppercase">{value}</p>
        <p className="text-purple-300 text-[10px] font-mono tracking-wider mt-0.5 uppercase">{label}</p>
      </div>
    </div>
  )
}

// Skeleton
function Skeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {[0, 1].map((i) => (
        <div key={i} className="bg-[#0E0B19] rounded-3xl border border-purple-500/20 p-8 space-y-5 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#130F23]" />
            <div className="space-y-2">
              <div className="w-28 h-4 bg-[#130F23] rounded" />
              <div className="w-20 h-3 bg-[#130F23] rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="h-16 bg-[#130F23] rounded-2xl" />
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
      className="relative py-28 px-6 overflow-hidden bg-[#07050E]"
    >
      <div className="bg-glow-purple w-[600px] h-[600px] top-1/4 -left-32" />
      <div className="bg-glow-gold w-[500px] h-[500px] bottom-1/4 -right-32" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#0E0B19] border border-amber-500/30 rounded-full mb-6">
            <Activity className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
              LIVE TELEMETRY & CODING METRICS
            </span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>

          <h2 className="section-heading mb-3">
            DEVELOPER{' '}
            <span className="text-gold-gradient">
              ACTIVITY
            </span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-xs font-mono tracking-wider uppercase">
            REAL-TIME METRICS AUTOMATICALLY SYNCED WITH GITHUB & LEETCODE APIS
          </p>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">

            {/* GitHub Card */}
            {github && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative group"
              >
                <div className="relative bg-[#0E0B19] rounded-3xl border border-purple-500/25 overflow-hidden hover:border-amber-400/50 transition-all duration-400 shadow-2xl shadow-black">
                  <div className="h-1 bg-linear-to-r from-amber-400 via-purple-600 to-amber-500" />

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/20">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center shadow-md">
                          <Github className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-black text-lg uppercase tracking-tight">GITHUB TELEMETRY</h3>
                          <a
                            href={`https://github.com/${github.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-400 font-mono hover:text-amber-300 transition-colors"
                          >
                            @{github.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">LIVE API</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Pill icon={GitFork} label="Public Repos" value={github.publicRepos} accent="amber" />
                      <Pill icon={Star} label="Total Stars" value={github.totalStars} accent="amber" />
                      <Pill icon={Flame} label="Current Streak" value={`${github.currentStreak}d`} accent="purple" />
                      <Pill icon={Zap} label="Max Streak" value={`${github.maxStreak}d`} accent="purple" />
                    </div>

                    <div className="flex items-center justify-between px-5 py-3.5 bg-[#130F23] border border-purple-500/20 rounded-2xl mb-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-mono text-slate-300 uppercase">Contributions this year</span>
                      </div>
                      <span className="text-amber-400 font-black text-xl font-mono">
                        <Counter value={github.totalContributions} />
                      </span>
                    </div>

                    <div className="bg-[#130F23] rounded-2xl p-5 border border-purple-500/20">
                      <p className="text-[10px] text-amber-400/90 font-mono mb-4 uppercase tracking-widest">
                        CONTRIBUTION MATRIX
                      </p>
                      <GithubHeatmap data={github.contributions} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LeetCode Card */}
            {leetcode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
              >
                <div className="relative bg-[#0E0B19] rounded-3xl border border-purple-500/25 overflow-hidden hover:border-amber-400/50 transition-all duration-400 shadow-2xl shadow-black">
                  <div className="h-1 bg-linear-to-r from-purple-600 via-amber-400 to-purple-600" />

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/20">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center text-2xl shadow-md">
                          🧩
                        </div>
                        <div>
                          <h3 className="text-white font-black text-lg uppercase tracking-tight">LEETCODE ALGORITHMS</h3>
                          <a
                            href={`https://leetcode.com/${leetcode.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-400 font-mono hover:text-amber-300 transition-colors"
                          >
                            @{leetcode.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">LIVE API</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 p-5 bg-[#130F23] rounded-2xl border border-purple-500/20">
                      <div className="shrink-0">
                        <CircularProgress solved={leetcode.totalSolved} total={3916} size={110} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <DiffBar label="EASY" solved={leetcode.easySolved} total={940} color="text-emerald-400" />
                        <DiffBar label="MEDIUM" solved={leetcode.mediumSolved} total={2048} color="text-amber-400" />
                        <DiffBar label="HARD" solved={leetcode.hardSolved} total={928} color="text-purple-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <Pill icon={Flame} label="Streak" value={`${leetcode.streak}d`} accent="amber" />
                      <Pill icon={Code2} label="Active" value={`${leetcode.totalActiveDays}d`} accent="purple" />
                      <Pill icon={Trophy} label="Global Rank" value={`#${leetcode.ranking.toLocaleString()}`} accent="amber" />
                    </div>

                    <div className="bg-[#130F23] rounded-2xl p-5 border border-purple-500/20">
                      <p className="text-[10px] text-amber-400/90 font-mono mb-4 uppercase tracking-widest">
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
          className="text-center text-xs text-amber-400/80 font-mono mt-10 tracking-[0.25em] uppercase"
        >
          • DATA AUTOMATICALLY REFRESHED FROM PUBLIC APIS •
        </motion.p>
      </div>
    </section>
  )
}
