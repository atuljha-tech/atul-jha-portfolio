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

// ── Animated counter ──────────────────────────────────────────────────────────
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

// ── GitHub heatmap ────────────────────────────────────────────────────────────
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
    'bg-slate-800/80',
    'bg-emerald-900',
    'bg-emerald-700',
    'bg-emerald-500',
    'bg-emerald-400',
  ]

  // Build weeks
  const weeks: { date: string; count: number }[][] = []
  let week: { date: string; count: number }[] = []
  data.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === data.length - 1) {
      weeks.push([...week])
      week = []
    }
  })

  // Month labels
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
        {/* Month labels */}
        <div className="flex mb-1" style={{ paddingLeft: '0px' }}>
          {monthLabels.map((m, i) => (
            <div
              key={i}
              className="text-[10px] text-slate-500 absolute"
              style={{ left: `${m.col * 13}px` }}
            >
              {m.label}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px] mt-4">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-white/20 transition-all cursor-default`}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-slate-600">Less</span>
          {colors.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
          ))}
          <span className="text-[10px] text-slate-600">More</span>
        </div>
      </div>
    </div>
  )
}

// ── LeetCode heatmap ──────────────────────────────────────────────────────────
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
    'bg-slate-800/80',
    'bg-orange-900',
    'bg-orange-700',
    'bg-orange-500',
    'bg-orange-400',
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
                  className={`w-[10px] h-[10px] rounded-[2px] ${colors[getLevel(day.count)]} hover:ring-1 hover:ring-white/20 transition-all cursor-default`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-slate-600">Less</span>
          {colors.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
          ))}
          <span className="text-[10px] text-slate-600">More</span>
        </div>
      </div>
    </div>
  )
}

// ── Circular progress ─────────────────────────────────────────────────────────
function CircularProgress({ solved, total, size = 120 }: { solved: number; total: number; size?: number }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const pct = Math.min(solved / total, 1)
  const dash = pct * circ

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        {/* Track */}
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1e293b" strokeWidth="7" />
        {/* Progress */}
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="url(#lcGrad)" strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s ease' }}
        />
        <defs>
          <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-black text-2xl leading-none">{solved}</span>
        <span className="text-slate-500 text-[11px] mt-0.5">/ {total}</span>
      </div>
    </div>
  )
}

