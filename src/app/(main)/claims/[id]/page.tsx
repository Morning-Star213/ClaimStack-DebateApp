'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ClaimSummary } from '@/components/claims/ClaimSummary'
import { ForAgainstToggle } from '@/components/claims/ForAgainstToggle'
import { ContentCard } from '@/components/content/ContentCard'
import { EvidenceUpload } from '@/components/evidence/EvidenceUpload'
import { PerspectiveUpload } from '@/components/perspective/PerspectiveUpload'
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
  const [sortBy, setSortBy] = useState('recent')
  const [isSummariesExpanded, setIsSummariesExpanded] = useState(false)
  const [isSubmitEvidenceModalOpen, setIsSubmitEvidenceModalOpen] = useState(false)
  const [isSubmitPerspectiveModalOpen, setIsSubmitPerspectiveModalOpen] = useState(false)

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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link
          href="/browse"
          className="inline-flex items-center text-base sm:text-lg lg:text-xl font-semibold text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-3 sm:mr-6" />
          <span className="hidden sm:inline">Claim Detail Page</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Statement Section */}
        <div className="bg-[#F9F9F9] rounded-2xl sm:rounded-[32px] border border-[#DCDCDC] p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-normal text-[#666666]">Statement</h2>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600 p-1"
              onClick={() => setIsSummariesExpanded(!isSummariesExpanded)}
              aria-label="Toggle summaries"
            >
              {isSummariesExpanded ? (
                <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 sm:mb-10 leading-tight">{mockClaim.title}</p>
          {/* Summaries */}
          {isSummariesExpanded && (
            <ClaimSummary forSummary={mockClaim.forSummary} againstSummary={mockClaim.againstSummary} />
          )}
        </div>


        {/* Supporting Evidence Section */}
        <div className="mb-6 sm:mb-8 mt-6 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-[32px] font-semibold text-gray-900">Supporting Evidence</h2>
            <div className='flex flex-row gap-2'>
              <Button
                variant="primary"
                className="rounded-full text-xs sm:text-sm font-medium w-full sm:w-auto"
                onClick={() => setIsSubmitEvidenceModalOpen(true)}
              >
                Submit Evidence +
              </Button>
              <Button
                variant="primary"
                className="rounded-full text-xs sm:text-sm font-medium w-full sm:w-auto"
                onClick={() => setIsSubmitPerspectiveModalOpen(true)}
              >
                Submit Perspective +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <ForAgainstToggle
              position={position}
              onChange={setPosition}
              forCount={forEvidence.length}
              againstCount={againstEvidence.length}
              className="w-full sm:w-auto"
            />
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <button
                className={`px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'recent'
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setSortBy('recent')}
              >
                Recent
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-full border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <SortAscIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Sort</span>
              </button>
              <FilterButton 
                onFiltersChange={handleFiltersChange}
                buttonClassName="text-xs sm:text-sm px-3 sm:px-4"
                iconSize="w-3 h-3 sm:w-4 sm:h-5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {currentEvidence.map((evidence) => (
              <ContentCard key={evidence.id} item={evidence} onVote={onVote} />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Evidence Modal */}
      <Modal
        isOpen={isSubmitEvidenceModalOpen}
        onClose={() => setIsSubmitEvidenceModalOpen(false)}
        title="Submit Evidence"
      >
        <EvidenceUpload onUpload={handleUpload} onClose={() => setIsSubmitEvidenceModalOpen(false)} />
      </Modal>

      {/* Submit Perspective Modal */}
      <Modal
        isOpen={isSubmitPerspectiveModalOpen}
        onClose={() => setIsSubmitPerspectiveModalOpen(false)}
        title="Submit Perspective"
      >
        <PerspectiveUpload onUpload={handleUpload} onClose={() => setIsSubmitPerspectiveModalOpen(false)} />
      </Modal>
    </div>
  )
}

