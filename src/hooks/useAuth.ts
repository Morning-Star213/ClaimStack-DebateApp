'use client'

import { useState, useEffect } from 'react'
import { User } from '@/lib/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Get user from session/auth
    // For now, return null
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Implement login
    return { success: false }
  }

  const logout = async () => {
    // TODO: Implement logout
    setUser(null)
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}

