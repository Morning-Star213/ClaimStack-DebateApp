import mongoose, { Schema, Document, Model } from 'mongoose'
import { VoteType } from './Vote'

export interface IPerspectiveVote extends Document {
  _id: string
  perspectiveId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  voteType: VoteType
  createdAt: Date
}

const PerspectiveVoteSchema = new Schema<IPerspectiveVote>(
  {
    perspectiveId: {
      type: Schema.Types.ObjectId,
      ref: 'Perspective',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    voteType: {
      type: String,
      enum: Object.values(VoteType),
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

// Compound unique index
PerspectiveVoteSchema.index({ perspectiveId: 1, userId: 1 }, { unique: true })
PerspectiveVoteSchema.index({ perspectiveId: 1 })
PerspectiveVoteSchema.index({ userId: 1 })

const PerspectiveVote: Model<IPerspectiveVote> =
  mongoose.models.PerspectiveVote || mongoose.model<IPerspectiveVote>('PerspectiveVote', PerspectiveVoteSchema)

export default PerspectiveVote

