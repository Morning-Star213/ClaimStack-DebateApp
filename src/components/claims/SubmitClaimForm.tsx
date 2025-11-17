'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Dropdown, DropdownOption } from '@/components/ui/Dropdown'
import { ForAgainstToggle } from '@/components/claims/ForAgainstToggle'
import { Button } from '@/components/ui/Button'
import { SuccessModal } from '@/components/ui/SuccessModal'

const categoryOptions: DropdownOption[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'science', label: 'Science' },
  { value: 'politics', label: 'Politics' },
  { value: 'economics', label: 'Economics' },
  { value: 'education', label: 'Education' },
]

const evidenceTypeOptions: DropdownOption[] = [
  { value: 'url', label: 'URL' },
  { value: 'youtube', label: 'YouTube Video' },
  { value: 'tweet', label: 'Tweet' },
  { value: 'file', label: 'Upload File' },
]

export interface SubmitClaimFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  isModal?: boolean
}

export const SubmitClaimForm: React.FC<SubmitClaimFormProps> = ({
  onSuccess,
  onCancel,
  isModal = false,
}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    evidenceType: 'url',
    evidenceUrl: '',
    evidenceDescription: '',
    position: 'for' as 'for' | 'against',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    category?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: { title?: string; category?: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a claim title'
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    setIsLoading(true)

    // TODO: Implement actual submission logic
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccessModalOpen(true)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Claim Title"
            placeholder="Enter your claim"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value })
              if (errors.title) {
                setErrors({ ...errors, title: undefined })
              }
            }}
            error={errors.title}
            className="w-full rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm items-start font-medium text-[#666666] mb-1">
            Select Category
          </label>
          <Dropdown
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => {
              setFormData({ ...formData, category: value })
              if (errors.category) {
                setErrors({ ...errors, category: undefined })
              }
            }}
            error={errors.category}
            placeholder="Category"
          />
        </div>
      </div>

      <Textarea
        label="Description (optional)"
        placeholder="Provide additional context"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        maxLength={500}
        showCharCount
      />

      <div>
        <h2 className="text-sm font-semibold text-[#666666] mb-2">
          Add Initial Evidence (optional)
        </h2>

        <div className="space-y-4">
          <div>
            <Dropdown
              options={evidenceTypeOptions}
              value={formData.evidenceType}
              onChange={(value) => setFormData({ ...formData, evidenceType: value })}
            />
          </div>

          <Input
            placeholder="https://example.com/article"
            value={formData.evidenceUrl}
            onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
            className="w-full rounded-full"
          />

          <Textarea
            placeholder="Brief description of the evidence"
            value={formData.evidenceDescription}
            onChange={(e) => setFormData({ ...formData, evidenceDescription: e.target.value })}
            maxLength={500}
            showCharCount
          />

          <div>
            <ForAgainstToggle
              position={formData.position}
              onChange={(pos) => setFormData({ ...formData, position: pos })}
              fullWidth
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pb-2">
        <Button type="submit" variant="primary" isLoading={isLoading} className='rounded-full w-full'>
          Submit Claim
        </Button>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          if (onSuccess) {
            onSuccess()
          } else if (!isModal) {
            router.push('/browse')
          }
        }}
        type="claim"
      />
    </form>
  )
}

