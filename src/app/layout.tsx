import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ClaimStack.ai - Evidence-Based Debate Platform',
  description: 'Join structured, evidence-based debates. Submit claims, add evidence, and let the best arguments win.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

