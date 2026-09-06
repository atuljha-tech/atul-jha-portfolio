import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import SiteSettings from '@/models/SiteSettings'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import { fallbackProjects } from '@/lib/fallbackData'

export const revalidate = 300

function stripImage<T extends { image?: string }>(item: T): T {
  const { image, ...rest } = item as any
  return {
    ...rest,
    hasImage: !!image,
    image: image && !image.startsWith('data:') ? image : undefined,
  } as T
}

async function getProjectsData() {
  try {
    await connectDB()
    const [settings, projects] = await Promise.all([
      SiteSettings.findOne().select('heroName resumeUrl').lean(),
      Project.find().select('name description techStack githubLink liveLink category featured order image').sort({ featured: -1, order: 1, createdAt: -1 }).lean(),
    ])
    const cleaned = (projects || []).map(stripImage)
    return {
      settings: settings || {},
      projects: cleaned.length > 0 ? cleaned : fallbackProjects,
    }
  } catch (error) {
    console.error('Failed to load projects page data:', error)
    return { settings: {}, projects: fallbackProjects }
  }
}

export default async function ProjectsPage() {
  const { settings, projects } = await getProjectsData()
  const s = JSON.parse(JSON.stringify(settings))
  const p = JSON.parse(JSON.stringify(projects))

  return (
    <>
      <Navbar settings={s} />
      <main className="pt-20">
        <Projects projects={p} />
      </main>
      <Footer settings={s} />
    </>
  )
}
