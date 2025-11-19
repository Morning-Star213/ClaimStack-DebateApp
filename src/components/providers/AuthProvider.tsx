'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkSession, isLoading } = useAuthStore()
  const [hasCheckedSession, setHasCheckedSession] = useState(false)

  useEffect(() => {
    // Check session on mount (only once)
    if (!hasCheckedSession) {
      checkSession().finally(() => {
        setHasCheckedSession(true)
      })
    }
  }, [checkSession, hasCheckedSession])

  // Show loading state only on initial session check
  if (!hasCheckedSession && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return <>{children}</>
}

