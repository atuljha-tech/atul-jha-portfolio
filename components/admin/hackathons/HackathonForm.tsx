'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { hackathonCertificateSchema, HackathonCertificateInput } from '@/lib/validations'
import ImageUpload from '@/components/admin/ImageUpload'
import { Trophy, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Props {
  initialData?: HackathonCertificateInput & { _id?: string; image?: string }
}

export default function HackathonForm({ initialData }: Props) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const isEdit = !!initialData?._id

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HackathonCertificateInput>({
    resolver: zodResolver(hackathonCertificateSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: initialData.date
            ? new Date(initialData.date).toISOString().split('T')[0]
            : '',
        }
      : { order: 0 },
  })

  const onSubmit = async (data: HackathonCertificateInput) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('organization', data.organization)
      formData.append('position', data.position)
      formData.append('date', data.date)
      formData.append('description', data.description || '')
      formData.append('proofLink', data.proofLink || '')
      formData.append('order', String(data.order ?? 0))
      if (imageFile) formData.append('image', imageFile)

      const url = isEdit
        ? `/api/hackathon-certificates/${initialData._id}`
        : '/api/hackathon-certificates'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: formData })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        console.error('Server error:', json)
        return
      }

      toast.success(isEdit ? 'Certificate updated!' : 'Certificate added!')
      window.location.href = '/admin/hackathons'
    } catch (err) {
      console.error('Submit error:', err)
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/hackathons"
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            {isEdit ? 'Edit Certificate' : 'Add Hackathon Certificate'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              {...register('title')}
              placeholder="e.g. Smart India Hackathon 2024"
              className="admin-input"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Organization <span className="text-red-400">*</span>
            </label>
            <input
              {...register('organization')}
              placeholder="e.g. Ministry of Education, India"
              className="admin-input"
            />
            {errors.organization && (
              <p className="text-red-400 text-xs mt-1">{errors.organization.message}</p>
            )}
          </div>

          {/* Position & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Position / Rank <span className="text-red-400">*</span>
              </label>
              <input
                {...register('position')}
                placeholder="e.g. 1st Place, Finalist"
                className="admin-input"
              />
              {errors.position && (
                <p className="text-red-400 text-xs mt-1">{errors.position.message}</p>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Brief description of the hackathon and your achievement..."
              className="admin-input resize-none"
            />
          </div>

          {/* Proof Link */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Proof Link</label>
            <input
              {...register('proofLink')}
              type="url"
              placeholder="https://certificate-link.com"
              className="admin-input"
            />
            {errors.proofLink && (
              <p className="text-red-400 text-xs mt-1">{errors.proofLink.message}</p>
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

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : isEdit ? 'Update Certificate' : 'Add Certificate'}
          </button>
          <Link
            href="/admin/hackathons"
            className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
