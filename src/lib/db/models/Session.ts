import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISession extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  sessionToken: string
  expires: Date
  createdAt: Date
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Indexes
SessionSchema.index({ sessionToken: 1 })
SessionSchema.index({ userId: 1 })
SessionSchema.index({ expires: 1 })

const Session: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema)

export default Session

