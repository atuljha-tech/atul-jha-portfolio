import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

export const revalidate = 0 // always fresh

export async function GET() {
  try {
    await connectDB()
    const settings = await SiteSettings.findOne().select('resumePdf resumeFileName resumeUrl').lean() as any

    // Priority: uploaded PDF > external URL
    if (settings?.resumePdf && settings.resumePdf.startsWith('data:')) {
      const [header, base64] = settings.resumePdf.split(',')
      const mime = header.match(/data:([^;]+)/)?.[1] || 'application/pdf'
      const buffer = Buffer.from(base64, 'base64')
      const filename = settings.resumeFileName || 'resume.pdf'

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': mime,
          'Content-Disposition': `inline; filename="${filename}"`,
          'Cache-Control': 'no-cache',
          'Content-Length': buffer.length.toString(),
        },
      })
    }

    if (settings?.resumeUrl) {
      return NextResponse.redirect(settings.resumeUrl)
    }

    return NextResponse.json({ error: 'No resume uploaded' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
