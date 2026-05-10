import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import AdminShell from '@/components/admin/AdminShell'
import ProjectForm from '@/components/admin/projects/ProjectForm'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  const { id } = await params
  await connectDB()
  const project = await Project.findById(id).lean()
  if (!project) notFound()

  return (
    <AdminShell user={user!}>
      <ProjectForm initialData={JSON.parse(JSON.stringify(project))} />
    </AdminShell>
  )
}
