'use client'

import { useState, useEffect } from 'react'
import { Claim } from '@/lib/types'

interface UseClaimsOptions {
  sort?: 'newest' | 'most-voted' | 'most-viewed' | 'most-followed' | 'oldest'
  category?: string
  search?: string
  page?: number
  limit?: number
}

export function useClaims(options: UseClaimsOptions = {}) {
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (options.sort) params.append('sort', options.sort)
        if (options.category) params.append('category', options.category)
        if (options.search) params.append('search', options.search)
        if (options.page) params.append('page', options.page.toString())
        if (options.limit) params.append('limit', options.limit.toString())

        const response = await fetch(`/api/claims?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch claims')

        const data = await response.json()
        setClaims(data.claims || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setClaims([])
      } finally {
        setLoading(false)
      }
    }

    fetchClaims()
  }, [options.sort, options.category, options.search, options.page, options.limit])

  return { claims, loading, error, refetch: () => {} }
}

export function useClaim(claimId: string) {
  const [claim, setClaim] = useState<Claim | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!claimId) return

    const fetchClaim = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/claims/${claimId}`)
        if (!response.ok) throw new Error('Failed to fetch claim')

        const data = await response.json()
        setClaim(data.claim)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setClaim(null)
      } finally {
        setLoading(false)
      }
    }

    fetchClaim()
  }, [claimId])

  return { claim, loading, error }
}

