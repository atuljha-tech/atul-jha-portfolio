import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISiteSettings extends Document {
  heroName: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutText: string
  aboutImage?: string
  aboutImagePublicId?: string
  resumeUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  email?: string
  location?: string
  cgpa?: string
  batch?: string
  college?: string
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    heroName: { type: String, default: 'Atul Jha' },
    heroTitle: { type: String, default: 'Full Stack Developer' },
    heroSubtitle: { type: String, default: 'Aspiring Full-Stack Developer' },
    heroDescription: { type: String, default: '' },
    aboutText: { type: String, default: '' },
    aboutImage: { type: String },
    aboutImagePublicId: { type: String },
    resumeUrl: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    email: { type: String },
    location: { type: String },
    cgpa: { type: String },
    batch: { type: String },
    college: { type: String },
  },
  { timestamps: true }
)

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export default SiteSettings
