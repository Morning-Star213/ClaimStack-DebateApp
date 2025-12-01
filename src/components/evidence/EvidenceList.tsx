'use client'

import React from 'react'
import { Evidence } from '@/lib/types'
import { ContentCard } from '@/components/content/ContentCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface EvidenceListProps {
  evidence: Evidence[]
  loading?: boolean
  onVote?: (evidenceId: string, voteType: 'upvote' | 'downvote') => void
  onFollow?: (evidenceId: string) => void
  getUserVote?: (evidenceId: string) => 'upvote' | 'downvote' | null
  isFollowing?: (evidenceId: string) => boolean
}

export const EvidenceList: React.FC<EvidenceListProps> = ({
  evidence,
  loading,
  onVote,
  onFollow,
  getUserVote,
  isFollowing,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (evidence.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No evidence found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {evidence.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          onVote={onVote}
          onFollow={onFollow}
          userVote={getUserVote?.(item.id)}
          isFollowing={isFollowing?.(item.id)}
        />
      ))}
    </div>
  )
}

