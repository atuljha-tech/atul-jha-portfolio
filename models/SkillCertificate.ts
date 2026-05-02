import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISkillCertificate extends Document {
  name: string
  platform: string
  date: Date
  credentialUrl?: string
  image?: string
  imagePublicId?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const SkillCertificateSchema = new Schema<ISkillCertificate>(
  {
    name: { type: String, required: true, trim: true },
    platform: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    credentialUrl: { type: String, trim: true },
    image: { type: String },
    imagePublicId: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

SkillCertificateSchema.index({ order: 1, date: -1 })

const SkillCertificate: Model<ISkillCertificate> =
  mongoose.models.SkillCertificate ||
  mongoose.model<ISkillCertificate>('SkillCertificate', SkillCertificateSchema)

export default SkillCertificate
