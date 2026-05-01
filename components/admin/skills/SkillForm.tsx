'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { skillLearnedSchema, SkillLearnedInput } from '@/lib/validations'
import { Code2, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Props {
  initialData?: SkillLearnedInput & { _id?: string }
}

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Blockchain', 'DevOps', 'Tools', 'Other']

export default function SkillForm({ initialData }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isEdit = !!initialData?._id

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SkillLearnedInput>({
    resolver: zodResolver(skillLearnedSchema),
    defaultValues: initialData || { category: 'Frontend', proficiency: 50, order: 0 },
  })

  const proficiency = watch('proficiency')

  const onSubmit = async (data: SkillLearnedInput) => {
    setLoading(true)
    try {
      const url = isEdit ? `/api/skills/${initialData._id}` : '/api/skills'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error || 'Failed to save')
        return
      }

      toast.success(isEdit ? 'Skill updated!' : 'Skill added!')
      window.location.href = '/admin/skills'
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/skills"
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
        </Link>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-400" />
          {isEdit ? 'Edit Skill' : 'Add Skill'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Skill Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="e.g. React, Node.js, Solidity"
              className="admin-input"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Category */}
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

          {/* Proficiency */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Proficiency: <span className="text-purple-400 font-mono">{proficiency}%</span>
            </label>
            <input
              {...register('proficiency', { valueAsNumber: true })}
              type="range"
              min="0"
              max="100"
              step="5"
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            {errors.proficiency && (
              <p className="text-red-400 text-xs mt-1">{errors.proficiency.message}</p>
            )}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Icon (emoji)
            </label>
            <input
              {...register('icon')}
              placeholder="e.g. ⚛️ 🔧 🗄️"
              className="admin-input w-32"
              maxLength={4}
            />
            <p className="text-xs text-slate-500 mt-1">Optional emoji icon for the skill</p>
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
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving...' : isEdit ? 'Update Skill' : 'Add Skill'}
          </button>
          <Link
            href="/admin/skills"
            className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
