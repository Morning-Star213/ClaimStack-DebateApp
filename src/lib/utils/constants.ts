// App Constants

export const CATEGORIES = [
  { id: 'technology', name: 'Technology', slug: 'technology' },
  { id: 'health', name: 'Health & Wellness', slug: 'health' },
  { id: 'science', name: 'Science', slug: 'science' },
  { id: 'politics', name: 'Politics', slug: 'politics' },
  { id: 'economics', name: 'Economics', slug: 'economics' },
  { id: 'education', name: 'Education', slug: 'education' },
  { id: 'environment', name: 'Environment', slug: 'environment' },
  { id: 'social', name: 'Social Issues', slug: 'social' },
] as const

export const EVIDENCE_TYPES = [
  { value: 'url', label: 'URL' },
  { value: 'youtube', label: 'YouTube Video' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tweet', label: 'Tweet' },
  { value: 'file', label: 'Upload File' },
  { value: 'text', label: 'Text Statement' },
] as const

export const FILE_UPLOAD_CONFIG = {
  maxSize: 25 * 1024 * 1024, // 25MB
  acceptedFormats: ['pdf', 'docx', 'jpg', 'jpeg', 'png', 'mp4'],
  acceptedMimeTypes: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'video/mp4',
  ],
} as const

export const SORT_OPTIONS = {
  claims: [
    { value: 'newest', label: 'Newest' },
    { value: 'most-voted', label: 'Most Voted' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'most-followed', label: 'Most Followed' },
    { value: 'oldest', label: 'Oldest' },
  ],
  evidence: [
    { value: 'score', label: 'Highest Score' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'votes', label: 'Most Votes' },
  ],
} as const

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const

