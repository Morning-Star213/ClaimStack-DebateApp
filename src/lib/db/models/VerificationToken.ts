import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IVerificationToken extends Document {
  identifier: string
  token: string
  expires: Date
}

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    identifier: {
      type: String,
      required: true,
      maxlength: 255,
    },
    token: {
      type: String,
      required: true,
      maxlength: 255,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
  }
)

// Compound primary key
VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true })

const VerificationToken: Model<IVerificationToken> =
  mongoose.models.VerificationToken || mongoose.model<IVerificationToken>('VerificationToken', VerificationTokenSchema)

export default VerificationToken

