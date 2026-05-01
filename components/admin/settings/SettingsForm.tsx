'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { siteSettingsSchema, SiteSettingsInput } from '@/lib/validations'
import ImageUpload from '@/components/admin/ImageUpload'
import { Settings, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  initialData: SiteSettingsInput & { aboutImage?: string }
}

export default function SettingsForm({ initialData }: Props) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      heroName: initialData.heroName || 'Atul Jha',
      heroTitle: initialData.heroTitle || 'Full Stack Developer',
      heroSubtitle: initialData.heroSubtitle || '',
      heroDescription: initialData.heroDescription || '',
      aboutText: initialData.aboutText || '',
      resumeUrl: initialData.resumeUrl || '',
      githubUrl: initialData.githubUrl || '',
      linkedinUrl: initialData.linkedinUrl || '',
      twitterUrl: initialData.twitterUrl || '',
      email: initialData.email || '',
      location: initialData.location || '',
      cgpa: initialData.cgpa || '',
      batch: initialData.batch || '',
      college: initialData.college || '',
    },
  })

  const onSubmit = async (data: SiteSettingsInput) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v))
      })
      if (imageFile) formData.append('aboutImage', imageFile)

      const res = await fetch('/api/settings', { method: 'PUT', body: formData })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        return
      }

      toast.success('Settings saved!')
      window.location.reload()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
      <h2 className="text-sm font-bold text-slate-300 font-mono mb-5 pb-3 border-b border-slate-800">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  )

  const Field = ({
    label,
    name,
    type = 'text',
    placeholder,
    required,
    textarea,
    rows,
  }: {
    label: string
    name: keyof SiteSettingsInput
    type?: string
    placeholder?: string
    required?: boolean
    textarea?: boolean
    rows?: number
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          {...register(name)}
          rows={rows || 3}
          placeholder={placeholder}
          className="admin-input resize-none"
        />
      ) : (
        <input {...register(name)} type={type} placeholder={placeholder} className="admin-input" />
      )}
      {errors[name] && (
        <p className="text-red-400 text-xs mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-400" />
          Site Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Update your portfolio content and personal information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Hero Section */}
        <Section title="HERO SECTION">
          <Field label="Your Name" name="heroName" placeholder="Atul Jha" required />
          <Field label="Title / Role" name="heroTitle" placeholder="Full Stack Developer" required />
          <Field label="Subtitle" name="heroSubtitle" placeholder="Aspiring Full-Stack Developer" />
          <Field
            label="Hero Description"
            name="heroDescription"
            placeholder="Brief intro shown in the hero section..."
            textarea
            rows={3}
          />
        </Section>

        {/* About Section */}
        <Section title="ABOUT SECTION">
          <Field
            label="About Text"
            name="aboutText"
            placeholder="Tell visitors about yourself..."
            textarea
            rows={5}
          />
          <div className="grid grid-cols-3 gap-4">
            <Field label="CGPA" name="cgpa" placeholder="8.9" />
            <Field label="Batch" name="batch" placeholder="2024-2028" />
            <Field label="Location" name="location" placeholder="Kolkata, India" />
          </div>
          <Field label="College" name="college" placeholder="Heritage Institute of Technology" />
          <ImageUpload
            currentImage={initialData.aboutImage}
            onFileSelect={setImageFile}
            label="Profile / About Image"
          />
        </Section>

        {/* Links */}
        <Section title="LINKS & SOCIAL">
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <Field label="GitHub URL" name="githubUrl" type="url" placeholder="https://github.com/username" />
          <Field label="LinkedIn URL" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/username" />
          <Field label="Twitter URL" name="twitterUrl" type="url" placeholder="https://twitter.com/username" />
          <Field label="Resume URL" name="resumeUrl" type="url" placeholder="https://drive.google.com/..." />
        </Section>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
