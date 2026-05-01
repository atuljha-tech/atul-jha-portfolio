import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IHackathonCertificate extends Document {
  title: string
  organization: string
  position: string
  date: Date
  image?: string
  imagePublicId?: string
  description?: string
  proofLink?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const HackathonCertificateSchema = new Schema<IHackathonCertificate>(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    description: { type: String },
    proofLink: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const HackathonCertificate: Model<IHackathonCertificate> =
  mongoose.models.HackathonCertificate ||
  mongoose.model<IHackathonCertificate>('HackathonCertificate', HackathonCertificateSchema)

export default HackathonCertificate
