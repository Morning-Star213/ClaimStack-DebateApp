import mongoose, { Schema, Document, Model } from 'mongoose'

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export interface IVote extends Document {
  _id: string
  evidenceId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  voteType: VoteType
  createdAt: Date
}

const VoteSchema = new Schema<IVote>(
  {
    evidenceId: {
      type: Schema.Types.ObjectId,
      ref: 'Evidence',
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
VoteSchema.index({ evidenceId: 1, userId: 1 }, { unique: true })
VoteSchema.index({ evidenceId: 1 })
VoteSchema.index({ userId: 1 })

const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema)

export default Vote

