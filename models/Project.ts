import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
  name: string
  description: string
  techStack: string[]
  githubLink?: string
  liveLink?: string
  image?: string
  imagePublicId?: string
  category: string
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: [{ type: String, trim: true }],
    githubLink: { type: String, trim: true },
    liveLink: { type: String, trim: true },
    image: { type: String },
    imagePublicId: { type: String },
    category: {
      type: String,
      required: true,
      enum: ['Blockchain', 'Web', 'AI/ML', 'Mobile', 'IoT', 'Cybersecurity', 'Other'],
      default: 'Web',
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
