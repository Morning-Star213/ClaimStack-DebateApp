'use client'

import React, { useState } from 'react'
import { FilterIcon } from './Icons'
import { FilterModal, FilterValues } from './FilterModal'
import { cn } from '@/lib/utils/cn'

export interface FilterButtonProps {
  onFiltersChange?: (filters: FilterValues) => void
  initialFilters?: FilterValues
  className?: string
  buttonClassName?: string
  iconSize?: string
  textSize?: string
}

const defaultFilters: FilterValues = {
  category: 'technology',
  date: 'last-24h',
  evidenceAttached: 'all',
  yourInteractions: 'followed',
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  onFiltersChange,
  initialFilters = defaultFilters,
  className,
  buttonClassName,
  iconSize = 'w-5 h-5',
  textSize = 'text-sm',
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<FilterValues>(initialFilters)

  const handleApplyFilters = (filters: FilterValues) => {
    setCurrentFilters(filters)
    onFiltersChange?.(filters)
  }

  // Calculate active filter count (filters that are not default)
  const getActiveFilterCount = (): number => {
    let count = 0
    if (currentFilters.category !== defaultFilters.category) count++
    if (currentFilters.date !== defaultFilters.date) count++
    if (currentFilters.evidenceAttached !== defaultFilters.evidenceAttached) count++
    if (currentFilters.yourInteractions !== defaultFilters.yourInteractions) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="relative">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={cn(
          'flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors',
          buttonClassName
        )}
      >
        <FilterIcon className={iconSize} />
        <span className={textSize}>Filters</span>
        {activeFilterCount > 0 && (
          <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isFilterOpen && (
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
          initialFilters={currentFilters}
        />
      )}
    </div>
  )
}

