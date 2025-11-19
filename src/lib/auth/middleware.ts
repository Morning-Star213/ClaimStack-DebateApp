import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from './session'

export async function requireAuth(request: NextRequest): Promise<{ user: any; error: null } | { user: null; error: NextResponse }> {
  const session = await getSessionFromRequest()

  if (!session) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    }
  }

  return { user: session, error: null }
}

export async function optionalAuth(request: NextRequest) {
  return await getSessionFromRequest()
}

