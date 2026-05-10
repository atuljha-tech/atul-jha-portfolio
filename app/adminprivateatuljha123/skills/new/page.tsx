import { getAuthUser } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'
import SkillForm from '@/components/admin/skills/SkillForm'

export default async function NewSkillPage() {
  const user = await getAuthUser()
  return (
    <AdminShell user={user!}>
      <SkillForm />
    </AdminShell>
  )
}
