'use client'

import { useAuthStore } from '@/store/authStore'

/**
 * Hook to access authentication state and actions
 * This is a convenience wrapper around the auth store
 */
export function useAuth() {
  const {
    user,
    isLoading: loading,
    isAuthenticated,
    login,
    logout,
    checkSession,
  } = useAuthStore()

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkSession,
  }
}

