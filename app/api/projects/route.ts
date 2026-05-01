import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import { getTokenFromRequest } from '@/lib/auth'
import { projectSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 })
    return NextResponse.json({ projects })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
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

    let image: string | undefined
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      image = await uploadFile(imageFile)
    }

    const project = await Project.create({ ...parsed.data, image })
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}
