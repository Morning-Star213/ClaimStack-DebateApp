'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

/**
 * Hook to check if user is authenticated before performing an action
 * If not authenticated, shows the login required modal
 * @returns A function that returns true if authenticated, false otherwise
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuthStore()
  const { openModal } = useUIStore()
  const router = useRouter()

  const requireAuth = (action?: () => void): boolean => {
    if (!isAuthenticated) {
      openModal('loginRequired')
      return false
    }
    if (action) {
      action()
    }
    return true
  }

  return { requireAuth, isAuthenticated }
}

/**
 * Hook to check if user can access a protected route
 * If not authenticated, shows the login required modal and prevents navigation
 */
export function useProtectedRoute() {
  const { isAuthenticated } = useAuthStore()
  const { openModal } = useUIStore()

  const canAccess = (route: string): boolean => {
    // Allow access to home page and auth pages
    if (route === '/' || route.startsWith('/login') || route.startsWith('/signup')) {
      return true
    }

    // Check if route is protected
    const protectedRoutes = ['/browse', '/claims', '/profile', '/moderation']
    const isProtected = protectedRoutes.some((r) => route.startsWith(r))

    if (isProtected && !isAuthenticated) {
      openModal('loginRequired')
      return false
    }

    return true
  }

  return { canAccess, isAuthenticated }
}

