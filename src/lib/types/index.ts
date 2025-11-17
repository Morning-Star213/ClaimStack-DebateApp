// User Types
export interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  bio?: string
  role: 'user' | 'moderator' | 'admin'
  createdAt: Date
}

// Claim Types
export interface Claim {
  id: string
  userId: string
  title: string
  description?: string
  categoryId?: string
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  forSummary?: string
  againstSummary?: string
  summaryUpdatedAt?: Date
  viewCount: number
  createdAt: Date
  updatedAt: Date
  user?: User
  category?: Category
  evidenceCount?: {
    for: number
    against: number
  }
}

// Evidence Types
export interface Evidence {
  id: string
  claimId: string
  userId: string
  type: 'url' | 'file' | 'tweet' | 'youtube' | 'tiktok' | 'instagram' | 'text'
  position: 'for' | 'against'
  title?: string
  description?: string
  url?: string
  fileUrl?: string
  fileName?: string
  fileSize?: number
  fileType?: string
  metadata?: Record<string, any>
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  upvotes: number
  downvotes: number
  score: number
  createdAt: Date
  updatedAt: Date
  user?: User
  claim?: Claim
}

// Vote Types
export interface Vote {
  id: string
  evidenceId: string
  userId: string
  voteType: 'upvote' | 'downvote'
  createdAt: Date
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'new_evidence' | 'new_comment' | 'evidence_approved' | 'evidence_rejected' | 'claim_updated' | 'new_follower' | 'vote_received'
  title: string
  message?: string
  link?: string
  read: boolean
  createdAt: Date
}

// Flag Types
export interface Flag {
  id: string
  claimId?: string
  evidenceId?: string
  userId: string
  reason: 'misinformation' | 'spam' | 'harassment' | 'inappropriate' | 'copyright' | 'other'
  description?: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  createdAt: Date
}

