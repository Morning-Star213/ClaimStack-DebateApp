'use client'

import React from 'react'
import Link from 'next/link'
import { useProtectedRoute } from '@/hooks/useRequireAuth'

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

/**
 * Link component that checks authentication before navigating to protected routes
 * Shows login modal if user is not authenticated
 */
export const ProtectedLink: React.FC<ProtectedLinkProps> = ({
  href,
  children,
  className,
  onClick,
  ...props
}) => {
  const { canAccess } = useProtectedRoute()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if route requires authentication
    if (!canAccess(href)) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

