import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SkillLearned from '@/models/SkillLearned'
import { getTokenFromRequest } from '@/lib/auth'
import { skillLearnedSchema } from '@/lib/validations'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const skill = await SkillLearned.findById(id)
    if (!skill) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ skill })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()

    const parsed = skillLearnedSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const skill = await SkillLearned.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!skill) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ skill })
  } catch (error) {
    console.error('Update skill error:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    const skill = await SkillLearned.findByIdAndDelete(id)
    if (!skill) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}

// PATCH — update order only (used by drag-to-reorder)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    const { order } = await req.json()
    await SkillLearned.findByIdAndUpdate(id, { order })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
