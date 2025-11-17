'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const categories = [
  'Animals & Nature',
  'Entertainment & Pop Culture',
  'Law & Justice',
  'Religion & Spirituality',
  'Art & Literature',
  'Environment',
  'Parenting & Family',
  'Science & Technology',
  'Business & Finance',
  'Fashion & Lifestyle',
  'Philosophy & Ethics',
  'Self-Improvement',
  'Consumer Products',
  'Food & Nutrition',
  'Politics',
  'Social Issues',
  'Economics',
  'Health & Wellness',
  'Psychology & Behavior',
  'Sports',
  'Education',
  'History',
  'Relationships',
  'Travel & Culture',
]

export const PreLoginHeader: React.FC = () => {
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <header className="w-[1440px] bg-[#eef4ff] z-50 mx-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">ClaimstackAI</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-12 pl-16">
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesHovered(true)}
                onMouseLeave={() => setIsCategoriesHovered(false)}
              >
                <button
                  type="button"
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    isCategoriesHovered
                      ? 'text-blue-600 bg-blue-50 border border-blue-600'
                      : 'text-gray-900 hover:text-gray-700'
                  }`}
                >
                  Categories
                </button>

                {/* Categories Dropdown */}
                {isCategoriesHovered && (
                  <div className="absolute top-full left-0 mt-2 w-[900px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50">
                    <div className="grid grid-cols-4 gap-x-6 gap-y-3">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/browse?category=${encodeURIComponent(category)}`}
                          className={`px-6 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                            hoveredCategory === category
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/browse?sort=trending"
                className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                Trending
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Log In
            </Link>
            <Button variant="primary" size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

