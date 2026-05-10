'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Download, FileText, ExternalLink } from 'lucide-react'

interface ResumeViewerProps {
  hasResume: boolean
  fileName?: string
}

// The modal rendered via portal — completely outside the page DOM tree
function ResumeModal({
  onClose,
  fileName,
}: {
  onClose: () => void
  fileName?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const resumeUrl = '/api/resume'

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.18s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(13,20,36,0.9)',
        flexShrink: 0,
      }}>
        {/* Left — title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(139,92,246,0.15)',
            border: '1px solid rgba(139,92,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={15} color="#a78bfa" />
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0 }}>Resume</p>
            <p style={{ color: '#64748b', fontSize: 11, margin: 0 }}>{fileName || 'resume.pdf'}</p>
          </div>
        </div>

        {/* Right — actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={resumeUrl}
            download={fileName || 'resume.pdf'}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 8,
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#c4b5fd', fontSize: 12, fontWeight: 500,
              textDecoration: 'none', cursor: 'pointer',
            }}
          >
            <Download size={13} />
            <span>Download</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94a3b8', fontSize: 12, fontWeight: 500,
              textDecoration: 'none', cursor: 'pointer',
            }}
          >
            <ExternalLink size={13} />
            <span>Open tab</span>
          </a>

          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#94a3b8',
            }}
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* PDF area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px 16px',
        background: 'rgba(15,20,35,0.6)',
      }}>
        {/* Spinner */}
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: '60px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 32, height: 32,
              border: '2px solid rgba(139,92,246,0.2)',
              borderTopColor: '#8b5cf6',
              borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
            }} />
            <p style={{ color: '#64748b', fontSize: 13 }}>Loading resume...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {/* iframe — the actual PDF */}
        <div style={{
          width: '100%',
          maxWidth: 860,
          animation: 'slideUp 0.25s ease',
        }}>
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            title="Resume"
            style={{
              width: '100%',
              height: 'calc(100vh - 130px)',
              minHeight: 480,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              background: '#fff',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'block',
            }}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        flexShrink: 0,
        padding: '10px 16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(13,20,36,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <p style={{ color: '#334155', fontSize: 11, fontFamily: 'monospace' }}>
          Press ESC or click outside to close
        </p>
        <a
          href={resumeUrl}
          download={fileName || 'resume.pdf'}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
            color: '#fff', fontSize: 12, fontWeight: 600,
            textDecoration: 'none', cursor: 'pointer',
          }}
        >
          <Download size={13} />
          Download PDF
        </a>
      </div>
    </div>
  )
}

export default function ResumeViewer({ hasResume, fileName }: ResumeViewerProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleClose = useCallback(() => setOpen(false), [])

  if (!hasResume) return null

  return (
    <>
      {/* ── Trigger button — unique, not generic ── */}
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.15) 100%)',
          border: '1px solid rgba(139,92,246,0.35)',
        }}
      >
        {/* Animated shimmer */}
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.25))' }}
        />
        <FileText className="relative w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
        <span className="relative bg-linear-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
          View Resume
        </span>
        {/* Dot indicator */}
        <span className="relative w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      </button>

      {/* ── Portal modal — rendered outside page DOM ── */}
      {mounted && open && createPortal(
        <ResumeModal onClose={handleClose} fileName={fileName} />,
        document.body
      )}
    </>
  )
}
