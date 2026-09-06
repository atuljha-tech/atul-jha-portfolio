import { connectDB } from '@/lib/mongodb'
import SkillLearned from '@/models/SkillLearned'
import SiteSettings from '@/models/SiteSettings'
import Navbar from '@/components/Navbar'
import Skills from '@/components/Skills'
import Footer from '@/components/Footer'
import { fallbackSkills } from '@/lib/fallbackData'

export const revalidate = 300

async function getSkillsData() {
  try {
    await connectDB()
    const [settings, skills] = await Promise.all([
      SiteSettings.findOne().select('heroName resumeUrl').lean(),
      SkillLearned.find().select('name category proficiency icon order').sort({ category: 1, order: 1 }).lean(),
    ])
    return {
      settings: settings || {},
      skills: (skills && skills.length > 0) ? skills : fallbackSkills,
    }
  } catch (error) {
    console.error('Failed to load skills page data:', error)
    return { settings: {}, skills: fallbackSkills }
  }
}

export default async function SkillsPage() {
  const { settings, skills } = await getSkillsData()
  const s = JSON.parse(JSON.stringify(settings))
  const sk = JSON.parse(JSON.stringify(skills))

  return (
    <>
      <Navbar settings={s} />
      <main className="pt-20">
        <Skills skills={sk} />
      </main>
      <Footer settings={s} />
    </>
  )
}
