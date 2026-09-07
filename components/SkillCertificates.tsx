'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Award, Calendar, ExternalLink, X, ChevronLeft, ChevronRight, FileText } from 'lucide-react'

interface Certificate {
  _id: string
  name: string
  platform: string
  date: string
  credentialUrl?: string
  image?: string
  hasImage?: boolean
}

interface Props {
  certificates: Certificate[]
}

export default function SkillCertificates({ certificates }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [selected, setSelected] = useState<number | null>(null)

  if (certificates.length === 0) return null

  const handlePrev = () => {
    if (selected === null) return
    setSelected(selected === 0 ? certificates.length - 1 : selected - 1)
  }

  const handleNext = () => {
    if (selected === null) return
    setSelected(selected === certificates.length - 1 ? 0 : selected + 1)
  }

  return (
    <section
      ref={ref}
      id="skill-certs"
      className="relative py-14 md:py-16 px-6 overflow-hidden bg-[#07050E]"
    >
      <div className="bg-glow-purple w-[500px] h-[500px] top-10 -left-20" />
      <div className="bg-glow-gold w-[450px] h-[450px] bottom-10 -right-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="section-heading">
            SKILL{' '}
            <span className="text-gold-gradient">
              CERTIFICATES
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => (cert.image || cert.hasImage) && setSelected(index)}
              className={`group relative ${(cert.image || cert.hasImage) ? 'cursor-pointer' : ''}`}
            >
              <div className="relative bg-[#0E0B19] rounded-3xl border border-purple-500/25 overflow-hidden hover:border-amber-400/50 transition-all duration-400 shadow-2xl shadow-black">
                {(cert.image || cert.hasImage) && !cert.image?.startsWith('data:application/pdf') ? (
                  <div className="relative aspect-3/2 overflow-hidden bg-[#130F23]">
                    <img
                      src={cert.image || `/api/image/skill-certs/${cert._id}`}
                      alt={cert.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0E0B19] via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#07050E]/60 backdrop-blur-xs">
                      <span className="px-4 py-2 bg-[#0E0B19] rounded-full text-xs font-mono font-bold tracking-wider text-amber-300 border border-amber-400/50 uppercase">
                        VIEW CREDENTIAL
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-4/3 bg-[#130F23] flex items-center justify-center">
                    <Award className="w-12 h-12 text-amber-400/40" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-tight line-clamp-2">{cert.name}</h3>
                  <p className="text-amber-400 text-xs font-mono font-semibold mb-3 uppercase">{cert.platform}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-purple-500/20">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs font-mono text-slate-400">
                        {new Date(cert.date).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-amber-400 hover:text-amber-300 transition-colors p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected !== null && (certificates[selected]?.image || certificates[selected]?.hasImage) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07050E]/95 backdrop-blur-2xl"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>

            {/* Close Trigger */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#0E0B19] border border-amber-400/40 flex items-center justify-center hover:bg-red-500/20 transition-colors z-10 text-amber-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0E0B19] shadow-2xl shadow-black">
              {(() => {
                const imgSrc = certificates[selected].image || `/api/image/skill-certs/${certificates[selected]._id}`
                return imgSrc.startsWith('data:application/pdf') ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <FileText className="w-16 h-16 text-amber-400" />
                    <a href={imgSrc} download className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-purple-600 rounded-full text-white text-xs font-mono font-bold uppercase">
                      DOWNLOAD PDF CREDENTIAL
                    </a>
                  </div>
                ) : (
                  <img
                    src={imgSrc}
                    alt={certificates[selected].name}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )
              })()}

              {/* Prev Trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0B19]/80 border border-purple-500/40 flex items-center justify-center hover:border-amber-400 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Trigger */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0B19]/80 border border-purple-500/40 flex items-center justify-center hover:border-amber-400 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0E0B19]/90 backdrop-blur-md rounded-full border border-amber-400/40">
                <span className="text-xs font-mono font-bold text-amber-300">{selected + 1} / {certificates.length}</span>
              </div>
            </div>

            {/* Title Details */}
            <div className="mt-4 text-center">
              <p className="text-white font-bold uppercase text-base">{certificates[selected].name}</p>
              <p className="text-amber-400 text-xs font-mono uppercase mt-0.5">{certificates[selected].platform}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
