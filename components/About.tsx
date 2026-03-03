'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Code2, 
  Server, 
  Sparkles,
  Award,
  Users,
  Zap,
  ChevronRight,
  Brain,
  Rocket,
  Terminal,
  Cpu,
  GraduationCap,
  Medal,
  BookOpen,
  Gamepad2,
  Shield,
  Globe
} from 'lucide-react'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  const skills = [
    { 
      category: 'Web Development', 
      icon: Code2,
      color: 'from-blue-400 to-purple-400',
      items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS']
    },
    { 
      category: 'Programming', 
      icon: Terminal,
      color: 'from-purple-400 to-pink-400',
      items: ['Java', 'DSA', 'Problem Solving', 'Algorithms', 'OOP']
    },
    { 
      category: 'Specializations', 
      icon: Shield,
      color: 'from-pink-400 to-blue-400',
      items: ['IoT Systems', 'Blockchain', 'Cybersecurity', 'Full-Stack']
    },
  ]

  const achievements = [
    { icon: GraduationCap, value: '8.9', label: 'CGPA (1st Year)', color: 'blue' },
    { icon: Medal, value: '95%', label: '10th Grade', color: 'purple' },
    { icon: Award, value: '91%', label: '12th Grade', color: 'pink' },
    { icon: Users, value: '2028', label: 'Graduation Year', color: 'blue' },
  ]

  const education = [
    {
      degree: 'B.Tech in Computer Science Engineering',
      institution: 'Heritage Institute of Technology',
      year: '2024 - 2028',
      score: 'CGPA: 8.9',
      icon: GraduationCap
    },
    {
      degree: 'Class XII (Senior Secondary)',
      institution: 'National Gems High Secondary School',
      year: '2023',
      score: 'Percentage: 91%',
      icon: BookOpen
    },
    {
      degree: 'Class X (Secondary)',
      institution: 'National Gems High Secondary School',
      year: '2021',
      score: 'Percentage: 95%',
      icon: BookOpen
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-16 px-6 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1424] backdrop-blur-sm border border-slate-800 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-300">About Me</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
              About Me
            </span>
          </h1>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left side - Introduction & Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full" />
                My Journey
              </h2>
              
              <p className="text-lg text-slate-400 leading-relaxed">
                Hello! I am Atul Jha, a passionate Computer Science Engineer specializing in IoT, Blockchain, 
                and Cybersecurity. I am currently in my 2nd year at Heritage Institute of Technology and will 
                graduate in 2028. My journey in technology is driven by curiosity, problem-solving, and creating 
                projects that combine efficiency with creativity.
              </p>
              
              <p className="text-lg text-slate-400 leading-relaxed">
                Academics: I completed my 10th grade at National Gems High Secondary School scoring an outstanding 95%. 
                For 12th grade, I secured 91%. In my 1st year of CSE, I achieved an active CGPA of 8.9. These 
                accomplishments reflect my dedication, consistency, and ability to excel in challenging environments.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                Hobbies & Sports: Beyond technology, I am a passionate sportsman. I play cricket and have represented 
                my college in various competitions. Sports have taught me discipline, teamwork, leadership, and resilience. 
                I strongly believe that maintaining a balance between academics and physical activity is key to overall growth.
              </p>

              <div className="pt-4 space-y-4">
                {[
                  '2nd Year CSE Student at Heritage Institute of Technology',
                  'Specializing in IoT, Blockchain, and Cybersecurity',
                  'College Cricket Player - Represented in competitions',
                  'Passionate about building real-world projects'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {achievements.slice(0, 2).map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="p-4 bg-[#0D1424] border border-slate-800 rounded-xl">
                    <Icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Education & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Education Timeline */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                Education
              </h3>
              
              {education.map((edu, index) => {
                const Icon = edu.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                    <div className="relative p-5 bg-[#0D1424] border border-slate-800 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{edu.degree}</h4>
                          <p className="text-sm text-slate-400 mb-2">{edu.institution}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                              {edu.year}
                            </span>
                            <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                              {edu.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Skills */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-pink-400" />
                Technical Expertise
              </h3>
              
              {skills.map((skillGroup, groupIndex) => {
                const Icon = skillGroup.icon
                return (
                  <motion.div
                    key={groupIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + groupIndex * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                    <div className="relative p-5 bg-[#0D1424] border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${skillGroup.color} bg-opacity-20 flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-white font-medium">{skillGroup.category}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.9 + groupIndex * 0.1 + skillIndex * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Philosophy Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl" />
              <div className="relative p-6 bg-[#0D1424] border border-slate-800 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <span className="font-semibold text-blue-400">My Philosophy:</span> My personal philosophy is to 
                      continually learn, experiment, and challenge myself. I aim to combine technical skills with creativity 
                      to build innovative solutions. This portfolio is a reflection of my journey, showcasing both my 
                      accomplishments and aspirations, highlighting my commitment to excellence and lifelong learning.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 text-sm font-mono tracking-wider">
            • ENGINEERING • INNOVATION • CREATIVITY • EXCELLENCE •
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
      `}</style>
    </section>
  )
}