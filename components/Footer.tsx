'use client';

import { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  Sparkles,
  ChevronUp,
  MapPin
} from 'lucide-react';

export default function Footer() {
  const [year, setYear] = useState(2024);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/atuljha-tech', label: 'GitHub', username: '@atuljha-tech' },
    { icon: Linkedin, href: 'https://linkedin.com/in/atuljha275', label: 'LinkedIn', username: '@atuljha275' },
    { icon: Twitter, href: 'https://twitter.com/atuljhatwitter', label: 'Twitter', username: '@atuljhatwitter' },
    { icon: Mail, href: 'mailto:atuljha275@gmail.com', label: 'Email', username: 'atuljha275' },
  ];

  // Fixed particles for footer
  const particles = mounted ? [...Array(6)].map((_, i) => {
    const top = (i * 20 + 5) % 90 + 5;
    const left = (i * 25 + 10) % 90 + 5;
    return { top, left, key: i };
  }) : [];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0F1C] to-[#05080F] py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simple gradient orbs */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.key}
            className="absolute w-0.5 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              opacity: 0.15
            }}
          />
        ))}
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content - simplified */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Signature */}
          <a 
            href="#home" 
            className="inline-block mb-3"
          >
            <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Dancing Script', 'cursive'" }}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Atul Jha
              </span>
            </span>
          </a>
          
          {/* Location */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-xs text-slate-500">Heritage Institute of Technology</span>
          </div>

          {/* Social links - horizontal */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.label}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
                <div className="relative w-10 h-10 rounded-full bg-[#0D1424] border border-slate-800 group-hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </a>
            ))}
          </div>

          {/* Simple quote */}
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 font-light italic">
            "Building the future with blockchain, IoT, and full-stack magic"
          </p>
        </div>

        {/* Bottom bar - very simple */}
        <div className="relative pt-6 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600 font-mono">
              © {year} Atul Jha
            </p>
            
            <div className="flex items-center gap-4">
              <p className="text-xs text-slate-600 font-mono flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-pink-500 animate-pulse" />
                <span>in India</span>
              </p>
              
              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="group relative w-8 h-8"
                aria-label="Back to top"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-[#0D1424] border border-slate-800 group-hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Google Font for signature */}
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
    </footer>
  );
}