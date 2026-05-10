import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import HackathonCertificate from '@/models/HackathonCertificate'
import SkillCertificate from '@/models/SkillCertificate'
import SkillLearned from '@/models/SkillLearned'
import AdminShell from '@/components/admin/AdminShell'
import DashboardHome from '@/components/admin/DashboardHome'

export default async function AdminPage() {
  const user = await getAuthUser()

  await connectDB()
  const [projectCount, hackathonCount, skillCertCount, skillCount] = await Promise.all([
    Project.countDocuments(),
    HackathonCertificate.countDocuments(),
    SkillCertificate.countDocuments(),
    SkillLearned.countDocuments(),
  ])

  return (
    <AdminShell user={user!}>
      <DashboardHome
        stats={{
          projects: projectCount,
          hackathons: hackathonCount,
          skillCerts: skillCertCount,
          skills: skillCount,
        }}
      />
    </AdminShell>
  )
}
