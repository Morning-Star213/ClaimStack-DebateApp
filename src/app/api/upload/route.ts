import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/middleware'
import { uploadFile } from '@/lib/storage/upload'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(request)
    if (authResult.error) {
      return authResult.error
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (25MB max)
    const maxSize = 25 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 25MB' },
        { status: 400 }
      )
    }

    // Validate file type
    const acceptedFormats = ['pdf', 'docx', 'jpg', 'jpeg', 'png', 'mp4']
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !acceptedFormats.includes(extension)) {
      return NextResponse.json(
        { error: `Invalid file type. Accepted formats: ${acceptedFormats.join(', ')}` },
        { status: 400 }
      )
    }

    // Upload file
    const uploadResult = await uploadFile(file, folder)

    return NextResponse.json({
      success: true,
      data: uploadResult,
    })
  } catch (error) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

