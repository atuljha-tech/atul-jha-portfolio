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
    settings.githubUrl   && { icon: Github,   href: settings.githubUrl,   label: 'GitHub',   color: 'hover:border-violet-500/40 hover:text-violet-300' },
    settings.linkedinUrl && { icon: Linkedin,  href: settings.linkedinUrl, label: 'LinkedIn', color: 'hover:border-blue-500/40 hover:text-blue-300'   },
    settings.twitterUrl  && { icon: Twitter,   href: settings.twitterUrl,  label: 'Twitter',  color: 'hover:border-sky-500/40 hover:text-sky-300'     },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string; color: string }[]

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-white/3 border text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 ${
      focused === field
        ? 'border-violet-500/60 bg-violet-500/5 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]'
        : 'border-white/8 hover:border-white/15'
    }`

  return (
    <section ref={ref} id="contact" className="section-base">
      <div className="glow-orb w-96 h-96 bg-violet-600/10 top-0 -left-20 pointer-events-none" />
      <div className="glow-orb w-80 h-80 bg-pink-600/10 bottom-0 -right-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Connect</span>
          <h2 className="section-heading mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Get in{' '}
            <span className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Touch
            </span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative rounded-2xl border border-white/6 bg-[#0D1424] overflow-hidden">
              <div className="h-[2px] bg-linear-to-r from-blue-500 via-violet-500 to-pink-500" />
              <div className="p-7">
                <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Send className="w-4 h-4 text-violet-400" />
                  Send a Message
                </h3>
                <p className="text-slate-500 text-xs mb-6">I typically respond within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Name</label>
                      <input
                        type="text" placeholder="Atul Jha"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('name')} required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                      <input
                        type="email" placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={inputClass('email')} required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
                    <textarea
                      placeholder="Tell me about your project or idea..."
                      rows={5} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass('message')} resize-none`} required
                    />
                  </div>
                  <button
                    type="submit" disabled={sending || sent}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-violet-500 to-pink-500" />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {sent ? <><CheckCircle className="w-4 h-4" /> Sent!</>
                        : sending ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" /> Sending...</>
                        : <><Send className="w-4 h-4" /> Send Message</>}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-4"
          >
            {/* Availability badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-40" />
              </div>
              <div>
                <p className="text-emerald-400 text-sm font-semibold">Open for Opportunities</p>
                <p className="text-emerald-600 text-xs">Internships, freelance & collaborations</p>
              </div>
            </div>

            {/* Email */}
            {settings.email && (
              <div className="p-5 rounded-2xl border border-white/6 bg-[#0D1424]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-white text-sm font-medium">{settings.email}</p>
                    </div>
                  </div>
                  <button onClick={copyEmail}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:border-violet-500/40 transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  </button>
                </div>
              </div>
            )}

            {/* Location */}
            {settings.location && (
              <div className="p-5 rounded-2xl border border-white/6 bg-[#0D1424]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-white text-sm font-medium">{settings.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Socials */}
            {socials.length > 0 && (
              <div className="p-5 rounded-2xl border border-white/6 bg-[#0D1424]">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-3">Find me on</p>
                <div className="flex gap-2">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 text-slate-400 text-xs font-medium transition-all duration-200 ${color}`}>
                      <Icon className="w-3.5 h-3.5" /> {label}
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
