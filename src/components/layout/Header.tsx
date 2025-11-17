'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { MenuIcon } from '@/components/ui/Icons'
import { Modal } from '@/components/ui/Modal'
import { SubmitClaimForm } from '@/components/claims/SubmitClaimForm'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  
  const isBrowseActive = pathname?.startsWith('/browse')
  const isModerationActive = pathname?.startsWith('/moderation')

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">ClaimstackAI</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 pl-5">
              <Link
                href="/browse"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isBrowseActive
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse The Claims
              </Link>
              <Link
                href="/moderation"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isModerationActive
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Moderation Pannel
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Submit Claim
            </Button>
            
            <NotificationBell />
            
            {/* User Avatar */}
            <Link href="/profile" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/browse"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isBrowseActive
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse The Claims
              </Link>
              <Link
                href="/moderation"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isModerationActive
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Moderation Pannel
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Submit Claim Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit A Claim"
        size="lg"
      >
        <SubmitClaimForm
          isModal
          onCancel={() => setIsSubmitModalOpen(false)}
          onSuccess={() => {
            setIsSubmitModalOpen(false)
            router.push('/browse')
          }}
        />
      </Modal>
    </header>
  )
}

