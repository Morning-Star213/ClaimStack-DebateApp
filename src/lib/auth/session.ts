import connectDB from '@/lib/db/mongoose'
import { Session, User } from '@/lib/db/models'
import { signToken, verifyToken, JWTPayload } from './jwt'
import { cookies } from 'next/headers'
import mongoose from 'mongoose'

const SESSION_COOKIE_NAME = 'claimstack_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function createSession(userId: string, userData: JWTPayload): Promise<string> {
  // Ensure database connection
  await connectDB()

  // Generate session token
  const sessionToken = signToken(userData)

  // Store session in database
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000)
  await Session.create({
    userId: new mongoose.Types.ObjectId(userId),
    sessionToken,
    expires,
  })

  return sessionToken
}

export async function getSession(sessionToken: string): Promise<JWTPayload | null> {
  try {
    // Ensure database connection
    await connectDB()

    // Verify token
    const payload = verifyToken(sessionToken)
    if (!payload) {
      return null
    }

    // Check if session exists in database
    const session = await Session.findOne({ sessionToken }).populate('userId')

    if (!session || session.expires < new Date()) {
      return null
    }

    const user = await User.findById(session.userId)
    if (!user) {
      return null
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
    }
  } catch (error) {
    // If database is unavailable (e.g., during build), return null
    // This allows the build to continue without failing
    // In runtime, log the error but don't throw
    if (error instanceof Error && error.message.includes('ETIMEDOUT')) {
      // Connection timeout - likely during build or DB unavailable
      return null
    }
    console.error('Session error:', error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  // Ensure database connection
  await connectDB()

  await Session.deleteMany({ sessionToken })
}

export async function getSessionFromRequest(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionToken) {
      return null
    }

    return getSession(sessionToken)
  } catch (error) {
    // Handle case where cookies() is called outside of a request context
    return null
  }
}

