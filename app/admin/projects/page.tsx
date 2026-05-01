import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import AdminShell from '@/components/admin/AdminShell'
import ProjectList from '@/components/admin/projects/ProjectList'

export default async function ProjectsPage() {
  const user = await getAuthUser()
  await connectDB()
  const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 }).lean()

  return (
    <AdminShell user={user!}>
      <ProjectList initialProjects={JSON.parse(JSON.stringify(projects))} />
    </AdminShell>
  )
}
