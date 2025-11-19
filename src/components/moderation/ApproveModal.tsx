'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { CheckmarkIcon } from '@/components/ui/Icons'
import { useClaimsStore } from '@/store/claimsStore'

interface ApproveModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  claimId?: string
}

export const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  claimId,
}) => {
  const { approveClaim } = useClaimsStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirm = async () => {
    if (!claimId) {
      onConfirm()
      return
    }

    setIsProcessing(true)
    try {
      const result = await approveClaim(claimId)
      if (result.success) {
        onConfirm()
      } else {
        console.error('Failed to approve claim:', result.error)
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error approving claim:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="space-y-4">
        <div className="flex flex-col font-semibold text-2xl items-center justify-center py-4">
          Are You Sure You Want To{' '}
          <div className="text-blue-600 font-semibold">Approve This Content?</div>
        </div>
        <p className="text-gray-600 items-center font-medium text-lg">This action will:</p>
        <ul className="space-y-2 bg-gray-100 p-4 rounded-2xl text-sm">
          <li className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <CheckmarkIcon />
            </div>
            <span>Mark this evidence as <span className='font-medium'>"Approved"</span></span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <CheckmarkIcon />
            </div>
            <span>Publish it to the <span className='font-medium'>public</span> Claim Page</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <CheckmarkIcon />
            </div>
            <span><span className='font-medium'>Update</span> the AI summary</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <CheckmarkIcon />
            </div>
            <span>Record this action in the <span className='font-medium'>moderation log</span></span>
          </li>
        </ul>
        <div className="flex flex-col justify-end space-y-3 pt-4">
          <Button 
            variant="primary" 
            onClick={handleConfirm} 
            className='rounded-full'
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Approve and Publish'}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className='rounded-full'
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

