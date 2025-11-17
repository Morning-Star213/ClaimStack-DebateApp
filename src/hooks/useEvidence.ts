'use client'

import { useState, useEffect } from 'react'
import { Evidence } from '@/lib/types'

interface UseEvidenceOptions {
  claimId: string
  position?: 'for' | 'against'
  sort?: 'score' | 'recent' | 'votes'
}

export function useEvidence(options: UseEvidenceOptions) {
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!options.claimId) return

    const fetchEvidence = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('claimId', options.claimId)
        if (options.position) params.append('position', options.position)
        if (options.sort) params.append('sort', options.sort)

        const response = await fetch(`/api/evidence?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch evidence')

        const data = await response.json()
        setEvidence(data.evidence || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setEvidence([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvidence()
  }, [options.claimId, options.position, options.sort])

  return { evidence, loading, error, refetch: () => {} }
}

