'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    Sparkles,
    Code2,
    Coffee,
    Rocket,
    BookOpen,
    ChevronDown,
    Github,
    Linkedin,
    Mail,
    Heart,
    Zap,
    Cpu,
    Database  // Add this import
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'


export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 200 }
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            mouseX.set((clientX - centerX) * 0.02)
            mouseY.set((clientY - centerY) * 0.02)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const rotateX = useTransform(mouseYSpring, [-20, 20], [5, -5])
    const rotateY = useTransform(mouseXSpring, [-20, 20], [-5, 5])

    const learningStack = [
        { icon: Code2, label: 'React', color: 'from-blue-400 to-cyan-400' },
        { icon: Rocket, label: 'Next.js', color: 'from-purple-400 to-pink-400' },
        { icon: Cpu, label: 'Blockchain', color: 'from-pink-400 to-orange-400' },
        { icon: Database, label: 'MongoDB', color: 'from-green-400 to-emerald-400' },
    ]

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'from-purple-400 to-pink-400' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'from-blue-400 to-purple-400' },
        { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', color: 'from-pink-400 to-blue-400' },
    ]

    const floatingElements = [
        { Icon: Code2, delay: 0, x: -200, y: -150, size: 20, color: 'text-blue-500/20' },
        { Icon: Coffee, delay: 0.5, x: 220, y: -120, size: 24, color: 'text-purple-500/20' },
        { Icon: Rocket, delay: 1, x: -180, y: 180, size: 22, color: 'text-pink-500/20' },
        { Icon: Heart, delay: 1.5, x: 200, y: 150, size: 18, color: 'text-red-500/20' },
        { Icon: BookOpen, delay: 2, x: -150, y: -200, size: 20, color: 'text-blue-500/20' },
        { Icon: Sparkles, delay: 2.5, x: 180, y: -180, size: 16, color: 'text-purple-500/20' },
    ]

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-28 overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0D1424] to-[#0A0F1C]" id="home">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.05) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating elements */}
            {floatingElements.map(({ Icon, delay, x, y, size, color }, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${color}`}
                    initial={{ opacity: 0, x, y }}
                    animate={{
                        opacity: 0.5,
                        x: [x, x + 40, x - 30, x],
                        y: [y, y - 30, y + 40, y],
                    }}
                    transition={{
                        opacity: { duration: 1, delay },
                        x: { duration: 25, repeat: Infinity, ease: "linear" },
                        y: { duration: 30, repeat: Infinity, ease: "linear" },
                    }}
                >
                    <Icon size={size} />
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-7xl mx-auto w-full"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500" />
                        <div className="relative px-6 py-3 bg-[#0D1424] rounded-full border border-slate-800 flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-slate-300">
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                                    Passionate CS Student
                                </span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformPerspective: 1000,
                        }}
                        className="text-left"
                    >
                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-4"
                        >
                            <span className="text-slate-400 text-lg font-light flex items-center gap-2">
                                <span className="w-8 h-px bg-gradient-to-r from-blue-400 to-purple-400" />
                                Hi, I'm
                            </span>
                        </motion.div>

                        {/* Name with animated gradient */}
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black mb-4"
                        >
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
                                Atul
                            </span>
                        </motion.h1>

                        {/* Role with typing effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-6 flex items-center gap-3"
                        >
                            <Code2 className="w-6 h-6 text-purple-400" />
                            <span className="text-xl md:text-2xl text-slate-300 font-light">
                                Aspiring Full-Stack Developer
                            </span>
                            <motion.div
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="w-0.5 h-6 bg-gradient-to-r from-blue-400 to-purple-400"
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-8"
                        >
                            I'm a passionate Computer Science student exploring the world of web development.
                            Currently learning modern stacks like <span className="text-white font-semibold">React</span>,{' '}
                            <span className="text-white font-semibold">Next.js</span>,{' '}
                            <span className="text-white font-semibold">Blockchain</span> and{' '}
                            <span className="text-white font-semibold">MongoDB</span>.
                            Eager to build full-stack projects and grow into a skilled developer.
                        </motion.p>

                        {/* Learning Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mb-8"
                        >
                            <p className="text-xs text-slate-500 font-mono mb-3 tracking-wider">
                                CURRENTLY EXPLORING
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {learningStack.map(({ icon: Icon, label, color }, index) => (
                                    <motion.div
                                        key={label}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="relative group"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg opacity-0 group-hover:opacity-30 blur transition duration-300`} />
                                        <div className="relative px-4 py-2 bg-[#0D1424] rounded-lg border border-slate-800 group-hover:border-transparent flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm font-medium text-slate-300">{label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex items-center gap-4"
                        >
                            {socialLinks.map(({ icon: Icon, href, label, color }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="relative group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300`} />
                                    <div className="relative w-12 h-12 rounded-full bg-[#0D1424] border border-slate-800 group-hover:border-transparent flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative flex justify-center items-center"
                    >
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            {/* Animated rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-3 rounded-full border-2 border-dashed border-pink-500/30"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-6 rounded-full border-2 border-dashed border-blue-500/30"
                            />

                            {/* Glowing background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />

                           {/* Image container */}
<div className="absolute inset-8 rounded-full overflow-hidden border-4 border-slate-800/50 shadow-2xl">
  <Image
    src="/atuljha.jpeg"  // or simply "atuljha.jpeg"
    alt="Atul"
    width={400}
    height={400}
    className="object-cover w-full h-full"
    priority
  />
</div>

                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 px-4 py-2 bg-[#0D1424] rounded-full border border-slate-800 shadow-xl"
                            >
                                <span className="text-sm font-medium flex items-center gap-2">
                                    <Rocket className="w-4 h-4 text-purple-400" />
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Learning</span>
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 px-4 py-2 bg-[#0D1424] rounded-full border border-slate-800 shadow-xl"
                            >
                                <span className="text-sm font-medium flex items-center gap-2">
                                    <Coffee className="w-4 h-4 text-pink-400" />
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Coding</span>
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300" />
                        <div className="relative w-10 h-16 border-2 border-slate-700 rounded-full flex justify-center cursor-pointer"
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                            <motion.div
                                animate={{ height: [6, 20, 6], y: [2, 0, 2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

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