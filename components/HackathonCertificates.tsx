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
      className="relative py-24 px-6 overflow-hidden bg-linear-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-yellow-400 mb-4 block">
            ACHIEVEMENTS
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Hackathon{' '}
            <span className="bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">
              Certificates
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => (cert.image || cert.hasImage) && setSelected(index)}
              className={`group relative ${(cert.image || cert.hasImage) ? 'cursor-pointer' : ''}`}
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-yellow-500/30 via-orange-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-transparent transition-all duration-300">
                {/* Image */}
                {(cert.image || cert.hasImage) ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image || `/api/image/hackathons/${cert._id}`}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0D1424]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                        View
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-linear-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-yellow-400/40" />
                  </div>
                )}

                {/* Title */}
                <div className="p-3">
                  <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
                    {cert.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (certificates[selected]?.image || certificates[selected]?.hasImage) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelected(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-[#0D1424]">
              <img
                src={certificates[selected].image || `/api/image/hackathons/${certificates[selected]._id}`}
                alt={certificates[selected].title}
                className="w-full max-h-[80vh] object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                <span className="text-xs text-white">{selected + 1} / {certificates.length}</span>
              </div>
            </div>

            {/* Title below image */}
            <p className="text-center text-white font-medium mt-3 text-sm">
              {certificates[selected].title}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
