'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface Skill {
  name: string;
  level: 'expert' | 'intermediate' | 'learning';
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">⚛️</span>
        </div>
      ),
      color: 'from-blue-500 to-purple-500',
      skills: [
        { name: 'React', level: 'intermediate' },
        { name: 'TypeScript', level: 'learning' },
        { name: 'Tailwind CSS', level: 'intermediate' },
        { name: 'Next.js', level: 'learning' },
        { name: 'JavaScript', level: 'intermediate' },
        { name: 'HTML/CSS', level: 'expert' },
      ],
    },
    {
      title: 'Backend',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">🔧</span>
        </div>
      ),
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Node.js', level: 'intermediate' },
        { name: 'Express', level: 'learning' },
        { name: 'Python', level: 'intermediate' },
        { name: 'Java', level: 'expert' },
        { name: 'REST APIs', level: 'intermediate' },
        { name: 'DSA', level: 'intermediate' },
      ],
    },
    {
      title: 'Database',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">🗄️</span>
        </div>
      ),
      color: 'from-pink-500 to-blue-500',
      skills: [
        { name: 'MongoDB', level: 'learning' },
        { name: 'Firebase', level: 'intermediate' },
        { name: 'MySQL', level: 'intermediate' },
        { name: 'PostgreSQL', level: 'learning' },
        { name: 'Supabase', level: 'learning' },
      ],
    },
    {
      title: 'Specializations',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">🔐</span>
        </div>
      ),
      color: 'from-blue-500 to-pink-500',
      skills: [
        { name: 'IoT', level: 'intermediate' },
        { name: 'Blockchain', level: 'learning' },
        { name: 'Cybersecurity', level: 'learning' },
        { name: 'Web3.js', level: 'learning' },
        { name: 'Solidity', level: 'learning' },
      ],
    },
    {
      title: 'Tools',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">🛠️</span>
        </div>
      ),
      color: 'from-green-500 to-blue-500',
      skills: [
        { name: 'Git/GitHub', level: 'intermediate' },
        { name: 'VS Code', level: 'expert' },
        { name: 'Postman', level: 'intermediate' },
        { name: 'Vercel', level: 'intermediate' },
        { name: 'Arduino IDE', level: 'intermediate' },
        { name: 'Docker', level: 'learning' },
      ],
    },
    {
      title: 'Soft Skills',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl filter drop-shadow-lg">💡</span>
        </div>
      ),
      color: 'from-orange-500 to-pink-500',
      skills: [
        { name: 'Teamwork', level: 'expert' },
        { name: 'Problem Solving', level: 'expert' },
        { name: 'Communication', level: 'intermediate' },
        { name: 'Leadership', level: 'intermediate' },
        { name: 'Time Management', level: 'intermediate' },
      ],
    },
  ];

  // Parallax effect
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

  const getLevelColor = (level: 'expert' | 'intermediate' | 'learning') => {
    switch (level) {
      case 'expert':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border border-blue-500/30';
      case 'intermediate':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 border border-purple-500/30';
      case 'learning':
        return 'bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 border border-pink-500/30';
    }
  };

  const getLevelLabel = (level: 'expert' | 'intermediate' | 'learning') => {
    switch (level) {
      case 'expert':
        return 'Expert';
      case 'intermediate':
        return 'Intermediate';
      case 'learning':
        return 'Learning';
    }
  };

  const getLevelIcon = (level: 'expert' | 'intermediate' | 'learning') => {
    switch (level) {
      case 'expert':
        return '⚡';
      case 'intermediate':
        return '📊';
      case 'learning':
        return '🌱';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative py-12 md:py-18 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div 
          className="absolute top-40 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-40 -right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
          style={{ transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))` }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />

       {/* Floating particles - Client side only */}
{typeof window !== 'undefined' && [...Array(20)].map((_, i) => {
  // Generate deterministic values based on index to avoid hydration mismatch
  const top = (i * 13 + 7) % 100;
  const left = (i * 17 + 23) % 100;
  const duration = 5 + (i % 10);
  const opacity = 0.1 + ((i % 5) / 25);
  
  return (
    <div
      key={i}
      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animation: `float ${duration}s linear infinite`,
        opacity: opacity,
        filter: 'blur(1px)'
      }}
    />
  );
})}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 uppercase animate-pulse">
              • My Skills •
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Technical 
            <span className="relative inline-block ml-4">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
                Arsenal
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm" />
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Currently learning and building with these technologies
          </p>
        </div>

        {/* Skills Grid - Now 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group opacity-0 translate-y-20 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`
                relative rounded-2xl overflow-hidden
                transform transition-all duration-500 ease-out
                ${hoveredCategory === index ? 'scale-105' : 'scale-100'}
              `}>
                {/* Animated gradient border */}
                <div className={`
                  absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md
                `} />

                {/* Card content */}
                <div className="relative bg-[#0D1424] rounded-2xl p-6 border border-slate-800/50 backdrop-blur-xl">
                  {/* Top gradient line */}
                  <div className={`
                    absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} 
                    transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out
                  `} />

                  {/* Glow effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                    group-hover:opacity-5 transition-opacity duration-500
                  `} />

                  <div className="relative">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`
                        relative transform -rotate-6 group-hover:rotate-0 transition-all duration-500
                      `}>
                        {/* Icon background glow */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl 
                          opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500
                        `} />
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {category.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${category.color}`} />
                          <span className="text-xs text-slate-500 font-mono">
                            {category.skills.length} SKILLS
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="group/skill relative p-3 rounded-xl bg-slate-800/20 border border-slate-800/50 hover:border-transparent transition-all duration-300"
                          style={{
                            animationDelay: `${index * 100 + skillIndex * 50}ms`,
                          }}
                        >
                          {/* Skill hover gradient */}
                          <div className={`
                            absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 
                            group-hover/skill:opacity-10 rounded-xl transition-opacity duration-300
                          `} />

                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {skill.name}
                              </span>
                              
                              {/* Level indicator dots */}
                              <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`
                                      w-1 h-1 rounded-full transition-all duration-300
                                      ${skill.level === 'expert' && i < 3 ? `bg-gradient-to-r ${category.color}` : ''}
                                      ${skill.level === 'intermediate' && i < 2 ? `bg-gradient-to-r ${category.color}` : ''}
                                      ${skill.level === 'learning' && i < 1 ? `bg-gradient-to-r ${category.color}` : ''}
                                      ${(skill.level === 'expert' && i >= 3) || 
                                        (skill.level === 'intermediate' && i >= 2) || 
                                        (skill.level === 'learning' && i >= 1) ? 'bg-slate-700' : ''}
                                    `}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Level badge */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                                {getLevelIcon(skill.level)}
                              </span>
                              <span className={`
                                text-xs px-2 py-1 rounded-full font-medium
                                ${getLevelColor(skill.level)}
                              `}>
                                {getLevelLabel(skill.level)}
                              </span>
                            </div>
                          </div>

                          {/* Animated progress bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700/50 rounded-b-xl overflow-hidden">
                            <div className={`
                              h-full bg-gradient-to-r ${category.color} 
                              transform origin-left transition-transform duration-700
                              ${hoveredCategory === index ? 'scale-x-100' : 'scale-x-0'}
                            `} style={{
                              width: skill.level === 'expert' ? '100%' : 
                                     skill.level === 'intermediate' ? '66%' : '33%'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Category footer with stats */}
                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {category.skills.slice(0, 3).map((skill, i) => (
                          <div
                            key={i}
                            className={`
                              w-6 h-6 rounded-full bg-gradient-to-r ${category.color} 
                              flex items-center justify-center text-xs border-2 border-[#0D1424]
                              transform hover:scale-110 transition-transform
                            `}
                            style={{ zIndex: 3 - i }}
                          >
                            {skill.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-slate-600 font-mono">
                        {category.skills.reduce((acc, s) => 
                          acc + (s.level === 'expert' ? 3 : s.level === 'intermediate' ? 2 : 1), 0
                        )}/{category.skills.length * 3}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mastery scale */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-8 p-4 bg-[#0D1424]/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              <span className="text-xs text-slate-400 font-mono">EXPERT</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              <span className="text-xs text-slate-400 font-mono">INTERMEDIATE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-blue-400" />
              <span className="text-xs text-slate-400 font-mono">LEARNING</span>
            </div>
          </div>
        </div>

        {/* Learning journey note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-600 font-mono tracking-wider">
            • ALWAYS LEARNING • ALWAYS GROWING • 2ND YEAR CSE •
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
        
        @keyframes float {
          0% {
            transform: translateY(0vh) translateX(0vw);
          }
          100% {
            transform: translateY(-100vh) translateX(10vw);
          }
        }
      `}</style>
    </section>
  );
}