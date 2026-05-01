'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, Star, GitFork, Users, Flame, Code2, Trophy, Zap } from 'lucide-react'

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

function ContributionHeatmap({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-800'
    if (count <= 2) return 'bg-green-900'
    if (count <= 5) return 'bg-green-700'
    if (count <= 9) return 'bg-green-500'
    return 'bg-green-400'
  }

  // Group into weeks
  const weeks: { date: string; count: number }[][] = []
  let week: { date: string; count: number }[] = []
  data.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === data.length - 1) {
      weeks.push(week)
      week = []
    }
  })

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5 min-w-max">
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {w.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} contributions`}
                className={`w-2.5 h-2.5 rounded-sm ${getColor(day.count)} transition-colors hover:opacity-80`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function LeetCodeHeatmap({ data }: { data: { date: string; count: number }[] }) {
  if (!data.length) return null

  // Last 6 months
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const filtered = data
    .filter((d) => new Date(d.date) >= sixMonthsAgo)
    .sort((a, b) => a.date.localeCompare(b.date))

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-800'
    if (count <= 2) return 'bg-orange-900'
    if (count <= 5) return 'bg-orange-700'
    if (count <= 9) return 'bg-orange-500'
    return 'bg-orange-400'
  }

  const weeks: { date: string; count: number }[][] = []
  let week: { date: string; count: number }[] = []
  filtered.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === filtered.length - 1) {
      weeks.push(week)
      week = []
    }
  })

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5 min-w-max">
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {w.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} submissions`}
                className={`w-2.5 h-2.5 rounded-sm ${getColor(day.count)} transition-colors hover:opacity-80`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: React.ElementType; color: string
}) {
  return (
    <div className="bg-slate-800/40 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-white font-bold text-lg leading-none">{value}</p>
        <p className="text-slate-500 text-xs mt-0.5">{label}</p>
      </div>
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
    Promise.all([
      fetch('/api/stats/github').then((r) => r.json()).catch(() => null),
      fetch('/api/stats/leetcode').then((r) => r.json()).catch(() => null),
    ]).then(([gh, lc]) => {
      if (gh && !gh.error) setGithub(gh)
      if (lc && !lc.error) setLeetcode(lc)
      setLoading(false)
    })
  }, [])

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-24 px-6 overflow-hidden bg-linear-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-green-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-green-400 mb-4 block">LIVE STATS</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Coding{' '}
            <span className="bg-linear-to-r from-green-400 via-teal-400 to-blue-400 text-transparent bg-clip-text">
              Activity
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Real-time stats pulled directly from GitHub & LeetCode
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* GitHub Card */}
            {github && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-green-500/30 to-teal-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">GitHub</h3>
                      <a
                        href={`https://github.com/${github.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-green-400 transition-colors"
                      >
                        @{github.username}
                      </a>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-mono">LIVE</span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <StatCard label="Repositories" value={github.publicRepos} icon={GitFork} color="bg-green-600" />
                    <StatCard label="Total Stars" value={github.totalStars} icon={Star} color="bg-yellow-600" />
                    <StatCard label="Current Streak" value={`${github.currentStreak}d`} icon={Flame} color="bg-orange-600" />
                    <StatCard label="Max Streak" value={`${github.maxStreak}d`} icon={Zap} color="bg-purple-600" />
                  </div>

                  {/* Contribution heatmap */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-slate-400 font-mono">
                        {github.totalContributions.toLocaleString()} contributions this year
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-600">Less</span>
                        {['bg-slate-800', 'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-400'].map((c, i) => (
                          <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                        ))}
                        <span className="text-xs text-slate-600">More</span>
                      </div>
                    </div>
                    <ContributionHeatmap data={github.contributions} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* LeetCode Card */}
            {leetcode && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500/30 to-yellow-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <span className="text-lg">🧩</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">LeetCode</h3>
                      <a
                        href={`https://leetcode.com/${leetcode.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-orange-400 transition-colors"
                      >
                        @{leetcode.username}
                      </a>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                      <span className="text-xs text-orange-400 font-mono">LIVE</span>
                    </div>
                  </div>

                  {/* Solved ring + breakdown */}
                  <div className="flex items-center gap-6 mb-5">
                    {/* Circle */}
                    <div className="relative w-24 h-24 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke="url(#leetGrad)" strokeWidth="3"
                          strokeDasharray={`${(leetcode.totalSolved / 3916) * 100} 100`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="leetGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#eab308" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white font-black text-lg leading-none">{leetcode.totalSolved}</span>
                        <span className="text-slate-500 text-xs">solved</span>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-400 font-medium">Easy</span>
                        <span className="text-xs text-white font-mono">{leetcode.easySolved}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${(leetcode.easySolved / 940) * 100}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-yellow-400 font-medium">Medium</span>
                        <span className="text-xs text-white font-mono">{leetcode.mediumSolved}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(leetcode.mediumSolved / 2048) * 100}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-red-400 font-medium">Hard</span>
                        <span className="text-xs text-white font-mono">{leetcode.hardSolved}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${(leetcode.hardSolved / 928) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard label="Streak" value={`${leetcode.streak}d`} icon={Flame} color="bg-orange-600" />
                    <StatCard label="Active Days" value={leetcode.totalActiveDays} icon={Code2} color="bg-yellow-600" />
                    <StatCard label="Ranking" value={`#${leetcode.ranking.toLocaleString()}`} icon={Trophy} color="bg-purple-600" />
                  </div>

                  {/* Submission heatmap */}
                  <div>
                    <p className="text-xs text-slate-400 font-mono mb-3">
                      Submission activity (last 6 months)
                    </p>
                    <LeetCodeHeatmap data={leetcode.submissionDays} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
