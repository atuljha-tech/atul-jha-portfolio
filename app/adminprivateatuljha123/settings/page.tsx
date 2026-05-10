import { getAuthUser } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import AdminShell from '@/components/admin/AdminShell'
import SettingsForm from '@/components/admin/settings/SettingsForm'

export default async function SettingsPage() {
  const user = await getAuthUser()
  await connectDB()

  // Fetch settings without the huge base64 fields
  const rawSettings = await SiteSettings.findOne()
    .select('-resumePdf -aboutImage -aboutImagePublicId')
    .lean() as any

  // Separately check if a resume PDF exists (without fetching the data)
  const resumeCheck = await SiteSettings.findOne({ resumePdf: { $exists: true } })
    .select('resumePdf resumeFileName')
    .lean() as any

  const hasResumePdf = !!(resumeCheck?.resumePdf)

  return (
    <AdminShell user={user!}>
      <SettingsForm
        initialData={{
          ...JSON.parse(JSON.stringify(rawSettings || {})),
          hasResumePdf,
          resumeFileName: resumeCheck?.resumeFileName || '',
        }}
      />
    </AdminShell>
  )
}
