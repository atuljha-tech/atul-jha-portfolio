import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import { getTokenFromRequest } from '@/lib/auth'
import { siteSettingsSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne()
    if (!settings) settings = await SiteSettings.create({})
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = getTokenFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectDB()
    const formData = await req.formData()

    const body = {
      heroName: formData.get('heroName') as string,
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: (formData.get('heroSubtitle') as string) || '',
      heroDescription: (formData.get('heroDescription') as string) || '',
      aboutText: (formData.get('aboutText') as string) || '',
      resumeUrl: (formData.get('resumeUrl') as string) || '',
      githubUrl: (formData.get('githubUrl') as string) || '',
      linkedinUrl: (formData.get('linkedinUrl') as string) || '',
      twitterUrl: (formData.get('twitterUrl') as string) || '',
      email: (formData.get('email') as string) || '',
      location: (formData.get('location') as string) || '',
      cgpa: (formData.get('cgpa') as string) || '',
      batch: (formData.get('batch') as string) || '',
      college: (formData.get('college') as string) || '',
    }

    const parsed = siteSettingsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    let existing = await SiteSettings.findOne()
    if (!existing) existing = new SiteSettings({})

    let aboutImage = existing.aboutImage

    const imageFile = formData.get('aboutImage') as File | null
    if (imageFile && imageFile.size > 0) {
      aboutImage = await uploadFile(imageFile)
    }

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { ...parsed.data, aboutImage },
      { new: true, upsert: true }
    )
    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    )
  }
}
