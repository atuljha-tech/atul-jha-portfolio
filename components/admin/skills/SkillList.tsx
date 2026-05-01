'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Code2 } from 'lucide-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import { SortableList } from '@/components/admin/SortableList'
import toast from 'react-hot-toast'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

const categoryColors: Record<string, string> = {
  Frontend: 'text-blue-400 bg-blue-500/10',
  Backend: 'text-purple-400 bg-purple-500/10',
  Database: 'text-green-400 bg-green-500/10',
  Blockchain: 'text-orange-400 bg-orange-500/10',
  DevOps: 'text-red-400 bg-red-500/10',
  Tools: 'text-slate-400 bg-slate-500/10',
  Other: 'text-pink-400 bg-pink-500/10',
}

const barColors: Record<string, string> = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-purple-500 to-pink-500',
  Database: 'from-green-500 to-emerald-500',
  Blockchain: 'from-orange-500 to-yellow-500',
  DevOps: 'from-red-500 to-orange-500',
  Tools: 'from-slate-500 to-slate-400',
  Other: 'from-pink-500 to-rose-500',
}

export default function SkillList({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState(initialSkills)

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSkills((prev) => prev.filter((s) => s._id !== id))
      toast.success('Skill deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-400" />
            Skills Learned
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} —{' '}
            <span className="text-slate-500">drag ☰ to reorder</span>
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-20 bg-[#0D1424] rounded-2xl border border-slate-800/50">
          <Code2 className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-4">No skills yet</p>
          <Link
            href="/admin/skills/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Your First Skill
          </Link>
        </div>
      ) : (
        <SortableList
          items={skills}
          onReorder={setSkills}
          apiEndpoint="/api/skills"
          renderItem={(skill) => (
            <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                {skill.icon && <span className="text-xl shrink-0">{skill.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm text-white font-medium">{skill.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[skill.category] || categoryColors.Other}`}>
                      {skill.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono ml-auto">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-linear-to-r ${barColors[skill.category] || barColors.Other} rounded-full`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/skills/${skill._id}/edit`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <DeleteConfirm onConfirm={() => handleDelete(skill._id)} />
                </div>
              </div>
            </div>
          )}
        />
      )}
    </div>
  )
}
