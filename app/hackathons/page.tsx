import { connectDB } from '@/lib/mongodb'
import HackathonCertificate from '@/models/HackathonCertificate'
import SiteSettings from '@/models/SiteSettings'
import Navbar from '@/components/Navbar'
import HackathonCertificates from '@/components/HackathonCertificates'
import Footer from '@/components/Footer'
import { fallbackHackathonCerts } from '@/lib/fallbackData'

export const revalidate = 300

function stripImage<T extends { image?: string }>(item: T): T {
  const { image, ...rest } = item as any
  return {
    ...rest,
    hasImage: !!image,
    image: image && !image.startsWith('data:') ? image : undefined,
  } as T
}

async function getHackathonsData() {
  try {
    await connectDB()
    const [settings, hackathonCerts] = await Promise.all([
      SiteSettings.findOne().select('heroName resumeUrl').lean(),
      HackathonCertificate.find().select('title image order').sort({ order: 1, createdAt: -1 }).lean(),
    ])
    const cleaned = (hackathonCerts || []).map(stripImage)
    return {
      settings: settings || {},
      hackathonCerts: cleaned.length > 0 ? cleaned : fallbackHackathonCerts,
    }
  } catch (error) {
    console.error('Failed to load hackathons page data:', error)
    return { settings: {}, hackathonCerts: fallbackHackathonCerts }
  }
}

export default async function HackathonsPage() {
  const { settings, hackathonCerts } = await getHackathonsData()
  const s = JSON.parse(JSON.stringify(settings))
  const hc = JSON.parse(JSON.stringify(hackathonCerts))

  return (
    <>
      <Navbar settings={s} />
      <main className="pt-20">
        <HackathonCertificates certificates={hc} />
      </main>
      <Footer settings={s} />
    </>
  )
}
