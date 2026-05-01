'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, Calendar, ExternalLink, Building2 } from 'lucide-react'

interface Certificate {
  _id: string
  title: string
  organization: string
  position: string
  date: string
  image?: string
  description?: string
  proofLink?: string
}

interface Props {
  certificates: Certificate[]
}

export default function HackathonCertificates({ certificates }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  if (certificates.length === 0) return null

  return (
    <section
      ref={ref}
      id="hackathons"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
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
          <span className="text-xs font-mono tracking-widest text-yellow-400 mb-4 block">ACHIEVEMENTS</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Hackathon{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">
              Certificates
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Recognition earned through competitive hackathons and coding events
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 overflow-hidden hover:border-transparent transition-all duration-300">
                {/* Certificate image */}
                {cert.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-yellow-400/50" />
                  </div>
                )}

                <div className="p-5">
                  {/* Position badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-3">
                    <Trophy className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-400">{cert.position}</span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{cert.title}</h3>

                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="text-sm text-slate-400 truncate">{cert.organization}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="text-sm text-slate-500">
                      {new Date(cert.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {cert.description && (
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{cert.description}</p>
                  )}

                  {cert.proofLink && (
                    <a
                      href={cert.proofLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
