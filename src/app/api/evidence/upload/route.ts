import { NextRequest, NextResponse } from 'next/server'

// POST /api/evidence/upload - Upload evidence file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

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
        { error: 'File exceeds maximum size of 25MB' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'video/mp4']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    // TODO: Upload to S3 or Supabase Storage
    // const fileUrl = await uploadFile(file)

    // Mock response
    const fileUrl = `https://storage.example.com/uploads/${file.name}`

    return NextResponse.json({
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

