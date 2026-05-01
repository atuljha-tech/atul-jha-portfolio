import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SkillLearned from '@/models/SkillLearned'
import AdminShell from '@/components/admin/AdminShell'
import SkillForm from '@/components/admin/skills/SkillForm'
import { notFound } from 'next/navigation'

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  const { id } = await params
  await connectDB()
  const skill = await SkillLearned.findById(id).lean()
  if (!skill) notFound()

  return (
    <AdminShell user={user!}>
      <SkillForm initialData={JSON.parse(JSON.stringify(skill))} />
    </AdminShell>
  )
}
