'use client'

import React from 'react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/store/uiStore'

export const LoginRequiredModal: React.FC = () => {
  const { modals, closeModal } = useUIStore()
  const isOpen = modals.loginRequired || false

  const handleClose = () => {
    closeModal('loginRequired')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={false}
      size="sm"
    >
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          You must be logged in to vote
        </h2>
        <div className="flex flex-col gap-3 w-full pt-5">
          <Button
            variant="primary"
            size="baseFull"
            className="bg-black text-white hover:bg-gray-800 rounded-full"
            asChild
          >
            <Link href="/login" onClick={handleClose}>
              Log In
            </Link>
          </Button>
          <Button
            variant="outline"
            size="baseFull"
            className="border border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full"
            asChild
          >
            <Link href="/signup" onClick={handleClose}>
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

