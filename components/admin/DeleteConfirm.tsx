'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'

interface DeleteConfirmProps {
  onConfirm: () => Promise<void>
  label?: string
}

export default function DeleteConfirm({ onConfirm, label = 'Delete' }: DeleteConfirmProps) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Sure?
        </span>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="px-2 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs bg-slate-800 text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
      aria-label={label}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
