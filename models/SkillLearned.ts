import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISkillLearned extends Document {
  name: string
  category: string
  proficiency: number
  icon?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const SkillLearnedSchema = new Schema<ISkillLearned>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Blockchain', 'DevOps', 'Tools', 'Other'],
    },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const SkillLearned: Model<ISkillLearned> =
  mongoose.models.SkillLearned ||
  mongoose.model<ISkillLearned>('SkillLearned', SkillLearnedSchema)

export default SkillLearned
