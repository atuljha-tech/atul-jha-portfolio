import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import { getTokenFromRequest } from '@/lib/auth'
import { projectSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const project = await Project.findById(id)
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ project })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    const existing = await Project.findById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const formData = await req.formData()
    const body = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      techStack: JSON.parse((formData.get('techStack') as string) || '[]'),
      githubLink: (formData.get('githubLink') as string) || '',
      liveLink: (formData.get('liveLink') as string) || '',
      category: formData.get('category') as string,
      featured: formData.get('featured') === 'true',
      order: Number(formData.get('order') || 0),
    }

    const parsed = projectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    let image = existing.image
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      image = await uploadFile(imageFile)
    }

    const project = await Project.findByIdAndUpdate(id, { ...parsed.data, image }, { new: true })
    return NextResponse.json({ project })
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
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
    await Project.findByIdAndUpdate(id, { order })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    await Project.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
