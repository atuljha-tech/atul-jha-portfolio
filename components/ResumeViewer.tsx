'use client'

import { useState } from 'react'
import { X, Download, FileText, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ResumeViewerProps {
  hasResume: boolean   // true if a resume PDF or URL exists
  fileName?: string
}

export default function ResumeViewer({ hasResume, fileName }: ResumeViewerProps) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [zoom, setZoom] = useState(100)

  if (!hasResume) return null

  const resumeUrl = '/api/resume'

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => { setOpen(true); setLoaded(false) }}
        className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl overflow-hidden font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="absolute inset-0 bg-linear-to-r from-violet-500 to-pink-500" />
        <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <FileText className="relative w-4 h-4" />
        <span className="relative">View Resume</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0D1424]/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Resume</p>
                  <p className="text-slate-500 text-xs">{fileName || 'resume.pdf'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom controls */}
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/8">
                  <button
                    onClick={() => setZoom(z => Math.max(50, z - 10))}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-400 w-10 text-center font-mono">{zoom}%</span>
                  <button
                    onClick={() => setZoom(z => Math.min(200, z + 10))}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Download */}
                <a
                  href={resumeUrl}
                  download={fileName || 'resume.pdf'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-medium hover:bg-violet-500/25 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Open in new tab */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-slate-400 text-xs font-medium hover:text-white hover:border-white/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open</span>
                </a>

                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/15 hover:border-red-500/30 transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 overflow-auto flex items-start justify-center p-4 bg-slate-900/50">
              {/* Loading state */}
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Loading resume...</p>
                  </div>
                </div>
              )}

              <div
                style={{ width: `${zoom}%`, maxWidth: '900px', minWidth: '300px' }}
                className="transition-all duration-200"
              >
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full rounded-xl border border-white/8 shadow-2xl shadow-black/50"
                  style={{
                    height: 'calc(100vh - 120px)',
                    minHeight: '500px',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                  onLoad={() => setLoaded(true)}
                  title="Resume"
                />
              </div>
            </div>

            {/* Bottom bar */}
            <div className="shrink-0 px-4 py-2.5 border-t border-white/5 bg-[#0D1424]/60 flex items-center justify-between">
              <p className="text-xs text-slate-600 font-mono">Press ESC or click outside to close</p>
              <a
                href={resumeUrl}
                download={fileName || 'resume.pdf'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-violet-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
