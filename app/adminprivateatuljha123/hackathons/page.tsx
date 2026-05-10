import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import HackathonCertificate from '@/models/HackathonCertificate'
import AdminShell from '@/components/admin/AdminShell'
import HackathonList from '@/components/admin/hackathons/HackathonList'

export default async function HackathonsPage() {
  const user = await getAuthUser()
  await connectDB()
  const certs = await HackathonCertificate.find().sort({ order: 1, date: -1 }).lean()

  return (
    <AdminShell user={user!}>
      <HackathonList initialCerts={JSON.parse(JSON.stringify(certs))} />
    </AdminShell>
  )
}
