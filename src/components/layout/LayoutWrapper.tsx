'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { PreLoginHeader } from './PreLoginHeader'
import { Footer } from './Footer'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup')
  const isHomePage = pathname === '/'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isHomePage ? <PreLoginHeader /> : <Header />}
      <main className="flex-1 w-full max-w-[1440px] mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

