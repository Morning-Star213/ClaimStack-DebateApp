'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ContentCard } from '@/components/content/ContentCard'
import { Claim } from '@/lib/types'
import Image from 'next/image'
import { SortAscIcon } from '@/components/ui/Icons'
import { FilterButton } from '@/components/ui/FilterButton'
import { FilterValues } from '@/components/ui/FilterModal'

// Mock data - replace with real data
const mockClaims: Claim[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
]

export default function HomePage() {
  const [activeButton, setActiveButton] = useState<'sort' | 'recent'>('recent')
  const [filters, setFilters] = useState<FilterValues | null>(null)

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
    // Apply filters to your data here
    console.log('Filters applied:', newFilters)
  }

  return (
    <div className="bg-gray-50 relative">
      {/* Linear Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1109px',
          background: 'linear-gradient(to bottom,#eef4ff, rgba(16, 102, 222, 0))',
        }}
      />
      {/* Hero Section */}
      <section className="py-16 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-[64px] md:w-2/3 mx-auto font-bold text-gray-900 mb-4 leading-[1.5]">
              Your Claim, Strengthened By Collective Evidence.
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Join Us... Choose A Side... <br/>In The Sea Of Online Debates...
            </p>
            <Button variant="primary" size="base" className="border border-blue-300 border-solid rounded-full " asChild>
              <Link href="/browse">Browse</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="pb-8 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-semibold text-gray-900 mb-4">How ClaimStack Works</h2>
            <p className="text-xl font-medium text-gray-600 pb-[20px]">
              Choose a side, stack the evidence, and let the best argument win.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-[350px] rounded-lg flex items-center justify-center relative">
              <Image
                src="/images/claimstack-mindshare.png"
                alt="ClaimStack AI - Debate Platform"
                fill
                className="object-contain"
                priority
                quality={90}
                sizes="100vw"
              />
            </div>
            <div>
              <p className="text-xl font-normal text-gray-700 leading-relaxed mb-4">
                In the sea of online debates, valuable arguments often get lost or go unheard.
                ClaimStack simplifies these discussions, bringing both sides of any topic into
                focus.
              </p>
              <p className="text-xl font-normal text-gray-700 leading-relaxed mb-4">
                Upload link, or share evidence from videos and articles to social media posts.
                Vote on the evidence that makes the strongest case. The best arguments rise to the
                top, and our AI synthesizes them into clear, unbiased summaries you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Feed Section */}
      <section className="py-16 relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Claim Feed</h2>
          <div className="flex items-center justify-between mb-8 pt-5">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="baseFull"
                onClick={() => setActiveButton('sort')}
                className={`flex round-full items-center space-x-2 ${
                  activeButton === 'sort'
                    ? '!border-blue-600 !text-blue-600 bg-blue-50'
                    : '!border-gray-300 bg-gray-100 !text-gray-700'
                }`}
              >
                <SortAscIcon className="w-4 h-4" />
                <span>Sort</span>
              </Button>
              <Button
                variant="outline"
                size="baseFull"
                onClick={() => setActiveButton('recent')}
                className={`round-full ${
                  activeButton === 'recent'
                    ? '!border-blue-600 !text-blue-600 bg-blue-50 font-medium'
                    : '!border-gray-300 bg-gray-100 !text-gray-700'
                }`}
              >
                Recent
              </Button>
            </div>
            <FilterButton
              onFiltersChange={handleFiltersChange}
              buttonClassName="!border-gray-300 bg-gray-100 !text-gray-700"
              iconSize="w-4 h-4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockClaims.map((claim) => (
              <ContentCard key={claim.id} item={claim} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Show More</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

