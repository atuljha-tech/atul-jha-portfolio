'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { siteSettingsSchema, SiteSettingsInput } from '@/lib/validations'
import { Settings, Save, FileText, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
  initialData: SiteSettingsInput & { resumeFileName?: string; hasResumePdf?: boolean }
}

export default function SettingsForm({ initialData }: Props) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      heroName:        initialData.heroName        || 'Atul Jha',
      heroTitle:       initialData.heroTitle       || 'Full Stack Developer',
      heroSubtitle:    initialData.heroSubtitle    || '',
      heroDescription: initialData.heroDescription || '',
      aboutText:       initialData.aboutText       || '',
      resumeUrl:       initialData.resumeUrl       || '',
      githubUrl:       initialData.githubUrl       || '',
      linkedinUrl:     initialData.linkedinUrl     || '',
      twitterUrl:      initialData.twitterUrl      || '',
      email:           initialData.email           || '',
      location:        initialData.location        || '',
      cgpa:            initialData.cgpa            || '',
      batch:           initialData.batch           || '',
      college:         initialData.college         || '',
    },
  })

  const onSubmit = async (data: SiteSettingsInput) => {
    setLoading(true)
    try {
      const formData = new FormData()

      // Append all text fields explicitly
      formData.append('heroName',        data.heroName)
      formData.append('heroTitle',       data.heroTitle)
      formData.append('heroSubtitle',    data.heroSubtitle    || '')
      formData.append('heroDescription', data.heroDescription || '')
      formData.append('aboutText',       data.aboutText       || '')
      formData.append('resumeUrl',       data.resumeUrl       || '')
      formData.append('githubUrl',       data.githubUrl       || '')
      formData.append('linkedinUrl',     data.linkedinUrl     || '')
      formData.append('twitterUrl',      data.twitterUrl      || '')
      formData.append('email',           data.email           || '')
      formData.append('location',        data.location        || '')
      formData.append('cgpa',            data.cgpa            || '')
      formData.append('batch',           data.batch           || '')
      formData.append('college',         data.college         || '')

      if (resumeFile) formData.append('resumePdf', resumeFile)

      const res = await fetch('/api/settings', { method: 'PUT', body: formData })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        console.error('Settings save error:', json)
        return
      }

      toast.success('Settings saved!')
      window.location.reload()
    } catch (err) {
      console.error('Submit error:', err)
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
    label, name, type = 'text', placeholder, required, textarea, rows,
  }: {
    label: string; name: keyof SiteSettingsInput; type?: string
    placeholder?: string; required?: boolean; textarea?: boolean; rows?: number
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea {...register(name)} rows={rows || 3} placeholder={placeholder} className="admin-input resize-none" />
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
        <p className="text-slate-400 text-sm mt-1">Update your portfolio content and personal information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Hero */}
        <Section title="HERO SECTION">
          <Field label="Your Name"       name="heroName"        placeholder="Atul Jha"                    required />
          <Field label="Title / Role"    name="heroTitle"       placeholder="Full Stack Developer"         required />
          <Field label="Subtitle"        name="heroSubtitle"    placeholder="Aspiring Full-Stack Developer" />
          <Field label="Hero Description" name="heroDescription" placeholder="Brief intro shown in the hero section..." textarea rows={3} />
        </Section>

        {/* About */}
        <Section title="ABOUT SECTION">
          <Field label="About Text" name="aboutText" placeholder="Tell visitors about yourself..." textarea rows={5} />
          <div className="grid grid-cols-3 gap-4">
            <Field label="CGPA"     name="cgpa"     placeholder="8.9" />
            <Field label="Batch"    name="batch"    placeholder="2024-2028" />
            <Field label="Location" name="location" placeholder="Kolkata, India" />
          </div>
          <Field label="College" name="college" placeholder="Heritage Institute of Technology" />
        </Section>

        {/* Links */}
        <Section title="LINKS & SOCIAL">
          <Field label="Email"        name="email"       type="email" placeholder="you@example.com" />
          <Field label="GitHub URL"   name="githubUrl"   type="url"   placeholder="https://github.com/username" />
          <Field label="LinkedIn URL" name="linkedinUrl" type="url"   placeholder="https://linkedin.com/in/username" />
          <Field label="Twitter URL"  name="twitterUrl"  type="url"   placeholder="https://twitter.com/username" />
          <Field label="Resume URL (external link, optional)" name="resumeUrl" type="url" placeholder="https://drive.google.com/..." />
        </Section>

        {/* Resume PDF Upload */}
        <Section title="RESUME PDF">
          <p className="text-xs text-slate-500">
            Upload your resume PDF. Visitors can view it in a popup and download it.
            Uploading a new file replaces the old one.
          </p>

          {/* Current resume */}
          {initialData.hasResumePdf && !resumeFile && (
            <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-green-300 font-medium">Resume uploaded</p>
                <p className="text-xs text-green-600 truncate">{initialData.resumeFileName || 'resume.pdf'}</p>
              </div>
              <a href="/api/resume" target="_blank" rel="noopener noreferrer"
                className="text-xs text-green-400 hover:text-green-300 transition-colors shrink-0">
                Preview ↗
              </a>
            </div>
          )}

          {/* New file selected */}
          {resumeFile && (
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <FileText className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-blue-300 font-medium">Ready to upload</p>
                <p className="text-xs text-blue-600 truncate">{resumeFile.name}</p>
              </div>
              <button type="button" onClick={() => setResumeFile(null)}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors shrink-0">
                Remove
              </button>
            </div>
          )}

          {/* File picker */}
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/30 cursor-pointer transition-all">
            <FileText className="w-5 h-5 text-slate-500" />
            <div>
              <p className="text-sm text-slate-300 font-medium">
                {resumeFile ? 'Change PDF' : 'Upload Resume PDF'}
              </p>
              <p className="text-xs text-slate-600">PDF only, max 5MB</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                if (file.type !== 'application/pdf') { toast.error('Only PDF files allowed'); return }
                if (file.size > 5 * 1024 * 1024) { toast.error('File must be under 5MB'); return }
                setResumeFile(file)
              }}
            />
          </label>
        </Section>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
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
