'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { skillCertificateSchema, SkillCertificateInput } from '@/lib/validations'
import ImageUpload from '@/components/admin/ImageUpload'
import { Award, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Props {
  initialData?: SkillCertificateInput & { _id?: string; image?: string }
}

export default function SkillCertForm({ initialData }: Props) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const isEdit = !!initialData?._id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillCertificateInput>({
    resolver: zodResolver(skillCertificateSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        }
      : { order: 0 },
  })

  const onSubmit = async (data: SkillCertificateInput) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('platform', data.platform)
      formData.append('date', data.date)
      formData.append('credentialUrl', data.credentialUrl || '')
      formData.append('order', String(data.order ?? 0))
      if (imageFile) formData.append('image', imageFile)

      const url = isEdit
        ? `/api/skill-certificates/${initialData._id}`
        : '/api/skill-certificates'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: formData })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        console.error('Server error:', json)
        return
      }

      toast.success(isEdit ? 'Certificate updated!' : 'Certificate added!')
      window.location.href = '/admin/skill-certificates'
    } catch (err) {
      console.error('Submit error:', err)
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/skill-certificates"
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </Link>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-green-400" />
          {isEdit ? 'Edit Certificate' : 'Add Skill Certificate'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Certificate Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="e.g. React - The Complete Guide"
              className="admin-input"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Platform & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Platform <span className="text-red-400">*</span>
              </label>
              <input
                {...register('platform')}
                placeholder="e.g. Udemy, Coursera"
                className="admin-input"
              />
              {errors.platform && (
                <p className="text-red-400 text-xs mt-1">{errors.platform.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date <span className="text-red-400">*</span>
              </label>
              <input {...register('date')} type="date" className="admin-input" />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
            </div>
          </div>

          {/* Credential URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Credential URL</label>
            <input
              {...register('credentialUrl')}
              type="url"
              placeholder="https://credential-link.com"
              className="admin-input"
            />
            {errors.credentialUrl && (
              <p className="text-red-400 text-xs mt-1">{errors.credentialUrl.message}</p>
            )}
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
            <input
              {...register('order', { valueAsNumber: true })}
              type="number"
              min="0"
              placeholder="0"
              className="admin-input w-24"
            />
          </div>

          {/* Image or PDF */}
          <ImageUpload
            currentImage={initialData?.image}
            onFileSelect={setImageFile}
            label="Certificate File"
            accept="both"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : isEdit ? 'Update Certificate' : 'Add Certificate'}
          </button>
          <Link
            href="/admin/skill-certificates"
            className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
