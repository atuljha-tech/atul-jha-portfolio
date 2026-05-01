'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trophy, Calendar, Building2 } from 'lucide-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import toast from 'react-hot-toast'

interface Cert {
  _id: string
  title: string
  organization: string
  position: string
  date: string
  image?: string
}

export default function HackathonList({ initialCerts }: { initialCerts: Cert[] }) {
  const [certs, setCerts] = useState(initialCerts)

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/hackathon-certificates/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setCerts((prev) => prev.filter((c) => c._id !== id))
      toast.success('Certificate deleted')
    } else {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Hackathon Certificates
          </h1>
          <p className="text-slate-400 text-sm mt-1">{certs.length} certificate{certs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/hackathons/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </Link>
      </div>

      {certs.length === 0 ? (
        <div className="text-center py-20 bg-[#0D1424] rounded-2xl border border-slate-800/50">
          <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-4">No hackathon certificates yet</p>
          <Link
            href="/admin/hackathons/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Your First Certificate
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <div
              key={cert._id}
              className="bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-slate-700 transition-colors"
            >
              {cert.image && (
                <div className="relative h-36 overflow-hidden">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] to-transparent" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                      <span className="text-xs text-yellow-400 font-medium truncate">{cert.position}</span>
                    </div>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">{cert.title}</h3>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-400 truncate">{cert.organization}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      href={`/admin/hackathons/${cert._id}/edit`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteConfirm onConfirm={() => handleDelete(cert._id)} />
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
