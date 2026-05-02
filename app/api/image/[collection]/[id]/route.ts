import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import HackathonCertificate from '@/models/HackathonCertificate'
import SkillCertificate from '@/models/SkillCertificate'
import SiteSettings from '@/models/SiteSettings'

// Cache image responses for 1 hour
export const revalidate = 3600

const modelMap: Record<string, any> = {
  projects: Project,
  hackathons: HackathonCertificate,
  'skill-certs': SkillCertificate,
  settings: SiteSettings,
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params
    const Model = modelMap[collection]
    if (!Model) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await connectDB()
    const doc = await Model.findById(id).select('image').lean() as any
    if (!doc?.image) return NextResponse.json({ error: 'No image' }, { status: 404 })

    // If it's a base64 data URI, convert to binary response
    if (doc.image.startsWith('data:')) {
      const [header, base64] = doc.image.split(',')
      const mimeMatch = header.match(/data:([^;]+)/)
      const mime = mimeMatch?.[1] || 'image/jpeg'
      const buffer = Buffer.from(base64, 'base64')

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          'Content-Length': buffer.length.toString(),
        },
      })
    }

    // If it's a URL, redirect
    return NextResponse.redirect(doc.image)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
