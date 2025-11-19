import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUserFollow extends Document {
  _id: string
  followerId: mongoose.Types.ObjectId
  followingId: mongoose.Types.ObjectId
  createdAt: Date
}

const UserFollowSchema = new Schema<IUserFollow>(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
UserFollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true })
UserFollowSchema.index({ followerId: 1 })
UserFollowSchema.index({ followingId: 1 })

const UserFollow: Model<IUserFollow> =
  mongoose.models.UserFollow || mongoose.model<IUserFollow>('UserFollow', UserFollowSchema)

export default UserFollow

