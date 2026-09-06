import { connectDB } from '@/lib/mongodb'
import SkillCertificate from '@/models/SkillCertificate'
import SiteSettings from '@/models/SiteSettings'
import Navbar from '@/components/Navbar'
import SkillCertificates from '@/components/SkillCertificates'
import Footer from '@/components/Footer'
import { fallbackSkillCerts } from '@/lib/fallbackData'

export const revalidate = 300

function stripImage<T extends { image?: string }>(item: T): T {
  const { image, ...rest } = item as any
  return {
    ...rest,
    hasImage: !!image,
    image: image && !image.startsWith('data:') ? image : undefined,
  } as T
}

async function getSkillCertsData() {
  try {
    await connectDB()
    const [settings, skillCerts] = await Promise.all([
      SiteSettings.findOne().select('heroName resumeUrl').lean(),
      SkillCertificate.find().select('name platform date credentialUrl image order').sort({ order: 1, date: -1 }).lean(),
    ])
    const cleaned = (skillCerts || []).map(stripImage)
    return {
      settings: settings || {},
      skillCerts: cleaned.length > 0 ? cleaned : fallbackSkillCerts,
    }
  } catch (error) {
    console.error('Failed to load skill certs page data:', error)
    return { settings: {}, skillCerts: fallbackSkillCerts }
  }
}

export default async function SkillCertsPage() {
  const { settings, skillCerts } = await getSkillCertsData()
  const s = JSON.parse(JSON.stringify(settings))
  const sc = JSON.parse(JSON.stringify(skillCerts))

  return (
    <>
      <Navbar settings={s} />
      <main className="pt-20">
        <SkillCertificates certificates={sc} />
      </main>
      <Footer settings={s} />
    </>
  )
}
