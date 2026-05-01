'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, ProjectInput } from '@/lib/validations'
import ImageUpload from '@/components/admin/ImageUpload'
import { Briefcase, ArrowLeft, Save, X, Plus } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Props {
  initialData?: ProjectInput & { _id?: string; image?: string }
}

const CATEGORIES = ['Blockchain', 'Web', 'AI/ML', 'Mobile', 'IoT', 'Cybersecurity', 'Other']

export default function ProjectForm({ initialData }: Props) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack || [])
  const isEdit = !!initialData?._id

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || { category: 'Web', featured: false, order: 0, techStack: [] },
  })

  const addTech = () => {
    const t = techInput.trim()
    if (t && !techStack.includes(t)) {
      const updated = [...techStack, t]
      setTechStack(updated)
      setValue('techStack', updated)
      setTechInput('')
    }
  }

  const removeTech = (tech: string) => {
    const updated = techStack.filter((t) => t !== tech)
    setTechStack(updated)
    setValue('techStack', updated)
  }

  const onSubmit = async (data: ProjectInput) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('techStack', JSON.stringify(techStack))
      formData.append('githubLink', data.githubLink || '')
      formData.append('liveLink', data.liveLink || '')
      formData.append('category', data.category)
      formData.append('featured', String(data.featured))
      formData.append('order', String(data.order || 0))
      if (imageFile) formData.append('image', imageFile)

      const url = isEdit ? `/api/projects/${initialData._id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: formData })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        return
      }

      toast.success(isEdit ? 'Project updated!' : 'Project added!')
      window.location.href = '/admin/projects'
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/projects"
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </Link>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-400" />
          {isEdit ? 'Edit Project' : 'Add Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input {...register('name')} placeholder="e.g. VeriTrust Pro" className="admin-input" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              placeholder="Describe your project..."
              className="admin-input resize-none"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tech Stack <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                placeholder="e.g. React, Node.js..."
                className="admin-input flex-1"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    <X className="w-3 h-3 text-slate-500 hover:text-red-400 transition-colors" />
                  </button>
                </span>
              ))}
            </div>
            {errors.techStack && (
              <p className="text-red-400 text-xs mt-1">{errors.techStack.message}</p>
            )}
          </div>

          {/* Category & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select {...register('category')} className="admin-input">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0D1424]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Featured</label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  {...register('featured')}
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-400">Show as featured project</span>
              </label>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Link</label>
              <input
                {...register('githubLink')}
                type="url"
                placeholder="https://github.com/..."
                className="admin-input"
              />
              {errors.githubLink && (
                <p className="text-red-400 text-xs mt-1">{errors.githubLink.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Live Link</label>
              <input
                {...register('liveLink')}
                type="url"
                placeholder="https://your-project.vercel.app"
                className="admin-input"
              />
              {errors.liveLink && (
                <p className="text-red-400 text-xs mt-1">{errors.liveLink.message}</p>
              )}
            </div>
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

          {/* Image */}
          <ImageUpload
            currentImage={initialData?.image}
            onFileSelect={setImageFile}
            label="Project Image"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Add Project'}
          </button>
          <Link
            href="/admin/projects"
            className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
