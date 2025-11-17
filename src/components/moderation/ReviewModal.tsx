'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { FlagIcon, QuestionMarkIcon, LinkIcon } from '@/components/ui/Icons'
import { ApproveModal } from './ApproveModal'
import { RejectModal } from './RejectModal'
import { EscalateModal } from './EscalateModal'

export interface ModerationItem {
  id: string
  type: 'claim' | 'evidence'
  user: string
  date: string
  title: string
  flaggedBy: number
  reason: string
  link?: string
  status: 'pending' | 'reviewed'
  // Extended fields for detailed modal
  claimId?: string
  submittedDate?: string
  ipAddress?: string
  platform?: string
  userStrikeHistory?: string
  votesFor?: number
  votesAgainst?: number
  flagTimestamps?: Array<{ date: string; user: string }>
  imageUrl?: string
}

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  item: ModerationItem | null
  onApprove: () => void
  onReject: () => void
  onEscalate?: () => void
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  item,
  onApprove,
  onReject,
  onEscalate,
}) => {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false)

  if (!item) return null

  const handleApproveClick = () => {
    setIsApproveModalOpen(true)
  }

  const handleApproveConfirm = () => {
    setIsApproveModalOpen(false)
    onApprove()
  }

  const handleRejectClick = () => {
    setIsRejectModalOpen(true)
  }

  const handleRejectConfirm = () => {
    setIsRejectModalOpen(false)
    onReject()
  }

  const handleEscalateClick = () => {
    setIsEscalateModalOpen(true)
  }

  const handleEscalateConfirm = () => {
    setIsEscalateModalOpen(false)
    if (onEscalate) {
      onEscalate()
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        showCloseButton={false}
      >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-6">
        {/* Left Section: Claim Content */}
        <div className="space-y-5">
          <h2 className="text-xl font-semibold text-[#030303] mb-5">Claim Content</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{item.user}</span>
              <span>{item.date}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-blue-600 leading-tight">
              {item.title}
            </h3>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <FlagIcon className="w-4 h-4 text-gray-600" />
                <span>Flagged by: <strong className="text-[#030303]">{item.flaggedBy} users</strong></span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <QuestionMarkIcon className="w-4 h-4 text-gray-600" />
                <span>Reasons: <strong className="text-[#030303]">{item.reason}</strong></span>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mt-4">
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            {item.link && (
              <div className="text-gray-600 flex items-center space-x-2 text-sm pt-2">
                <LinkIcon className="w-4 h-4" />
                <span className="break-all">Link:</span>
                <div className=" text-blue-600">
                {item.link}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section: Metadata */}
        <div className="space-y-5 border-l border-gray-200 pl-8">
          <h2 className="text-xl font-semibold text-[#030303] mb-5">Metadata</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-600">Claim ID:</span>
              <span className="ml-2 font-medium text-[#030303]">{item.claimId || 'N/A'}</span>
            </div>
            
            <div>
              <span className="text-gray-600">Submitted:</span>
              <span className="ml-2 font-medium text-[#030303]">{item.submittedDate || 'N/A'}</span>
            </div>
            
            <div>
              <span className="text-gray-600">IP Address:</span>
              <span className="ml-2 font-medium text-[#030303]">{item.ipAddress || 'N/A'}</span>
            </div>
            
            <div>
              <span className="text-gray-600">Platform:</span>
              <span className="ml-2 font-medium text-[#030303]">{item.platform || 'N/A'}</span>
            </div>
            
            <div>
              <span className="text-gray-600">User Strike History:</span>
              <span className="ml-2 font-medium text-[#030303]">{item.userStrikeHistory || 'No prior violations'}</span>
            </div>
            
            <div>
              <span className="text-gray-600">Total Votes:</span>
              <span className="ml-2">
                <span className="font-medium text-blue-600">{item.votesFor || 0} For</span>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-red-600">{item.votesAgainst || 0} Against</span>
              </span>
            </div>
            
            {item.flagTimestamps && item.flagTimestamps.length > 0 && (
              <div>
                <span className="text-gray-600 block mb-2">Flag Timestamps:</span>
                <ul className="space-y-1 ml-4">
                  {item.flagTimestamps.map((flag, index) => (
                    <li key={index} className="text-[#030303]">
                      - {flag.date} ({flag.user})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-6 mt-6 border-t border-gray-200">
            <Button
              variant="primary"
              size="baseFull"
              onClick={handleApproveClick}
              className="w-full"
            >
              Approve and publish
            </Button>
            
            <Button
              variant="danger"
              size="baseFull"
              onClick={handleRejectClick}
              className="w-full"
            >
              Reject and log violation
            </Button>
            
            <Button
              variant="outline"
              size="baseFull"
              onClick={handleEscalateClick}
              className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Escalate to legal
            </Button>
          </div>
        </div>
      </div>
    </Modal>

    <ApproveModal
      isOpen={isApproveModalOpen}
      onClose={() => setIsApproveModalOpen(false)}
      onConfirm={handleApproveConfirm}
    />

    <RejectModal
      isOpen={isRejectModalOpen}
      onClose={() => setIsRejectModalOpen(false)}
      onConfirm={handleRejectConfirm}
    />

    <EscalateModal
      isOpen={isEscalateModalOpen}
      onClose={() => setIsEscalateModalOpen(false)}
      onConfirm={handleEscalateConfirm}
    />
    </>
  )
}