// ── Difficulty bar ────────────────────────────────────────────────────────────
function DiffBar({ label, solved, total, color }: {
  label: string; solved: number; total: number; color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-semibold ${color}`}>{label}</span>
        <span className="text-xs text-slate-400 font-mono">{solved}<span className="text-slate-600">/{total}</span></span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
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

// ── Mini stat pill ────────────────────────────────────────────────────────────
function Pill({ icon: Icon, label, value, accent }: {
  icon: React.ElementType; label: string; value: string | number; accent: string
}) {
  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-${accent}-500/30 transition-colors group`}>
      <div className={`w-8 h-8 rounded-lg bg-${accent}-500/15 flex items-center justify-center shrink-0`}>
        <Icon className={`w-3.5 h-3.5 text-${accent}-400`} />
      </div>
      <div>
        <p className="text-white font-bold text-sm leading-none">{value}</p>
        <p className="text-slate-500 text-[11px] mt-0.5">{label}</p>
      </div>
    </div>
  )
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {[0, 1].map((i) => (
        <div key={i} className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-slate-800 rounded" />
              <div className="w-16 h-3 bg-slate-800 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="h-14 bg-slate-800 rounded-xl" />
            ))}
          </div>
          <div className="h-20 bg-slate-800 rounded-xl" />
        </div>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [github, setGithub] = useState<GitHubData | null>(null)
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Defer stats fetch — don't block initial page render
    // Wait until page is interactive, then load stats
    const timer = setTimeout(() => {
      Promise.all([
        fetch('/api/stats/github').then((r) => r.json()).catch(() => null),
        fetch('/api/stats/leetcode').then((r) => r.json()).catch(() => null),
      ]).then(([gh, lc]) => {
        if (gh && !gh.error) setGithub(gh)
        if (lc && !lc.error) setLeetcode(lc)
        setLoading(false)
      })
    }, 1500) // 1.5s delay — page renders first, stats load after
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-24 px-6 overflow-hidden bg-[#0A0F1C]"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1424] border border-slate-800 rounded-full mb-6">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
              LIVE CODING STATS
            </span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Coding{' '}
            <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-blue-400 text-transparent bg-clip-text">
              Activity
            </span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Real-time stats pulled directly from GitHub & LeetCode APIs — updates every hour automatically
          </p>
        </motion.div>

        {/* ── Cards ── */}
        {loading ? (
          <Skeleton />
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* ── GitHub Card ── */}
            {github && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative group"
              >
                {/* Glow border */}
                <div className="absolute -inset-px bg-linear-to-br from-emerald-500/40 via-transparent to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/60 overflow-hidden">
                  {/* Top accent */}
                  <div className="h-0.5 bg-linear-to-r from-emerald-500 via-teal-500 to-blue-500" />

                  <div className="p-6">
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                          <Github className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base">GitHub</h3>
                          <a
                            href={`https://github.com/${github.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                          >
                            @{github.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[11px] text-emerald-400 font-mono font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      <Pill icon={GitFork} label="Repositories" value={github.publicRepos} accent="emerald" />
                      <Pill icon={Star} label="Total Stars" value={github.totalStars} accent="yellow" />
                      <Pill icon={Flame} label="Current Streak" value={`${github.currentStreak} days`} accent="orange" />
                      <Pill icon={Zap} label="Max Streak" value={`${github.maxStreak} days`} accent="purple" />
                    </div>

                    {/* Total contributions banner */}
                    <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/8 border border-emerald-500/15 rounded-xl mb-5">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-300">Contributions this year</span>
                      </div>
                      <span className="text-emerald-400 font-black text-lg font-mono">
                        <Counter value={github.totalContributions} />
                      </span>
                    </div>

                    {/* Heatmap */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50">
                      <p className="text-[11px] text-slate-500 font-mono mb-3 uppercase tracking-wider">
                        Contribution Graph
                      </p>
                      <GithubHeatmap data={github.contributions} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── LeetCode Card ── */}
            {leetcode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-px bg-linear-to-br from-orange-500/40 via-transparent to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/60 overflow-hidden">
                  <div className="h-0.5 bg-linear-to-r from-orange-500 via-yellow-500 to-amber-400" />

                  <div className="p-6">
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-xl">
                          🧩
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base">LeetCode</h3>
                          <a
                            href={`https://leetcode.com/${leetcode.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-orange-400 transition-colors"
                          >
                            @{leetcode.username}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-[11px] text-orange-400 font-mono font-medium">LIVE</span>
                      </div>
                    </div>

                    {/* Solved ring + difficulty */}
                    <div className="flex items-center gap-6 mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                      <div className="shrink-0">
                        <CircularProgress solved={leetcode.totalSolved} total={3916} size={110} />
                        <p className="text-center text-[11px] text-slate-500 mt-1.5">Problems Solved</p>
                      </div>
                      <div className="flex-1 space-y-3">
                        <DiffBar label="Easy" solved={leetcode.easySolved} total={940} color="text-emerald-400" />
                        <DiffBar label="Medium" solved={leetcode.mediumSolved} total={2048} color="text-yellow-400" />
                        <DiffBar label="Hard" solved={leetcode.hardSolved} total={928} color="text-red-400" />
                      </div>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                      <Pill icon={Flame} label="Streak" value={`${leetcode.streak}d`} accent="orange" />
                      <Pill icon={Code2} label="Active Days" value={leetcode.totalActiveDays} accent="yellow" />
                      <Pill icon={Trophy} label="Rank" value={`#${leetcode.ranking.toLocaleString()}`} accent="purple" />
                    </div>

                    {/* Heatmap */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50">
                      <p className="text-[11px] text-slate-500 font-mono mb-3 uppercase tracking-wider">
                        Submission Activity (6 months)
                      </p>
                      <LeetHeatmap data={leetcode.submissionDays} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-slate-700 font-mono mt-8 tracking-wider"
        >
          • DATA REFRESHES EVERY HOUR • POWERED BY PUBLIC APIS •
        </motion.p>
      </div>
    </section>
  )
}
