'use client'

import { useState } from 'react'

interface VoteResult {
  upvotes: number
  downvotes: number
  score: number
  userVote: 'upvote' | 'downvote' | null
}

export function useVote(evidenceId: string, initialVote?: VoteResult) {
  const [vote, setVote] = useState<VoteResult>(
    initialVote || {
      upvotes: 0,
      downvotes: 0,
      score: 0,
      userVote: null,
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitVote = async (voteType: 'upvote' | 'downvote') => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidenceId, voteType }),
      })

      if (!response.ok) throw new Error('Failed to submit vote')

      const data = await response.json()
      setVote({
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        score: data.score,
        userVote: voteType,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const removeVote = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/votes?evidenceId=${evidenceId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to remove vote')

      // TODO: Get updated vote counts from response
      setVote((prev) => ({
        ...prev,
        userVote: null,
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    vote,
    loading,
    error,
    submitVote,
    removeVote,
  }
}

