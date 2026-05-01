import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import HackathonCertificate from '@/models/HackathonCertificate'
import { getTokenFromRequest } from '@/lib/auth'
import { hackathonCertificateSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const cert = await HackathonCertificate.findById(id)
    if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ certificate: cert })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    const existing = await HackathonCertificate.findById(id)
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const formData = await req.formData()
    const body = {
      title: formData.get('title') as string,
      order: Number(formData.get('order') || 0),
    }

    const parsed = hackathonCertificateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    let image = existing.image
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      image = await uploadFile(imageFile)
    }

    const cert = await HackathonCertificate.findByIdAndUpdate(
      id,
      { ...parsed.data, image },
      { new: true }
    )
    return NextResponse.json({ certificate: cert })
  } catch {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const { id } = await params
    await HackathonCertificate.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 })
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
    await HackathonCertificate.findByIdAndUpdate(id, { order })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
