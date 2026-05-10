import { getAuthUser } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'
import ProjectForm from '@/components/admin/projects/ProjectForm'

export default async function NewProjectPage() {
  const user = await getAuthUser()
  return (
    <AdminShell user={user!}>
      <ProjectForm />
    </AdminShell>
  )
}
