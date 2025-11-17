'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SearchIcon, ClockIcon, FlagIcon, QuestionMarkIcon, LinkIcon } from '@/components/ui/Icons'
import { FilterButton } from '@/components/ui/FilterButton'
import { FilterValues } from '@/components/ui/FilterModal'
import { ReviewModal } from '@/components/moderation/ReviewModal'

const sortOptions = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'flagged', label: 'Most Flagged' },
  { id: 'severity', label: 'Severity' },
]

interface ModerationItem {
  id: string
  type: 'claim' | 'evidence'
  user: string
  date: string
  title: string
  flaggedBy: number
  reason: string
  link?: string
  status: 'pending' | 'reviewed'
  // Extended fields for detailed modal
  claimId?: string
  submittedDate?: string
  ipAddress?: string
  platform?: string
  userStrikeHistory?: string
  votesFor?: number
  votesAgainst?: number
  flagTimestamps?: Array<{ date: string; user: string }>
  imageUrl?: string
}

const mockItems: ModerationItem[] = Array(9).fill({
  id: '1',
  type: 'claim' as const,
  user: '@JohnDoe',
  date: '14 Jun 2025',
  title: 'COVID Vaccines Lead To Infertility, According To This Study',
  flaggedBy: 5,
  reason: 'Misinformation',
  link: 'https://example.com/article-about-claim',
  status: 'pending' as const,
  claimId: '8827-xyq',
  submittedDate: '15 June 2025, 14:03 UTC',
  ipAddress: '45.67.23.89 (UK)',
  platform: 'Web',
  userStrikeHistory: '1 prior rejection',
  votesFor: 12,
  votesAgainst: 3,
  flagTimestamps: [
    { date: '15 Jun, 14:15', user: 'user1' },
    { date: '16 Jun, 10:05', user: 'user2' },
  ],
}).map((item, index) => ({ ...item, id: String(index + 1) }))

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterValues | null>(null)
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
    // Apply filters to your data here
    console.log('Filters applied:', newFilters)
  }

  const handleReview = (item: ModerationItem) => {
    setSelectedItem(item)
    setIsReviewModalOpen(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-[46px] font-semibold text-[#030303]">Moderation Pannel</h1>
          <div className="flex-1 max-w-full sm:ml-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search claims, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveTab(option.id)}
                className={`px-3 sm:px-4 py-[6px] rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === option.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end sm:justify-start">
            <FilterButton 
              onFiltersChange={handleFiltersChange}
              buttonClassName="text-xs sm:text-sm px-3 sm:px-4"
              iconSize="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockItems.map((item) => (
            <Card key={item.id} className="p-4 sm:p-6 rounded-lg sm:rounded-[32px]">
              <div className="border-b border-gray-200 mb-3 sm:mb-4">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-200 text-black text-xs font-medium rounded-full">
                    Claim
                  </span>
                  {item.status === 'pending' && (
                    <span className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-200 text-black text-xs font-medium rounded-full flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-3 sm:mb-4">
                <div className="border-b border-gray-200 mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-black">{item.user}</span>
                    <span className="text-xs sm:text-sm text-black">{item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-blue-600 mb-2 sm:mb-3">{item.title}</h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600 border-b border-gray-200 mb-3 sm:mb-4 pb-3 sm:pb-4">
                  <span className="flex items-center space-x-1">
                    <FlagIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Flagged by: <strong className="text-[#030303]">{item.flaggedBy} users</strong></span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <QuestionMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Reasons: <strong className="text-[#030303]">{item.reason}</strong></span>
                  </span>
                </div>
                {item.link && (
                  <p className="text-xs sm:text-sm text-blue-600 mt-2 flex items-center space-x-1 border-b border-gray-200 mb-3 sm:mb-4 pb-3 sm:pb-4">
                    <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="break-all">{item.link}</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => handleReview(item)}
                className="w-full px-4 py-2 sm:py-3 border border-gray-200 text-black text-xs sm:text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Review Item
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false)
          setSelectedItem(null)
        }}
        item={selectedItem}
        onApprove={() => {
          setIsReviewModalOpen(false)
          setIsApproveModalOpen(true)
        }}
        onReject={() => {
          setIsReviewModalOpen(false)
          setIsRejectModalOpen(true)
        }}
        onEscalate={() => {
          console.log('Escalate to legal')
        }}
      />
    </div>
  )
}

