import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SkillCertificate from '@/models/SkillCertificate'
import AdminShell from '@/components/admin/AdminShell'
import SkillCertList from '@/components/admin/skill-certs/SkillCertList'

export default async function SkillCertsPage() {
  const user = await getAuthUser()
  await connectDB()
  const certs = await SkillCertificate.find().sort({ order: 1, date: -1 }).lean()

  return (
    <AdminShell user={user!}>
      <SkillCertList initialCerts={JSON.parse(JSON.stringify(certs))} />
    </AdminShell>
  )
}
