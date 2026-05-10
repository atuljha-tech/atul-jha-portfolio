import { getAuthUser } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'
import HackathonForm from '@/components/admin/hackathons/HackathonForm'

export default async function NewHackathonPage() {
  const user = await getAuthUser()
  return (
    <AdminShell user={user!}>
      <HackathonForm />
    </AdminShell>
  )
}
