'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Briefcase, Star, Tag } from 'lucide-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import toast from 'react-hot-toast'

interface Project {
  _id: string
  name: string
  description: string
  techStack: string[]
  category: string
  featured: boolean
  image?: string
}

export default function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects)

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== id))
      toast.success('Project deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            Projects
          </h1>
          <p className="text-slate-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-[#0D1424] rounded-2xl border border-slate-800/50">
          <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-4">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                {project.image && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold truncate">{project.name}</h3>
                        {project.featured && (
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">{project.category}</span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-1 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-500">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteConfirm onConfirm={() => handleDelete(project._id)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
