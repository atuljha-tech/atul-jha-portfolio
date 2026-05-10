import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import { getTokenFromRequest } from '@/lib/auth'
import { siteSettingsSchema } from '@/lib/validations'
import { uploadFile } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne().select('-resumePdf -aboutImage')
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
      heroName:        (formData.get('heroName')        as string) || '',
      heroTitle:       (formData.get('heroTitle')       as string) || '',
      heroSubtitle:    (formData.get('heroSubtitle')    as string) || '',
      heroDescription: (formData.get('heroDescription') as string) || '',
      aboutText:       (formData.get('aboutText')       as string) || '',
      resumeUrl:       (formData.get('resumeUrl')       as string) || '',
      githubUrl:       (formData.get('githubUrl')       as string) || '',
      linkedinUrl:     (formData.get('linkedinUrl')     as string) || '',
      twitterUrl:      (formData.get('twitterUrl')      as string) || '',
      email:           (formData.get('email')           as string) || '',
      location:        (formData.get('location')        as string) || '',
      cgpa:            (formData.get('cgpa')            as string) || '',
      batch:           (formData.get('batch')           as string) || '',
      college:         (formData.get('college')         as string) || '',
    }

    const parsed = siteSettingsSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      console.error('Validation error:', parsed.error.errors)
      return NextResponse.json(
        { error: `${firstError.path.join('.')}: ${firstError.message}` },
        { status: 400 }
      )
    }

    let existing = await SiteSettings.findOne()
    if (!existing) existing = new SiteSettings({})

    // Keep existing resumePdf unless a new one is uploaded
    let resumePdf = existing.resumePdf
    let resumeFileName = existing.resumeFileName

    const resumeFile = formData.get('resumePdf') as File | null
    if (resumeFile && resumeFile.size > 0) {
      resumePdf = await uploadFile(resumeFile)
      resumeFileName = resumeFile.name
    }

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { ...parsed.data, resumePdf, resumeFileName },
      { new: true, upsert: true }
    )

    return NextResponse.json({ success: true, settings: { heroName: settings.heroName } })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    )
  }
}
