'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Code2 } from 'lucide-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import toast from 'react-hot-toast'

interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

const categoryColors: Record<string, string> = {
  Frontend: 'text-blue-400',
  Backend: 'text-purple-400',
  Database: 'text-green-400',
  Blockchain: 'text-orange-400',
  DevOps: 'text-red-400',
  Tools: 'text-slate-400',
  Other: 'text-pink-400',
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

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-400" />
            Skills Learned
          </h1>
          <p className="text-slate-400 text-sm mt-1">{skills.length} skill{skills.length !== 1 ? 's' : ''}</p>
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
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category} className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-5">
              <h2 className={`text-sm font-bold mb-4 font-mono ${categoryColors[category] || 'text-slate-400'}`}>
                {category.toUpperCase()} ({categorySkills.length})
              </h2>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    {skill.icon && <span className="text-lg shrink-0">{skill.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{skill.name}</span>
                        <span className="text-xs text-slate-400 font-mono">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
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
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
