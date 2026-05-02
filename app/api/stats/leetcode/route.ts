import { NextResponse } from 'next/server'

const LEETCODE_USERNAME = 'AtulJha_27'

export const revalidate = 3600

export async function GET() {
  try {
    const query = `
      query {
        matchedUser(username: "${LEETCODE_USERNAME}") {
          username
          profile { ranking }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`LeetCode API failed: ${res.status}`)

    const data = await res.json()
    const user = data?.data?.matchedUser

    if (!user) throw new Error('LeetCode user not found')

    const stats = user.submitStats?.acSubmissionNum || []
    const easy   = stats.find((s: any) => s.difficulty === 'Easy')?.count   || 0
    const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0
    const hard   = stats.find((s: any) => s.difficulty === 'Hard')?.count   || 0
    const total  = stats.find((s: any) => s.difficulty === 'All')?.count    || (easy + medium + hard)

    const calendar      = user.userCalendar || {}
    const streak        = calendar.streak        || 0
    const totalActiveDays = calendar.totalActiveDays || 0

    // Parse submission calendar heatmap
    let submissionDays: { date: string; count: number }[] = []
    try {
      const raw = JSON.parse(calendar.submissionCalendar || '{}')
      submissionDays = Object.entries(raw).map(([ts, count]) => ({
        date:  new Date(Number(ts) * 1000).toISOString().split('T')[0],
        count: count as number,
      }))
    } catch {}

    return NextResponse.json({
      username:       user.username,
      ranking:        user.profile?.ranking || 0,
      totalSolved:    total,
      easySolved:     easy,
      mediumSolved:   medium,
      hardSolved:     hard,
      streak,
      totalActiveDays,
      submissionDays,
    })
  } catch (error) {
    console.error('LeetCode stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 })
  }
}
