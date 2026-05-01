'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, MapPin, Copy, Check } from 'lucide-react'
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
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    setSending(true)
    // Simulate send (integrate with email service like Resend/EmailJS)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    toast.success('Message sent! I\'ll get back to you soon.')
    setTimeout(() => setSent(false), 4000)
  }

  const copyEmail = () => {
    if (settings.email) {
      navigator.clipboard.writeText(settings.email)
      setCopied(true)
      toast.success('Email copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const socials = [
    settings.githubUrl && { icon: Github, href: settings.githubUrl, label: 'GitHub', color: 'hover:border-purple-500/50' },
    settings.linkedinUrl && { icon: Linkedin, href: settings.linkedinUrl, label: 'LinkedIn', color: 'hover:border-blue-500/50' },
    settings.twitterUrl && { icon: Twitter, href: settings.twitterUrl, label: 'Twitter', color: 'hover:border-sky-500/50' },
  ].filter(Boolean) as { icon: React.ElementType; href: string; label: string; color: string }[]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 mb-4 block">CONNECT</span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Get in{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur" />
              <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-8">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl" />
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Send className="w-5 h-5 text-purple-400" />
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="admin-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="admin-input"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="admin-input resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={sending || sent}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {sent ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Sent!
                      </>
                    ) : sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Email card */}
            {settings.email && (
              <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono mb-1">EMAIL</p>
                      <p className="text-white font-medium">{settings.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-purple-500/50 transition-colors"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Location */}
            {settings.location && (
              <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono mb-1">LOCATION</p>
                    <p className="text-white font-medium">{settings.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Social links */}
            {socials.length > 0 && (
              <div className="bg-[#0D1424] rounded-2xl border border-slate-800/50 p-6">
                <p className="text-xs text-slate-500 font-mono mb-4">FIND ME ON</p>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white ${color} transition-all`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-mono">OPEN FOR OPPORTUNITIES</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
