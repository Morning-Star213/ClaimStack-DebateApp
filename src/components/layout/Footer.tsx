import React from 'react'
import Link from 'next/link'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">ClaimstackAI</h3>
            <p className="text-sm">© {currentYear} Digital Marketing Schools, LLC.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-2">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-white transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors">
                    Category
                  </Link>
                </li>
                <li>
                  <Link href="/browse?sort=trending" className="hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

