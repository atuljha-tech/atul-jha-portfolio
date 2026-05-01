import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SkillCertificate from '@/models/SkillCertificate'
import { getTokenFromRequest } from '@/lib/auth'
import { skillCertificateSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    const certs = await SkillCertificate.find().sort({ order: 1, date: -1 })
    return NextResponse.json({ certificates: certs })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
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
      platform: formData.get('platform') as string,
      date: formData.get('date') as string,
      credentialUrl: (formData.get('credentialUrl') as string) || '',
      order: Number(formData.get('order') || 0),
    }

    const parsed = skillCertificateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    let image: string | undefined
    const imageFile = formData.get('image') as File | null
    if (imageFile && imageFile.size > 0) {
      image = await uploadFile(imageFile)
    }

    const cert = await SkillCertificate.create({
      ...parsed.data,
      date: new Date(parsed.data.date),
      image,
    })
    return NextResponse.json({ certificate: cert }, { status: 201 })
  } catch (error) {
    console.error('Create skill cert error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create certificate' },
      { status: 500 }
    )
  }
}
