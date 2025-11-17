'use client'

import React, { useState } from 'react'
import { ContentCard } from '@/components/content/ContentCard'
import { Claim } from '@/lib/types'
import { SearchIcon } from '@/components/ui/Icons'
import { FilterButton } from '@/components/ui/FilterButton'
import { FilterValues } from '@/components/ui/FilterModal'

// Mock data
const mockClaims: Claim[] = Array(6).fill({
  id: '1',
  userId: '1',
  title: 'Study: Effects of Caffeine on Memory (Nature, 2022)',
  description: 'This randomized trial with 300 participants showed a 12% increase in recall tasks among caffeine users.',
  status: 'approved',
  viewCount: 1234,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: '1',
    email: 'test@example.com',
    username: 'evidenceHunter',
    firstName: 'Dr. Emily',
    lastName: 'Watson',
    role: 'user',
    createdAt: new Date(),
  },
}).map((claim, index) => ({ ...claim, id: String(index + 1) }))

const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'most-voted', label: 'Most Voted' },
  { id: 'most-viewed', label: 'Most Viewed' },
  { id: 'most-followed', label: 'Most Followed' },
  { id: 'oldest', label: 'Oldest' },
]

export default function BrowsePage() {
  const [activeTab, setActiveTab] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterValues | null>(null)

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
    // Apply filters to your data here
    console.log('Filters applied:', newFilters)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[46px] font-semibold text-[#030303]">Browse The Claims</h1>
          <div className="flex-1 w-full sm:max-w-full sm:ml-4 lg:ml-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search claims, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-100 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
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
          <FilterButton 
            onFiltersChange={handleFiltersChange}
            buttonClassName="text-xs sm:text-sm px-3 sm:px-4"
            iconSize="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {mockClaims.map((claim) => (
            <ContentCard key={claim.id} item={claim} />
          ))}
        </div>
      </div>
    </div>
  )
}

