'use client'

import React, { useState, useRef } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { ArrowUpIcon, CheckIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/utils/cn'

interface EscalateModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

type ReviewerType = 'legal' | 'admin' | 'policy'

const acceptedFormats = ['pdf', 'docx', 'jpg', 'png', 'mp4']
const maxSize = 25 * 1024 * 1024 // 25MB

export const EscalateModal: React.FC<EscalateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('Possible Violation Of National Disinformation Laws And Terms Of Use. Content Source Anonymous And Unverifiable.')
  const [internalNotes, setInternalNotes] = useState('')
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerType>('legal')
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file size
    if (selectedFile.size > maxSize) {
      setFileError('File exceeds maximum size.')
      setFile(null)
      return
    }

    // Validate file type
    const extension = selectedFile.name.split('.').pop()?.toLowerCase()
    if (!extension || !acceptedFormats.includes(extension)) {
      setFileError(`Accepted formats: ${acceptedFormats.join(', ')}`)
      setFile(null)
      return
    }

    setFile(selectedFile)
    setFileError(null)
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
    >
      <div className="flex flex-row py-5">
        {/* Left Section - Use this action if */}
        <div className="flex flex-col flex-1 pr-6 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-col font-semibold text-2xl items-center justify-center pb-4">
            <span className="text-gray-900 dark:text-gray-100">Are You Sure You Want To</span>
            <div className="text-gray-900 dark:text-gray-100">Reject This Content?</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Use this action if:</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-800 rounded-2xl p-4">
            <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The content may violate local/international law</span>
            </li>
            <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The user is a repeat offender or spreading harmful content</span>
            </li>
            <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The claim involves sensitive personal data or potential abuse</span>
            </li>
            <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Platform-level policy is unclear</span>
            </li>
            </ul>
          </div>
          <div className="pt-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold items-center text-gray-900 dark:text-gray-100">Who should review this?</h3>
              <div className="space-y-2">
              <button
                  type="button"
                  onClick={() => setSelectedReviewer('legal')}
                  className={`w-full px-4 py-2 rounded-full border-2 text-left transition-colors ${
                  selectedReviewer === 'legal'
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                  Legal Team
              </button>
              <button
                  type="button"
                  onClick={() => setSelectedReviewer('admin')}
                  className={`w-full px-4 py-2 rounded-full border-2 text-left transition-colors ${
                  selectedReviewer === 'admin'
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                  System Administrator
              </button>
              <button
                  type="button"
                  onClick={() => setSelectedReviewer('policy')}
                  className={`w-full px-4 py-2 rounded-full border-2 text-left transition-colors ${
                  selectedReviewer === 'policy'
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                  Content Policy Lead
              </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section - Escalation and Upload */}
        <div className="flex flex-col flex-1 pl-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                Reason for escalation (required):
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                Attach internal notes or links <span className="text-gray-500 dark:text-gray-400">(optional)</span>:
              </label>
              <input
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter internal notes or links"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload File
              </label>
              <div className={cn(
                'bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border',
                fileError ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              )}>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={acceptedFormats.map((f) => `.${f}`).join(',')}
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-white dark:bg-gray-700 rounded-full px-4 py-2 flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <span>Upload File</span>
                  <ArrowUpIcon className="w-5 h-5" />
                </Button>
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                
                {file && !fileError && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                    </p>
                  </div>
                )}
                
                {fileError && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400">{fileError}</p>
                  </div>
                )}
                
                <div className="flex justify-between text-xs">
                  <span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Accepted formats:</span>{' '}
                    <span className="text-gray-500 dark:text-gray-400">{acceptedFormats.map(f => `.${f}`).join(', ')}</span>
                  </span>
                  <span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Max size:</span>{' '}
                    <span className="text-gray-500 dark:text-gray-400">25 MB</span>
                  </span>
                </div>
              </div>
            </div>
                      {/* Right - Action Buttons */}
          <div className="flex flex-col justify-end space-y-3">
            <Button variant="primary" onClick={handleConfirm} className='rounded-full'>
              Approve and Publish
            </Button>
            <Button variant="outline" onClick={onClose} className='rounded-full'>
              Cancel
            </Button>
          </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

