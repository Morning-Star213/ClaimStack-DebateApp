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
    <Card className="p-4 sm:p-6 rounded-2xl sm:rounded-[32px]">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm text-[#030303] font-medium">@{user?.username || 'user'}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">  
          <ShareIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      {title && (
        titleHref ? (
          <Link href={titleHref}>
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2 leading-tight">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2 leading-tight">
            {title}
          </h3>
        )
      )}

      {description && (
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 font-normal leading-relaxed">{description}</p>
      )}

      {user && (
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="flex flex-row items-center gap-1 sm:gap-2 flex-wrap">
            <div className="text-xs sm:text-sm text-[#030303] font-medium">Author:</div> 
            <span>{user.firstName} {user.lastName}</span>
          </span>
        </div>
      )}

      <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onFollow?.(itemId)}
            className="bg-black text-white hover:bg-gray-800 rounded-full text-xs sm:text-sm px-3 sm:px-4 flex-shrink-0"
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

