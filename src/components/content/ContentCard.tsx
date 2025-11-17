'use client'

import React from 'react'
import Link from 'next/link'
import { Claim, Evidence } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { VoteButtons } from '@/components/voting/VoteButtons'
import { ShareIcon, UserIcon } from '@/components/ui/Icons'

interface ContentCardProps {
  item: Claim | Evidence
  onFollow?: (itemId: string) => void
  onVote?: (itemId: string, voteType: 'upvote' | 'downvote') => void
  userVote?: 'upvote' | 'downvote' | null
  isFollowing?: boolean
  href?: string
}

// Type guard to check if item is Evidence
function isEvidence(item: Claim | Evidence): item is Evidence {
  return 'upvotes' in item && 'downvotes' in item && 'position' in item
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onFollow,
  onVote,
  userVote,
  isFollowing = false,
  href,
}) => {
  const isEvidenceItem = isEvidence(item)
  const title = item.title || ''
  const description = item.description
  const user = item.user
  const itemId = item.id

  // For claims, use the provided href or default to /claims/{id}
  // For evidence, don't make title clickable unless href is provided
  const titleHref = href || (isEvidenceItem ? undefined : `/claims/${itemId}`)

  // Get vote counts - evidence has them, claims default to 0
  const upvotes = isEvidenceItem ? item.upvotes : 0
  const downvotes = isEvidenceItem ? item.downvotes : 0

  return (
    <Card className="p-6 rounded-[32px]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#030303] font-medium">@{user?.username || 'user'}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">  
          <ShareIcon className="w-4 h-4" />
        </button>
      </div>

      {title && (
        titleHref ? (
          <Link href={titleHref}>
            <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2">
            {title}
          </h3>
        )
      )}

      {description && (
        <p className="text-gray-600 text-sm mb-4 font-normal">{description}</p>
      )}

      {user && (
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <UserIcon className="w-4 h-4" />
          <span className="flex flex-row items-center gap-2">
            <div className="text-sm text-[#030303] font-medium">Author:</div> {user.firstName} {user.lastName}
          </span>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onFollow?.(itemId)}
            className="bg-black text-white hover:bg-gray-800 rounded-full"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>

          <VoteButtons
            upvotes={upvotes}
            downvotes={downvotes}
            userVote={userVote}
            onVote={(voteType) => onVote?.(itemId, voteType)}
          />
        </div>
      </div>
    </Card>
  )
}

