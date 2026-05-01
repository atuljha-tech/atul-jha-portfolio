import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'atuljha-tech'

export const revalidate = 3600 // cache 1 hour

export async function GET() {
  try {
    // GitHub REST API — public, no token needed for basic stats
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

    if (!userRes.ok) throw new Error('GitHub user fetch failed')

    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []

    // Calculate total stars
    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
      : 0

    // Get contribution data via GitHub's contribution graph (SVG scraping approach)
    // Use a reliable third-party API for contribution calendar
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } }
    )

    let contributions = { total: {}, contributions: [] }
    if (contribRes.ok) {
      contributions = await contribRes.json()
    }

    // Calculate streak from contributions
    const contribList: { date: string; count: number }[] = (contributions as any).contributions || []
    const sorted = [...contribList].sort((a, b) => b.date.localeCompare(a.date))

    let currentStreak = 0
    let maxStreak = 0
    let tempStreak = 0
    let totalContributions = 0

    for (const day of sorted) {
      totalContributions += day.count
      if (day.count > 0) {
        tempStreak++
        if (tempStreak > maxStreak) maxStreak = tempStreak
        if (currentStreak === tempStreak - 1 || currentStreak === 0) currentStreak = tempStreak
      } else {
        tempStreak = 0
      }
    }

    // Last 52 weeks for heatmap (most recent last)
    const last52Weeks = contribList.slice(-364)

    return NextResponse.json({
      username: user.login,
      name: user.name || user.login,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars,
      currentStreak,
      maxStreak,
      totalContributions,
      contributions: last52Weeks,
    })
  } catch (error) {
    console.error('GitHub stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
  }
}
