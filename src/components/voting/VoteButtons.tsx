'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { ArrowUpIcon, ArrowDownIcon } from '@/components/ui/Icons'

export interface VoteButtonsProps {
  upvotes: number
  downvotes: number
  userVote?: 'upvote' | 'downvote' | null
  onVote?: (voteType: 'upvote' | 'downvote') => void
  disabled?: boolean
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({
  upvotes,
  downvotes,
  userVote,
  onVote,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => !disabled && onVote?.('upvote')}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors',
          userVote === 'upvote'
            ? 'border-blue-600 text-blue-600'
            : 'border-blue-200 text-blue-600 hover:border-blue-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="text-sm font-medium">+{upvotes}</span>
        <ArrowUpIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => !disabled && onVote?.('downvote')}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors',
          userVote === 'downvote'
            ? 'border-red-600 text-red-600'
            : 'border-red-200 text-red-600 hover:border-red-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="text-sm font-medium">+{downvotes}</span>
        <ArrowDownIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

