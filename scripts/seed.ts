import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local automatically
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const lines = readFileSync(envPath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex === -1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      const val = trimmed.slice(eqIndex + 1).trim()
      if (key && !process.env[key]) process.env[key] = val
    }
  } catch {
    // .env.local not found, rely on existing env vars
  }
}
loadEnv()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in environment variables')
  process.exit(1)
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables')
  process.exit(1)
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
})

const SiteSettingsSchema = new mongoose.Schema({
  heroName: { type: String, default: 'Atul Jha' },
  heroTitle: { type: String, default: 'Full Stack Developer' },
  heroSubtitle: { type: String, default: 'Aspiring Full-Stack Developer' },
  heroDescription: {
    type: String,
    default:
      "I'm a passionate Computer Science student exploring the world of web development. Currently learning modern stacks like React, Next.js, Blockchain and MongoDB.",
  },
  aboutText: {
    type: String,
    default:
      'Computer Science student at Heritage Institute of Technology with a passion for emerging technologies. I thrive on building innovative solutions that combine creativity with technical excellence.',
  },
  githubUrl: { type: String, default: 'https://github.com/atuljha-tech' },
  linkedinUrl: { type: String, default: 'https://linkedin.com/in/atuljha275' },
  email: { type: String, default: 'atuljha275@gmail.com' },
  location: { type: String, default: 'Kolkata, India' },
  cgpa: { type: String, default: '8.9' },
  batch: { type: String, default: '2024-2028' },
  college: { type: String, default: 'Heritage Institute of Technology' },
})

async function seed() {
  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI!)

  const User = mongoose.models.User || mongoose.model('User', UserSchema)
  const SiteSettings =
    mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)

  // Create admin user
  const existingUser = await User.findOne({ email: ADMIN_EMAIL!.toLowerCase() })
  if (existingUser) {
    console.log('⚠️  Admin user already exists, updating password...')
    const hashed = await bcrypt.hash(ADMIN_PASSWORD!, 12)
    await User.updateOne({ email: ADMIN_EMAIL!.toLowerCase() }, { password: hashed })
    console.log('✅ Admin password updated')
  } else {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD!, 12)
    await User.create({ email: ADMIN_EMAIL!.toLowerCase(), password: hashed, role: 'admin' })
    console.log('✅ Admin user created:', ADMIN_EMAIL)
  }

  // Create default site settings
  const existingSettings = await SiteSettings.findOne()
  if (!existingSettings) {
    await SiteSettings.create({})
    console.log('✅ Default site settings created')
  } else {
    console.log('⚠️  Site settings already exist, skipping...')
  }

  await mongoose.disconnect()
  console.log('🎉 Seed complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
