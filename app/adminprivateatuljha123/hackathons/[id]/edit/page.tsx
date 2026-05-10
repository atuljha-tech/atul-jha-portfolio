import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import HackathonCertificate from '@/models/HackathonCertificate'
import AdminShell from '@/components/admin/AdminShell'
import HackathonForm from '@/components/admin/hackathons/HackathonForm'
import { notFound } from 'next/navigation'

export default async function EditHackathonPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser()
  const { id } = await params
  await connectDB()
  const cert = await HackathonCertificate.findById(id).lean()
  if (!cert) notFound()

  return (
    <AdminShell user={user!}>
      <HackathonForm initialData={JSON.parse(JSON.stringify(cert))} />
    </AdminShell>
  )
}
