import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SkillLearned from '@/models/SkillLearned'
import { getTokenFromRequest } from '@/lib/auth'
import { skillLearnedSchema } from '@/lib/validations'

export async function GET() {
  try {
    await connectDB()
    const skills = await SkillLearned.find().sort({ category: 1, order: 1 })
    return NextResponse.json({ skills })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const body = await req.json()

    const parsed = skillLearnedSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const skill = await SkillLearned.create(parsed.data)
    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    console.error('Create skill error:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
