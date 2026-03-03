"use client";
import React, { useState, useEffect, useRef } from 'react';

const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      title: "VeriTrust Pro",
      summary: "Decentralized credential verification platform for issuing, managing, and verifying certificates in a secure, tamper-proof, and privacy-preserving way",
      problem: "Traditional certificates are vulnerable to forgery and lack a transparent verification mechanism",
      approach: "Built with Ethereum blockchain, Solidity smart contracts, and Web3.js for decentralized certificate issuance and verification",
      impact: "Tamper-proof credentials | Instant verification | Privacy-preserving | Transparent blockchain records",
      link: "https://github.com/atuljha-tech/VeriTrust-Pro",
      icon: "🔗",
      gradient: "from-blue-400 via-purple-400 to-pink-400",
      metrics: [
        { label: "Smart Contracts", value: "3+", color: "blue" },
        { label: "Blockchain", value: "Ethereum", color: "purple" },
        { label: "Security", value: "SHA-256", color: "pink" }
      ],
      tech: ["Solidity", "Web3.js", "Ethereum", "React", "IPFS"]
    },
    {
      title: "ForenChain",
      summary: "Full-stack decentralized web application ensuring integrity and immutability of forensic scan reports using Ethereum Blockchain and SHA-256 hashing",
      problem: "Cybersecurity evidence and forensic reports are vulnerable to tampering, compromising legal and investigative integrity",
      approach: "SHA-256 hashing + Ethereum blockchain storage + React frontend for secure forensic evidence management",
      impact: "Tamper-proof evidence | Verifiable chain of custody | Immutable records | Cybersecurity grade",
      link: "https://github.com/atuljha-tech/ForeChainWeb",
      icon: "🛡️",
      gradient: "from-purple-400 via-pink-400 to-blue-400",
      metrics: [
        { label: "Hashing", value: "SHA-256", color: "purple" },
        { label: "Network", value: "Ethereum", color: "pink" },
        { label: "Evidence", value: "100%", color: "blue" }
      ],
      tech: ["Solidity", "Ethereum", "SHA-256", "React", "Node.js"]
    },
    {
      title: "Jharkhand Tourism Guide",
      summary: "Smart Travel Assistant with AI chatbot, live weather updates, and interactive maps for exploring Jharkhand's waterfalls and natural wonders",
      problem: "Travelers lack a centralized platform with AI assistance for discovering and planning trips to Jharkhand's remote natural attractions",
      approach: "Next.js + MongoDB + Gemini AI for chatbot, integrated weather API, and interactive maps for seamless exploration",
      impact: "AI-powered travel assistant | Real-time weather | Interactive maps | 100+ attractions mapped",
      link: "https://jharkhandtourism-a3dh60lge-atuljha275-2203s-projects.vercel.app/",
      icon: "🏞️",
      gradient: "from-pink-400 via-blue-400 to-purple-400",
      metrics: [
        { label: "AI Chatbot", value: "Gemini", color: "pink" },
        { label: "Attractions", value: "100+", color: "blue" },
        { label: "Live Weather", value: "Real-time", color: "purple" }
      ],
      tech: ["Next.js", "MongoDB", "Gemini AI", "Tailwind", "Weather API"]
    }
  ];

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-20');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative py-16 md:py-20 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div 
          className="absolute top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl"
          style={{ transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))` }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with animated gradient text */}
        <div className="mb-24 text-center">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 uppercase animate-pulse">
              • Real Projects •
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
            Full Stack
            <span className="relative inline-block ml-4">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
                Creations
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm" />
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Blockchain • Cybersecurity • AI-Powered Tourism — Built with modern tech stack
          </p>
        </div>

        {/* Projects grid */}
        <div className="space-y-8 lg:space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group opacity-0 translate-y-20 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={`
                relative rounded-3xl overflow-hidden
                transform transition-all duration-500 ease-out
                ${activeIndex === index ? 'scale-[1.02]' : 'scale-100'}
              `}>
                {/* Animated gradient border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                
                {/* Card content */}
                <div className="relative bg-[#0D1424] rounded-3xl p-8 lg:p-12 border border-slate-800/50 backdrop-blur-xl">
                  {/* Top accent line with gradient animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                  {/* Floating particles effect */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative">
                    {/* Card header with icon and title */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                          <div className={`
                            text-4xl w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} 
                            flex items-center justify-center shadow-xl transform -rotate-6
                            group-hover:rotate-0 transition-transform duration-500 cursor-pointer
                          `}>
                            <span className="transform group-hover:scale-110 transition-transform duration-500">
                              {project.icon}
                            </span>
                          </div>
                        </a>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="w-8 h-px bg-gradient-to-r from-blue-400 to-purple-400" />
                            <span className="text-xs text-slate-500 font-mono">PROJECT</span>
                          </div>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                              {project.title}
                            </h3>
                          </a>
                        </div>
                      </div>
                      
                      {/* Tech stack badges */}
                      <div className="hidden lg:flex gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono text-slate-400 bg-slate-800/50 rounded-full border border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-lg text-slate-300 mb-10 border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 font-light">
                      {project.summary}
                    </p>

                    {/* Metrics cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                      {project.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="relative bg-slate-800/30 rounded-xl p-4 overflow-hidden group/metric"
                        >
                          <div className={`
                            absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 
                            group-hover/metric:opacity-10 transition-opacity duration-500
                          `} />
                          <div className="relative">
                            <div className="text-xs text-slate-500 mb-1 font-mono">
                              {metric.label}
                            </div>
                            <div className={`
                              text-2xl font-bold bg-gradient-to-r ${project.gradient} 
                              text-transparent bg-clip-text
                            `}>
                              {metric.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Three-column details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                      {/* Problem */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-xs font-mono text-blue-400 tracking-wider">
                            PROBLEM
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {project.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span className="text-xs font-mono text-purple-400 tracking-wider">
                            APPROACH
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {project.approach}
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                          <span className="text-xs font-mono text-pink-400 tracking-wider">
                            IMPACT
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {project.impact}
                        </p>
                      </div>
                    </div>

                    {/* Mobile tech stack (visible on mobile) */}
                    <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-mono text-slate-400 bg-slate-800/50 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer with project link */}
                    <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-60 border border-slate-800"
                            />
                          ))}
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-slate-600 font-mono hover:text-white transition-colors"
                        >
                          VIEW PROJECT →
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-slate-700">🔗</span>
                        <span className="text-xs text-slate-700">⚡</span>
                        <span className="text-xs text-slate-700">🔧</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-24 text-center">
          <div className="inline-block group/cursor">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover/cursor:opacity-100 transition duration-1000" />
              <a 
                href="https://github.com/atuljha-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative px-8 py-4 bg-[#0D1424] rounded-full text-white font-mono text-sm tracking-wider border border-slate-700 hover:border-transparent transition-all duration-500 inline-block"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>MORE ON GITHUB</span>
                  <span className="text-lg transform group-hover/cursor:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>
          
          <p className="mt-8 text-xs text-slate-700 font-mono tracking-[0.3em]">
            • BLOCKCHAIN • CYBERSECURITY • AI • FULL STACK •
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;