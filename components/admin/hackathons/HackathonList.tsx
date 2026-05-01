'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trophy } from 'lucide-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import { SortableList } from '@/components/admin/SortableList'
import toast from 'react-hot-toast'

interface Cert {
  _id: string
  title: string
  image?: string
  order: number
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
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Hackathon Certificates
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {certs.length} certificate{certs.length !== 1 ? 's' : ''} —{' '}
            <span className="text-slate-500">drag ☰ to reorder</span>
          </p>
        </div>
        <Link
          href="/admin/hackathons/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Your First Certificate
          </Link>
        </div>
      ) : (
        <SortableList
          items={certs}
          onReorder={setCerts}
          apiEndpoint="/api/hackathon-certificates"
          renderItem={(cert) => (
            <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 p-3">
                {/* Thumbnail */}
                {cert.image ? (
                  <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-14 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-yellow-400/40" />
                  </div>
                )}
                <p className="text-white text-sm font-medium flex-1 line-clamp-2">{cert.title}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/hackathons/${cert._id}/edit`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <DeleteConfirm onConfirm={() => handleDelete(cert._id)} />
                </div>
              </div>
            </div>
          )}
        />
      )}
    </div>
  )
}
