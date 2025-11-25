import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that are publicly accessible without authentication
const publicRoutes = ['/']

// Routes that should redirect to home if authenticated
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('claimstack_session')?.value

  // Allow access to public routes without authentication
  const isPublicRoute = publicRoutes.some((route) => pathname === route)
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if route is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Allow access to auth routes without authentication
  if (isAuthRoute) {
    // Redirect to browse if already authenticated
    if (sessionToken) {
      return NextResponse.redirect(new URL('/browse', request.url))
    }
    // Allow access to auth pages if not authenticated
    return NextResponse.next()
  }

  // Redirect to home page if accessing any other route without session
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

