import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().min(1, 'Description is required').max(2000),
  techStack: z.array(z.string()).min(1, 'At least one technology required'),
  githubLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  liveLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  category: z.enum(['Blockchain', 'Web', 'AI/ML', 'Mobile', 'IoT', 'Cybersecurity', 'Other']),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

export const hackathonCertificateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  organization: z.string().min(1, 'Organization is required').max(200),
  position: z.string().min(1, 'Position/Rank is required').max(100),
  date: z.string().min(1, 'Date is required'),
  description: z.string().max(1000).optional().or(z.literal('')),
  proofLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  order: z.number().default(0),
})

export const skillCertificateSchema = z.object({
  name: z.string().min(1, 'Certificate name is required').max(200),
  platform: z.string().min(1, 'Platform is required').max(100),
  date: z.string().min(1, 'Date is required'),
  credentialUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  order: z.number().default(0),
})

export const skillLearnedSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100),
  category: z.enum(['Frontend', 'Backend', 'Database', 'Blockchain', 'DevOps', 'Tools', 'Other']),
  proficiency: z.number().min(0).max(100),
  icon: z.string().max(10).optional().or(z.literal('')),
  order: z.number().default(0),
})

export const siteSettingsSchema = z.object({
  heroName: z.string().min(1).max(100),
  heroTitle: z.string().min(1).max(200),
  heroSubtitle: z.string().max(200).optional().or(z.literal('')),
  heroDescription: z.string().max(1000).optional().or(z.literal('')),
  aboutText: z.string().max(3000).optional().or(z.literal('')),
  resumeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitterUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  cgpa: z.string().max(10).optional().or(z.literal('')),
  batch: z.string().max(20).optional().or(z.literal('')),
  college: z.string().max(200).optional().or(z.literal('')),
})

export type LoginInput = z.infer<typeof loginSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type HackathonCertificateInput = z.infer<typeof hackathonCertificateSchema>
export type SkillCertificateInput = z.infer<typeof skillCertificateSchema>
export type SkillLearnedInput = z.infer<typeof skillLearnedSchema>
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
