'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Certificate {
  _id: string
  title: string
  image?: string
  hasImage?: boolean
}

interface Props {
  certificates: Certificate[]
}

export default function HackathonCertificates({ certificates }: Props) {
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
      id="hackathons"
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
            HACKATHON{' '}
            <span className="text-gold-gradient">
              CERTIFICATES
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
                {/* Image */}
                {(cert.image || cert.hasImage) ? (
                  <div className="relative aspect-4/3 overflow-hidden bg-[#130F23]">
                    <img
                      src={cert.image || `/api/image/hackathons/${cert._id}`}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0E0B19]/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#07050E]/60 backdrop-blur-xs">
                      <span className="px-3.5 py-1.5 bg-[#0E0B19] rounded-full text-xs font-mono font-bold text-amber-300 border border-amber-400/50 uppercase">
                        VIEW
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-4/3 bg-[#130F23] flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-amber-400/40" />
                  </div>
                )}

                {/* Title */}
                <div className="p-4">
                  <p className="text-white text-xs font-bold font-mono uppercase line-clamp-2 leading-snug">
                    {cert.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected !== null && (certificates[selected]?.image || certificates[selected]?.hasImage) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07050E]/95 backdrop-blur-2xl"
          onClick={() => setSelected(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0E0B19] shadow-2xl shadow-black">
              <img
                src={certificates[selected].image || `/api/image/hackathons/${certificates[selected]._id}`}
                alt={certificates[selected].title}
                className="w-full max-h-[80vh] object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0B19]/80 border border-purple-500/40 flex items-center justify-center hover:border-amber-400 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0B19]/80 border border-purple-500/40 flex items-center justify-center hover:border-amber-400 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0E0B19] border border-amber-400/40 flex items-center justify-center hover:bg-red-500/20 text-amber-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0E0B19]/90 backdrop-blur-md rounded-full border border-amber-400/40">
                <span className="text-xs font-mono font-bold text-amber-300">{selected + 1} / {certificates.length}</span>
              </div>
            </div>

            <p className="text-center text-white font-bold uppercase mt-4 text-sm font-mono">
              {certificates[selected].title}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
