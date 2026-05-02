import { Suspense } from 'react'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import Project from '@/models/Project'
import HackathonCertificate from '@/models/HackathonCertificate'
import SkillCertificate from '@/models/SkillCertificate'
import SkillLearned from '@/models/SkillLearned'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import SkillCertificates from '@/components/SkillCertificates'
import Skills from '@/components/Skills'
import Stats from '@/components/Stats'
import HackathonCertificates from '@/components/HackathonCertificates'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Cache for 5 minutes — good balance between freshness and speed
export const revalidate = 300

// ── Strip base64 image data from list — only keep metadata ──────────────────
// Base64 images are huge (500KB-2MB each). We strip them from the initial
// page load and load them lazily via a separate API call per image.
function stripImage<T extends { image?: string }>(item: T): T {
  const { image, ...rest } = item as any
  return {
    ...rest,
    // Keep a flag so the component knows an image exists, but don't send the data
    hasImage: !!image,
    // Only send image if it's a URL (not base64) — URLs are tiny
    image: image && !image.startsWith('data:') ? image : undefined,
  } as T
}

async function getData() {
  try {
    await connectDB()

    const [settings, projects, hackathonCerts, skillCerts, skills] = await Promise.all([
      SiteSettings.findOne()
        // Only fetch fields we actually use — skip aboutImage (base64)
        .select('heroName heroTitle heroSubtitle heroDescription githubUrl linkedinUrl twitterUrl email location cgpa batch college resumeUrl')
        .lean(),
      Project.find()
        .select('name description techStack githubLink liveLink category featured order image')
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .lean(),
      HackathonCertificate.find()
        .select('title image order')
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      SkillCertificate.find()
        .select('name platform date credentialUrl image order')
        .sort({ order: 1, date: -1 })
        .lean(),
      SkillLearned.find()
        .select('name category proficiency icon order')
        .sort({ category: 1, order: 1 })
        .lean(),
    ])

    return {
      settings: settings || {},
      // Strip base64 from projects and certs — load images lazily
      projects: (projects || []).map(stripImage),
      hackathonCerts: (hackathonCerts || []).map(stripImage),
      skillCerts: (skillCerts || []).map(stripImage),
      skills: skills || [],
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return { settings: {}, projects: [], hackathonCerts: [], skillCerts: [], skills: [] }
  }
}

export default async function Home() {
  const { settings, projects, hackathonCerts, skillCerts, skills } = await getData()

  const s  = JSON.parse(JSON.stringify(settings))
  const p  = JSON.parse(JSON.stringify(projects))
  const hc = JSON.parse(JSON.stringify(hackathonCerts))
  const sc = JSON.parse(JSON.stringify(skillCerts))
  const sk = JSON.parse(JSON.stringify(skills))

  return (
    <>
      <Navbar settings={s} />
      <main>
        {/* Above the fold — render immediately */}
        <Hero settings={s} />
        <About settings={s} />

        {/* Below the fold — wrapped in Suspense for streaming */}
        <Suspense fallback={null}>
          <Projects projects={p} />
        </Suspense>
        <Suspense fallback={null}>
          <SkillCertificates certificates={sc} />
        </Suspense>
        <Suspense fallback={null}>
          <Skills skills={sk} />
        </Suspense>
        <Suspense fallback={null}>
          {/* Stats fetches external APIs — fully deferred */}
          <Stats />
        </Suspense>
        <Suspense fallback={null}>
          <HackathonCertificates certificates={hc} />
        </Suspense>
        <Contact settings={s} />
      </main>
      <Footer settings={s} />
    </>
  )
}
