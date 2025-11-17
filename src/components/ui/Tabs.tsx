'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface Tab {
  id: string
  label: string
  count?: number
}

export type { Tab as TabType }

export interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn('border-b border-gray-200', className)}>
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn('ml-2', activeTab === tab.id ? 'text-blue-600' : 'text-gray-500')}>
                ({tab.count})
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

