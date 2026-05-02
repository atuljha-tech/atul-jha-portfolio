import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'atuljha-tech'

export const revalidate = 3600

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok) throw new Error(`GitHub user fetch failed: ${userRes.status}`)

    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []

    // Total stars across all repos
    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
      : 0

    // Get account creation year to know how many years to fetch
    const createdYear = new Date(user.created_at).getFullYear()
    const currentYear = new Date().getFullYear()

    // Fetch all years from account creation to now
    const years = Array.from(
      { length: currentYear - createdYear + 1 },
      (_, i) => createdYear + i
    )

    // Fetch each year's contributions in parallel
    const yearResults = await Promise.all(
      years.map(y =>
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${y}`, {
          next: { revalidate: 3600 },
        })
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      )
    )

    // Sum all contributions across all years
    let totalContributions = 0
    let allContributions: { date: string; count: number }[] = []

    for (const result of yearResults) {
      if (!result) continue
      // total is an object like { "2025": 84 } or { "lastYear": 127 }
      const totals = result.total || {}
      for (const val of Object.values(totals)) {
        totalContributions += Number(val) || 0
      }
      if (Array.isArray(result.contributions)) {
        allContributions = allContributions.concat(
          result.contributions.map((d: any) => ({ date: d.date, count: d.count ?? 0 }))
        )
      }
    }

    // Sort all contributions by date
    allContributions.sort((a, b) => a.date.localeCompare(b.date))

    // Streak calculation from most recent backwards
    const sorted = [...allContributions].sort((a, b) => b.date.localeCompare(a.date))
    let currentStreak = 0
    let maxStreak = 0
    let tempStreak = 0
    let countingCurrent = true

    for (let i = 0; i < sorted.length; i++) {
      const day = sorted[i]
      if (day.count > 0) {
        tempStreak++
        if (countingCurrent) currentStreak++
        if (tempStreak > maxStreak) maxStreak = tempStreak
      } else {
        // Skip today if it's 0 (day hasn't ended)
        if (i === 0) continue
        countingCurrent = false
        tempStreak = 0
      }
    }

    // Last 364 days for heatmap
    const last364 = allContributions.slice(-364)

    return NextResponse.json({
      username: user.login,
      name: user.name || user.login,
      avatar: user.avatar_url,
      followers: user.followers,
      publicRepos: user.public_repos,
      totalStars,
      currentStreak,
      maxStreak,
      totalContributions,
      contributions: last364,
    })
  } catch (error) {
    console.error('GitHub stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
  }
}
