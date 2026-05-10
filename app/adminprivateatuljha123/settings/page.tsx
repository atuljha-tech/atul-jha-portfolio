import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import AdminShell from '@/components/admin/AdminShell'
import SettingsForm from '@/components/admin/settings/SettingsForm'

export default async function SettingsPage() {
  const user = await getAuthUser()
  await connectDB()
  const rawSettings = await SiteSettings.findOne().lean()
  const settings = rawSettings || {}

  return (
    <AdminShell user={user!}>
      <SettingsForm initialData={JSON.parse(JSON.stringify(rawSettings || {}))} />
    </AdminShell>
  )
}
