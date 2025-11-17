'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ClaimSummary } from '@/components/claims/ClaimSummary'
import { ForAgainstToggle } from '@/components/claims/ForAgainstToggle'
import { ContentCard } from '@/components/content/ContentCard'
import { EvidenceUpload } from '@/components/evidence/EvidenceUpload'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, FilterIcon, SortAscIcon } from '@/components/ui/Icons'
import { Evidence } from '@/lib/types'
import { FilterButton } from '@/components/ui/FilterButton'
import { FilterValues } from '@/components/ui/FilterModal'

// Mock data
const mockClaim = {
  id: '1',
  title: 'Caffeine improves memory retention in adults.',
  forSummary:
    'Most studies show a short-term boost in memory performance after moderate caffeine consumption, but long-term effects remain inconclusive.',
  againstSummary:
    'The claim suggests that caffeine has a consistent and measurable positive effect on adult memory retention, supported by empirical evidence.',
}

const mockEvidence: Evidence[] = Array(4).fill({
  id: '1',
  claimId: '1',
  userId: '1',
  type: 'url' as const,
  position: 'for' as const,
  title: 'Study: Effects of Caffeine on Memory (Nature, 2022)',
  description: 'This randomized trial with 300 participants showed a 12% increase in recall tasks among caffeine users.',
  status: 'approved' as const,
  upvotes: 12,
  downvotes: 9,
  score: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: {
    id: '1',
    email: 'test@example.com',
    username: 'evidenceHunter',
    firstName: 'Dr. Emily',
    lastName: 'Watson',
    role: 'user' as const,
    createdAt: new Date(),
  },
}).map((evidence, index) => ({ ...evidence, id: String(index + 1) }))

export default function ClaimDetailPage() {
  const params = useParams()
  const [position, setPosition] = useState<'for' | 'against'>('for')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [isSummariesExpanded, setIsSummariesExpanded] = useState(false)

  const forEvidence = mockEvidence.filter((e) => e.position === 'for')
  const againstEvidence = mockEvidence.filter((e) => e.position === 'against')

  const currentEvidence = position === 'for' ? forEvidence : againstEvidence
  const [filters, setFilters] = useState<FilterValues | null>(null)

  const handleUpload = (data: any) => {
    console.log('Upload evidence:', data)
    // TODO: Implement upload logic
    // Don't close modal here - EvidenceUpload will show success modal and handle closing
  }

  const onVote = (evidenceId: string, voteType: 'upvote' | 'downvote') => {
    console.log('Vote on evidence:', evidenceId, voteType)
    // TODO: Implement vote logic
  }

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
    // Apply filters to your data here
    console.log('Filters applied:', newFilters)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/browse"
          className="inline-flex items-center text-xl font-semibold text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-6" />
          Claim Detail Page
        </Link>

        {/* Statement Section */}
        <div className="bg-[#F9F9F9] rounded-[32px] border border-[#DCDCDC] p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-normal text-[#666666]">Statement</h2>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setIsSummariesExpanded(!isSummariesExpanded)}
            >
              {isSummariesExpanded ? (
                <ChevronDownIcon className="w-5 h-5" />
              ) : (
                <ChevronUpIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-5xl font-semibold text-gray-900 mb-10">{mockClaim.title}</p>
          {/* Summaries */}
          {isSummariesExpanded && (
            <ClaimSummary forSummary={mockClaim.forSummary} againstSummary={mockClaim.againstSummary} />
          )}
        </div>


        {/* Supporting Evidence Section */}
        <div className="mb-8 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] font-semibold text-gray-900">Supporting Evidence</h2>
            <Button
              variant="primary"
              className="rounded-full text-sm font-[500px]"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Submit Evidence +
            </Button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <ForAgainstToggle
              position={position}
              onChange={setPosition}
              forCount={forEvidence.length}
              againstCount={againstEvidence.length}
            />
            <div className="flex items-center space-x-4">
              <button
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'recent'
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setSortBy('recent')}
              >
                Recent
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <SortAscIcon className="w-4 h-4" />
                <span>Sort</span>
              </button>
              <FilterButton onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentEvidence.map((evidence) => (
              <ContentCard key={evidence.id} item={evidence} onVote={onVote} />
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Submit Evidence"
      >
        <EvidenceUpload
          onUpload={handleUpload}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

