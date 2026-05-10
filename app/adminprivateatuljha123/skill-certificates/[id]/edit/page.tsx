import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SkillCertificate from '@/models/SkillCertificate'
import AdminShell from '@/components/admin/AdminShell'
import SkillCertForm from '@/components/admin/skill-certs/SkillCertForm'
import { notFound } from 'next/navigation'

export default async function EditSkillCertPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  const { id } = await params
  await connectDB()
  const cert = await SkillCertificate.findById(id).lean()
  if (!cert) notFound()

  return (
    <AdminShell user={user!}>
      <SkillCertForm initialData={JSON.parse(JSON.stringify(cert))} />
    </AdminShell>
  )
}
