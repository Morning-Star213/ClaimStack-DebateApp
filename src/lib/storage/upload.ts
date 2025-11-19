// Unified file upload handler for S3 or Supabase Storage

import { createClient } from '@supabase/supabase-js'

export interface UploadResult {
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
}

// Initialize Supabase client (server-side only)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResult> {
  const storageType = process.env.STORAGE_TYPE || 'supabase' // 's3' or 'supabase'

  if (storageType === 's3') {
    return uploadToS3(file, folder)
  } else {
    return uploadToSupabase(file, folder)
  }
}

async function uploadToS3(file: File, folder: string): Promise<UploadResult> {
  // TODO: Implement S3 upload
  // const s3Client = new S3Client({ ... })
  // const uploadParams = { ... }
  // const result = await s3Client.send(new PutObjectCommand(uploadParams))
  
  throw new Error('S3 upload not implemented')
}

async function uploadToSupabase(file: File, folder: string): Promise<UploadResult> {
  const supabase = getSupabaseClient()
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'claimstack-files'

  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const fileExtension = file.name.split('.').pop()
  const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`

  // Convert File to ArrayBuffer for Supabase
  const arrayBuffer = await file.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  if (!urlData?.publicUrl) {
    throw new Error('Failed to get public URL for uploaded file')
  }

  return {
    fileUrl: urlData.publicUrl,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  const storageType = process.env.STORAGE_TYPE || 'supabase'

  if (storageType === 's3') {
    // TODO: Implement S3 deletion
    throw new Error('S3 deletion not implemented')
  } else {
    await deleteFromSupabase(fileUrl)
  }
}

async function deleteFromSupabase(fileUrl: string): Promise<void> {
  const supabase = getSupabaseClient()
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'claimstack-files'

  // Extract file path from URL
  const urlParts = fileUrl.split('/')
  const fileName = urlParts.slice(urlParts.indexOf(bucket) + 1).join('/')

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

export function getPublicUrl(fileUrl: string): string {
  // For Supabase, the URL is already public
  return fileUrl
}

