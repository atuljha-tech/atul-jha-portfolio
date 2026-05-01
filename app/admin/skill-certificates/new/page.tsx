import { getAuthUser } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'
import SkillCertForm from '@/components/admin/skill-certs/SkillCertForm'

export default async function NewSkillCertPage() {
  const user = await getAuthUser()
  return (
    <AdminShell user={user!}>
      <SkillCertForm />
    </AdminShell>
  )
}
