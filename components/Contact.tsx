'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, MapPin, Copy, Check, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactProps {
  settings: {
    email?: string
    githubUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
    location?: string
  }
}

export default function Contact({ settings }: ContactProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all fields'); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false); setSent(true)
    setForm({ name: '', email: '', message: '' })
    toast.success("Message sent! I'll get back to you soon.")
    setTimeout(() => setSent(false), 4000)
  }

  const copyEmail = () => {
    if (settings.email) {
      navigator.clipboard.writeText(settings.email)
      setCopied(true); toast.success('Email copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const socials = [
    settings.githubUrl   && { icon: Github,   href: settings.githubUrl,   label: 'GITHUB',   color: 'hover:border-amber-400/50 hover:text-amber-400' },
    settings.linkedinUrl && { icon: Linkedin,  href: settings.linkedinUrl, label: 'LINKEDIN', color: 'hover:border-purple-400/50 hover:text-purple-300' },
    settings.twitterUrl  && { icon: Twitter,   href: settings.twitterUrl,  label: 'TWITTER',  color: 'hover:border-amber-400/50 hover:text-amber-300' },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string; color: string }[]

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-2xl bg-[#130F23] border text-white text-xs font-mono placeholder-slate-500 outline-none transition-all duration-300 ${
      focused === field
        ? 'border-amber-400 bg-purple-950/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        : 'border-purple-500/25 hover:border-purple-500/40'
    }`

  return (
    <section ref={ref} id="contact" className="section-base bg-[#07050E]">
      <div className="bg-glow-purple w-[550px] h-[550px] top-0 -left-20" />
      <div className="bg-glow-gold w-[450px] h-[450px] bottom-0 -right-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="section-heading">
            GET IN{' '}
            <span className="text-gold-gradient">
              TOUCH
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-purple-500/25 bg-[#0E0B19] overflow-hidden shadow-2xl shadow-black">
              <div className="h-1 bg-linear-to-r from-amber-400 via-purple-600 to-amber-500" />
              <div className="p-8">
                <h3 className="text-white font-black text-xl mb-1 uppercase tracking-tight flex items-center gap-2.5">
                  <Send className="w-5 h-5 text-amber-400" />
                  SEND A MESSAGE
                </h3>
                <p className="text-purple-300 text-xs font-mono tracking-wider uppercase mb-8">TYPICAL RESPONSE TIME WITHIN 24 HOURS</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-widest mb-2">YOUR NAME</label>
                      <input
                        type="text" placeholder="ATUL JHA"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('name')} required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-widest mb-2">EMAIL ADDRESS</label>
                      <input
                        type="email" placeholder="YOU@EXAMPLE.COM"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('email')} required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-widest mb-2">MESSAGE DETAILS</label>
                    <textarea
                      placeholder="TELL ME ABOUT YOUR PROJECT OR IDEA..."
                      rows={5} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass('message')} resize-none`} required
                    />
                  </div>
                  <button
                    type="submit" disabled={sending || sent}
                    className="w-full py-4 rounded-full font-mono text-xs font-bold tracking-widest uppercase text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 relative overflow-hidden group shadow-xl shadow-purple-950/60 border border-amber-400/40 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500 via-purple-600 to-purple-800" />
                    <div className="absolute inset-0 bg-linear-to-r from-amber-600 via-purple-700 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {sent ? <><CheckCircle className="w-4 h-4 text-amber-300" /> MESSAGE TRANSMITTED!</>
                        : sending ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> TRANSMITTING...</>
                        : <><Send className="w-4 h-4 text-amber-300" /> SEND MESSAGE</>}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Info Side Panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Availability Status */}
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-[#0E0B19] border border-amber-500/30 shadow-xl">
              <div className="relative">
                <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full" />
                <div className="absolute inset-0 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-40" />
              </div>
              <div>
                <p className="text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">OPEN FOR OPPORTUNITIES</p>
                <p className="text-slate-400 text-xs mt-0.5">INTERNSHIPS, CONTRACTS & FULL-STACK ROLES</p>
              </div>
            </div>

            {/* Direct Email Card */}
            {settings.email && (
              <div className="p-6 rounded-3xl border border-purple-500/25 bg-[#0E0B19] shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest mb-0.5">DIRECT EMAIL</p>
                      <p className="text-white text-xs font-mono font-bold">{settings.email}</p>
                    </div>
                  </div>
                  <button onClick={copyEmail}
                    className="w-9 h-9 rounded-xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center hover:border-amber-400 transition-colors text-amber-400">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Location Card */}
            {settings.location && (
              <div className="p-6 rounded-3xl border border-purple-500/25 bg-[#0E0B19] shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#130F23] border border-purple-500/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest mb-0.5">LOCATION</p>
                    <p className="text-white text-xs font-mono font-bold">{settings.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Social Triggers */}
            {socials.length > 0 && (
              <div className="p-6 rounded-3xl border border-purple-500/25 bg-[#0E0B19] shadow-xl">
                <p className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest mb-3">SOCIAL PROFILES</p>
                <div className="flex flex-wrap gap-2.5">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#130F23] border border-purple-500/30 text-slate-300 text-xs font-mono font-semibold transition-all duration-300 ${color}`}>
                      <Icon className="w-4 h-4" /> {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
