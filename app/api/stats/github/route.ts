import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'atuljha-tech'

export const revalidate = 3600

export async function GET() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      // This API returns { total: { "2024": 127, "2025": 45 }, contributions: [{date, count, level}] }
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok) throw new Error(`GitHub user fetch failed: ${userRes.status}`)

    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []
    const contribData = contribRes.ok ? await contribRes.json() : null

    // Total stars
    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
      : 0

    // Contributions list — sorted oldest to newest
    const contribList: { date: string; count: number }[] =
      Array.isArray(contribData?.contributions)
        ? contribData.contributions.map((d: any) => ({ date: d.date, count: d.count ?? 0 }))
        : []

    // Total contributions = sum of all counts in the list
    const totalContributions = contribList.reduce((sum, d) => sum + d.count, 0)

    // Streak calculation — iterate from most recent day backwards
    const sorted = [...contribList].sort((a, b) => b.date.localeCompare(a.date))

    let currentStreak = 0
    let maxStreak = 0
    let tempStreak = 0
    let countingCurrent = true

    for (const day of sorted) {
      if (day.count > 0) {
        tempStreak++
        if (countingCurrent) currentStreak++
        if (tempStreak > maxStreak) maxStreak = tempStreak
      } else {
        // Allow today to be 0 (day hasn't ended yet)
        if (countingCurrent && day.date === sorted[0].date) continue
        countingCurrent = false
        tempStreak = 0
      }
    }

    // Last 364 days for heatmap
    const last364 = contribList.slice(-364)

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
