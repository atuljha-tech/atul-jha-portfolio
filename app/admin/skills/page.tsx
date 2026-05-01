import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SkillLearned from '@/models/SkillLearned'
import AdminShell from '@/components/admin/AdminShell'
import SkillList from '@/components/admin/skills/SkillList'

export default async function SkillsPage() {
  const user = await getAuthUser()
  await connectDB()
  const skills = await SkillLearned.find().sort({ category: 1, order: 1 }).lean()

  return (
    <AdminShell user={user!}>
      <SkillList initialSkills={JSON.parse(JSON.stringify(skills))} />
    </AdminShell>
  )
}
