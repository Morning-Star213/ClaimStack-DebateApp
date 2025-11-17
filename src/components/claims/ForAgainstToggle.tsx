'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface ForAgainstToggleProps {
  position: 'for' | 'against'
  onChange: (position: 'for' | 'against') => void
  forCount?: number
  againstCount?: number
  className?: string
  fullWidth?: boolean
}

export const ForAgainstToggle: React.FC<ForAgainstToggleProps> = ({
  position,
  onChange,
  forCount,
  againstCount,
  className,
  fullWidth = false,
}) => {
  return (
    <div className={cn(
      'flex items-center gap-2',
      fullWidth ? 'w-full' : 'inline-flex',
      className
    )}>
      <button
        onClick={() => onChange('for')}
        className={cn(
          'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 border',
          fullWidth && 'flex-1',
          position === 'for'
            ? 'bg-blue-50 text-blue-600 border-blue-200'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
        )}
      >
        <span>For</span>
        {forCount !== undefined && (
          <span
            className={cn(
              'w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-medium',
              position === 'for' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            )}
          >
            {forCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onChange('against')}
        className={cn(
          'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 border',
          fullWidth && 'flex-1',
          position === 'against'
            ? 'bg-red-50 text-red-600 border-red-200'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
        )}
      >
        <span>Against</span>
        {againstCount !== undefined && (
          <span
            className={cn(
              'w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-medium',
              position === 'against' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
            )}
          >
            {againstCount}
          </span>
        )}
      </button>
    </div>
  )
}

