'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

// Routes that are publicly accessible without authentication
const publicRoutes = ['/']
// Auth routes that are accessible without authentication (for login/signup)
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    // Don't check during initial loading
    if (isLoading) {
      return
    }

    // Check if current route is public or auth route
    const isPublicRoute = publicRoutes.some((route) => pathname === route)
    const isAuthRoute = authRoutes.some((route) => pathname?.startsWith(route))

    // If not authenticated and trying to access a protected route, redirect to home
    if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
      router.replace('/')
    }
  }, [pathname, isAuthenticated, isLoading, router])

  // Don't render children if not authenticated and on a protected route
  if (!isLoading && !isAuthenticated) {
    const isPublicRoute = publicRoutes.some((route) => pathname === route)
    const isAuthRoute = authRoutes.some((route) => pathname?.startsWith(route))
    if (!isPublicRoute && !isAuthRoute) {
      return null
    }
  }

  return <>{children}</>
}

