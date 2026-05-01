import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import Project from '@/models/Project'
import HackathonCertificate from '@/models/HackathonCertificate'
import SkillCertificate from '@/models/SkillCertificate'
import SkillLearned from '@/models/SkillLearned'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import HackathonCertificates from '@/components/HackathonCertificates'
import Projects from '@/components/Projects'
import SkillCertificates from '@/components/SkillCertificates'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 60 // ISR: revalidate every 60 seconds

async function getData() {
  try {
    await connectDB()
    const [settings, projects, hackathonCerts, skillCerts, skills] = await Promise.all([
      SiteSettings.findOne().lean(),
      // Exclude base64 image data from list queries — images load inline via src
      Project.find().select('-imagePublicId').sort({ featured: -1, order: 1, createdAt: -1 }).lean(),
      HackathonCertificate.find().select('-imagePublicId').sort({ order: 1, date: -1 }).lean(),
      SkillCertificate.find().select('-imagePublicId').sort({ order: 1, date: -1 }).lean(),
      SkillLearned.find().sort({ category: 1, order: 1 }).lean(),
    ])

    return {
      settings: settings || {},
      projects: projects || [],
      hackathonCerts: hackathonCerts || [],
      skillCerts: skillCerts || [],
      skills: skills || [],
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return {
      settings: {},
      projects: [],
      hackathonCerts: [],
      skillCerts: [],
      skills: [],
    }
  }
}

export default async function Home() {
  const { settings, projects, hackathonCerts, skillCerts, skills } = await getData()

  // Serialize mongoose documents
  const s = JSON.parse(JSON.stringify(settings))
  const p = JSON.parse(JSON.stringify(projects))
  const hc = JSON.parse(JSON.stringify(hackathonCerts))
  const sc = JSON.parse(JSON.stringify(skillCerts))
  const sk = JSON.parse(JSON.stringify(skills))

  return (
    <>
      <Navbar settings={s} />
      <main>
        <Hero settings={s} />
        <About settings={s} />
        <HackathonCertificates certificates={hc} />
        <Projects projects={p} />
        <SkillCertificates certificates={sc} />
        <Skills skills={sk} />
        <Contact settings={s} />
      </main>
      <Footer settings={s} />
    </>
  )
}
