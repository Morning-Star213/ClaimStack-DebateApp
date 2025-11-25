'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { PreLoginHeader } from './PreLoginHeader'
import { Footer } from './Footer'
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal'
import { RouteGuard } from '@/components/auth/RouteGuard'
import { useAuth } from '@/hooks/useAuth'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/forgot-password') || pathname?.startsWith('/reset-password')
  const isHomePage = pathname === '/'

  if (isAuthPage) {
    return <>{children}</>
  }

  // On home page, always show PreLoginHeader (it handles auth state internally)
  // On other pages, always show Header
  const shouldShowPreLoginHeader = isHomePage

  return (
    <RouteGuard>
      <div className="min-h-screen flex flex-col">
        {shouldShowPreLoginHeader ? <PreLoginHeader />  : <Header />}
        {isHomePage ?       
        <div 
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 'min(1109px, 100vh)',
            background: 'linear-gradient(to bottom,#eef4ff, rgba(16, 102, 222, 0))',
          }}
        />  : <></>}
        
        <main className="flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden">{children}</main>
        <Footer />
        <LoginRequiredModal />
      </div>
    </RouteGuard>
  )
}

