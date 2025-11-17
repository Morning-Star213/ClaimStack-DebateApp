'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownOption } from '@/components/ui/Dropdown'

interface ClaimFiltersProps {
  onApply: (filters: FilterState) => void
  activeFilters: number
}

export interface FilterState {
  category?: string
  dateRange?: string
  evidenceAttached?: string
  followed?: boolean
}

const categoryOptions: DropdownOption[] = [
  { value: '', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'science', label: 'Science' },
  { value: 'politics', label: 'Politics' },
  { value: 'economics', label: 'Economics' },
]

const dateRangeOptions: DropdownOption[] = [
  { value: 'all', label: 'All Time' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
]

const evidenceOptions: DropdownOption[] = [
  { value: 'all', label: 'All' },
  { value: 'with', label: 'With Evidence' },
  { value: 'without', label: 'Without Evidence' },
]

export const ClaimFilters: React.FC<ClaimFiltersProps> = ({
  onApply,
  activeFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    dateRange: 'all',
    evidenceAttached: 'all',
    followed: false,
  })

  const handleApply = () => {
    onApply(filters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: '',
      dateRange: 'all',
      evidenceAttached: 'all',
      followed: false,
    }
    setFilters(resetFilters)
    onApply(resetFilters)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span>Filters</span>
        {activeFilters > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilters}
          </span>
        )}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filters"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <Dropdown
              options={categoryOptions}
              value={filters.category || ''}
              onChange={(value) => setFilters({ ...filters, category: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <Dropdown
              options={dateRangeOptions}
              value={filters.dateRange || 'all'}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evidence Attached
            </label>
            <Dropdown
              options={evidenceOptions}
              value={filters.evidenceAttached || 'all'}
              onChange={(value) => setFilters({ ...filters, evidenceAttached: value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="followed"
              checked={filters.followed}
              onChange={(e) => setFilters({ ...filters, followed: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="followed" className="text-sm text-gray-700">
              Followed
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

