'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Send, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Users, 
  Rocket, 
  Coffee,
  ExternalLink,
  Copy,
  MapPin
} from 'lucide-react';

export default function Contact() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Remove parallax effect that causes hydration issues
  // Use simple mounting state instead
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Add your form submission logic here
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('atuljha275@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'atuljha275@gmail.com',
      href: 'mailto:atuljha275@gmail.com',
      gradient: 'from-blue-400 to-purple-400',
      description: 'Send me a message',
      action: copyEmail
    },
    {
      id: 'github',
      icon: Github,
      label: 'GitHub',
      value: '@atuljha-tech',
      href: 'https://github.com/atuljha-tech',
      gradient: 'from-purple-400 to-pink-400',
      description: 'Check my code'
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      value: '@atuljha275',
      href: 'https://linkedin.com/in/atuljha275',
      gradient: 'from-pink-400 to-blue-400',
      description: 'Connect professionally'
    },
    {
      id: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      value: '@atuljhatwitter',
      href: 'https://twitter.com/atuljhatwitter',
      gradient: 'from-blue-400 to-purple-400',
      description: 'Follow for updates'
    }
  ];

  const stats = [
    { icon: Users, label: 'GitHub Repos', value: '17+', gradient: 'from-blue-400 to-purple-400' },
    { icon: Rocket, label: 'Projects Built', value: '12+', gradient: 'from-purple-400 to-pink-400' },
    { icon: Coffee, label: 'Collaborations', value: '5+', gradient: 'from-pink-400 to-blue-400' },
    { icon: Clock, label: 'Response Time', value: '<24h', gradient: 'from-blue-400 to-purple-400' }
  ];

  const quickResponses = [
    "I'll respond within 24 hours",
    "Open to collaboration",
    "Let's build something amazing",
    "2nd Year CSE Student"
  ];

  // Fixed particles with deterministic values to avoid hydration mismatch
  const particles = mounted ? [...Array(12)].map((_, i) => {
    const top = (i * 17 + 5) % 90 + 5; // 5-95%
    const left = (i * 23 + 11) % 90 + 5; // 5-95%
    const duration = 8 + (i % 10);
    const opacity = 0.1 + ((i % 4) / 20);
    return { top, left, duration, opacity, key: i };
  }) : [];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
      id="contact"
    >
      {/* Simple animated background - no complex transforms */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs - static to avoid hydration issues */}
        <div className="absolute top-40 -left-20 w-64 md:w-96 h-64 md:h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-64 md:w-96 h-64 md:h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

        {/* Simple grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Floating code snippets - hidden on mobile */}
        <div className="hidden md:block absolute top-20 right-20 text-blue-500/10 text-4xl font-mono rotate-12">{"< />"}</div>
        <div className="hidden md:block absolute bottom-20 left-20 text-purple-500/10 text-4xl font-mono -rotate-12">{"{}"}</div>

        {/* Floating particles - only rendered after mount with fixed positions */}
        {mounted && particles.map((p) => (
          <div
            key={p.key}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header - responsive text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="relative px-4 md:px-6 py-2 bg-[#0D1424] rounded-full border border-slate-800 inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                LET'S CONNECT
              </span>
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight px-2">
            Get in 
            <span className="relative inline-block mx-2 md:mx-4">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
                Touch
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm" />
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light px-4">
            Have a question, want to collaborate, or just want to say hi? 
            I'd love to hear from you!
          </p>

          {/* Quick response badges - wrap on mobile */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8 px-2">
            {quickResponses.map((response, index) => (
              <div
                key={index}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-[#0D1424]/50 backdrop-blur-sm rounded-full border border-slate-800/50"
              >
                <span className="text-[10px] md:text-xs text-slate-400 font-mono">{response}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats cards - 2 columns on mobile, 4 on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16 px-2"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-[#0D1424]/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-slate-800/50 group-hover:border-transparent transition-all duration-300">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`
                      w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.gradient} 
                      flex items-center justify-center group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] md:text-xs text-slate-500 font-mono truncate">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Main grid - stack on mobile, side by side on desktop */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 px-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative bg-[#0D1424] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-slate-800/50 backdrop-blur-xl">
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl md:rounded-t-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    Send a Message
                    <Send className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  </h3>
                </div>
                
                <p className="text-xs md:text-sm text-slate-400 mb-6 md:mb-8 border-l-2 border-purple-500/30 pl-3 md:pl-4 italic">
                  "The best way to predict the future is to create it"
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 md:py-4 bg-[#0A0F1C] rounded-xl border ${
                        focusedField === 'name' ? 'border-purple-500' : 'border-slate-800'
                      } text-white placeholder-slate-600 focus:outline-none transition-all duration-300 text-sm md:text-base`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 md:py-4 bg-[#0A0F1C] rounded-xl border ${
                        focusedField === 'email' ? 'border-pink-500' : 'border-slate-800'
                      } text-white placeholder-slate-600 focus:outline-none transition-all duration-300 text-sm md:text-base`}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 md:py-4 bg-[#0A0F1C] rounded-xl border ${
                        focusedField === 'message' ? 'border-blue-500' : 'border-slate-800'
                      } text-white placeholder-slate-600 focus:outline-none transition-all duration-300 resize-none text-sm md:text-base`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="relative w-full group/btn overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <div className="relative px-6 py-3 md:py-4 bg-[#0D1424] rounded-xl border border-slate-800 group-hover/btn:border-transparent transition-all duration-300">
                      <span className="text-white font-medium flex items-center justify-center gap-2 text-sm md:text-base">
                        {submitted ? (
                          <>
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                            Message Sent!
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <div className="relative bg-[#0D1424] rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-800/50 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">Connect With Me</h3>
                <div className="flex items-center gap-1 md:gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-slate-500" />
                  <span className="text-[10px] md:text-xs text-slate-500 font-mono">AVAILABLE</span>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.id}
                    href={method.id === 'email' ? '#' : method.href}
                    target={method.id !== 'email' ? '_blank' : undefined}
                    rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setHoveredButton(method.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="group/btn relative block"
                    onClick={(e) => {
                      if (method.id === 'email') {
                        e.preventDefault();
                        method.action();
                      }
                    }}
                  >
                    <div className="relative p-3 md:p-4 bg-[#0A0F1C] rounded-xl md:rounded-2xl border border-slate-800 hover:border-transparent transition-all duration-300">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`
                          w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r ${method.gradient} 
                          flex items-center justify-center flex-shrink-0
                        `}>
                          <method.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
                            <span className={`text-xs md:text-sm font-mono bg-gradient-to-r ${method.gradient} text-transparent bg-clip-text`}>
                              {method.label}
                            </span>
                            <span className="text-[8px] md:text-xs text-slate-600">•</span>
                            <span className="text-[8px] md:text-xs text-slate-500 truncate">{method.description}</span>
                          </div>
                          <div className="text-sm md:text-base text-white font-medium flex items-center gap-2 truncate">
                            {method.value}
                            {method.id === 'email' && copied && (
                              <span className="text-[10px] md:text-xs text-green-400">Copied!</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                          {hoveredButton === method.id && method.id !== 'email' && (
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-slate-400" />
                          )}
                          <ArrowRight className={`
                            w-4 h-4 md:w-5 md:h-5 text-slate-500 transition-all duration-300
                            ${hoveredButton === method.id ? 'translate-x-1 text-white' : ''}
                          `} />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability status */}
              <div className="mt-4 md:mt-6 flex items-center gap-2 p-2 md:p-3 bg-green-500/10 rounded-lg md:rounded-xl border border-green-500/20">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] md:text-xs text-green-400 font-mono truncate">OPEN FOR FREELANCE</span>
              </div>
            </div>

            {/* Quick Response Card */}
            <div className="relative p-4 md:p-6 bg-[#0D1424]/50 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-800/50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base text-white font-bold mb-1">Quick Response</h4>
                  <p className="text-xs md:text-sm text-slate-400 mb-2">I'll respond within 24 hours</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    <span className="text-[8px] md:text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                      2nd Year CSE
                    </span>
                    <span className="text-[8px] md:text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-4 p-3 md:p-4 bg-[#0D1424]/30 rounded-xl md:rounded-2xl border border-slate-800/50 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-[#0D1424] flex items-center justify-center text-[8px] md:text-xs text-white font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-xs md:text-sm text-slate-400 font-mono">atuljha-tech</span>
          </div>
          
          <p className="mt-4 md:mt-6 text-[10px] md:text-xs text-slate-700 font-mono tracking-wider">
            • OPEN SOURCE • COLLABORATION • INNOVATION •
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );
}