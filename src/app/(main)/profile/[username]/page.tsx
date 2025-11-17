'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ContentCard } from '@/components/content/ContentCard'
import { Claim } from '@/lib/types'
import { ChevronLeftIcon, EditIcon } from '@/components/ui/Icons'

// Mock data
const mockUser = {
  id: '1',
  username: 'critical_thinker',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: '/icons/user.png',
  bio: 'Passionate about evidence-based discussions',
}

const mockClaims: Claim[] = Array(6).fill({
  id: '1',
  userId: '1',
  title: 'Study: Effects of Caffeine on Memory (Nature, 2022)',
  description: 'This randomized trial with 300 participants showed a 12% increase in recall tasks among caffeine users.',
  status: 'approved' as const,
  viewCount: 1234,
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
}).map((claim, index) => ({ ...claim, id: String(index + 1) }))

const profileButtons = [
  { id: 'saved', label: 'Saved' },
  { id: 'claims', label: 'Claims' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'following', label: 'Following' },
]

export default function ProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('saved')

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Link
            href="/browse"
            className="inline-flex text-base sm:text-lg lg:text-xl items-center font-semibold text-[#030303] hover:text-gray-900"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-3 sm:mr-6" />
            <span className="hidden sm:inline">Profile</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Link
              href="/profile/edit"
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-full hover:bg-gray-50"
            >
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit</span>
            <EditIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <img
              src={mockUser.avatarUrl}
              alt={mockUser.username}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 sm:border-4 border-white shadow-lg flex-shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {mockUser.firstName} {mockUser.lastName}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">@{mockUser.username}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {profileButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveTab(button.id)}
                className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === button.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>


        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {mockClaims.map((claim) => (
            <ContentCard key={claim.id} item={claim} />
          ))}
        </div>
      </div>
    </div>
  )
}

