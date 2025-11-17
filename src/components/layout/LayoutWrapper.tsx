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
      {isHomePage ? <PreLoginHeader />  : <Header />}
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
    </div>
  )
}

