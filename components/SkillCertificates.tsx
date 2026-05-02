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
      className="relative py-24 px-6 overflow-hidden bg-linear-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-green-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-green-400 mb-4 block">LEARNING</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Skills{' '}
            <span className="bg-linear-to-r from-green-400 via-teal-400 to-blue-400 text-transparent bg-clip-text">
              Certificates
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Verified credentials from top platforms and courses
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => cert.image && setSelected(index)}
              className={`group relative ${cert.image ? 'cursor-pointer' : ''}`}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-green-500/30 via-teal-500/30 to-blue-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-transparent transition-all duration-300">
                {cert.image && !cert.image.startsWith('data:application/pdf') ? (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0D1424] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        View
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-linear-to-br from-green-500/10 via-teal-500/10 to-blue-500/10 flex items-center justify-center">
                    <Award className="w-10 h-10 text-green-400/40" />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-green-400 text-xs mb-2">{cert.platform}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">
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
                        className="text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && certificates[selected]?.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800/50">
              {certificates[selected].image?.startsWith('data:application/pdf') ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0D1424] gap-4">
                  <FileText className="w-16 h-16 text-red-400" />
                  <a href={certificates[selected].image} download
                    className="px-4 py-2 bg-purple-500 rounded-xl text-white text-sm">
                    Download PDF
                  </a>
                </div>
              ) : (
                <img
                  src={certificates[selected].image!}
                  alt={certificates[selected].name}
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-xs text-white">
                  {selected + 1} / {certificates.length}
                </span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-white font-medium">{certificates[selected].name}</p>
              <p className="text-slate-400 text-sm">{certificates[selected].platform}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
