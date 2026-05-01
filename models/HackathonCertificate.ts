import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IHackathonCertificate extends Document {
  title: string
  image?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const HackathonCertificateSchema = new Schema<IHackathonCertificate>(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const HackathonCertificate: Model<IHackathonCertificate> =
  mongoose.models.HackathonCertificate ||
  mongoose.model<IHackathonCertificate>('HackathonCertificate', HackathonCertificateSchema)

export default HackathonCertificate
