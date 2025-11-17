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
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center my-5">
          <Link
            href="/browse"
            className="inline-flex text-xl items-center font-semibold text-[#030303] hover:text-gray-900 mb-6"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-6" />
            Profile
          </Link>
          <Link
              href="/profile/edit"
              className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50"
            >
            <span>Edit Profile</span>
            <EditIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={mockUser.avatarUrl}
              alt={mockUser.username}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {mockUser.firstName} {mockUser.lastName}
              </h1>
              <p className="text-gray-600">@{mockUser.username}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {profileButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveTab(button.id)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
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


        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockClaims.map((claim) => (
            <ContentCard key={claim.id} item={claim} />
          ))}
        </div>
      </div>
    </div>
  )
}

