// oEmbed client for fetching metadata from social media platforms

export interface OEmbedData {
  type: 'video' | 'photo' | 'link' | 'rich'
  title?: string
  description?: string
  thumbnail?: string
  url: string
  provider: string
  html?: string
  width?: number
  height?: number
}

export async function fetchOEmbed(url: string): Promise<OEmbedData> {
  const provider = detectProvider(url)

  switch (provider) {
    case 'youtube':
      return fetchYouTubeOEmbed(url)
    case 'tiktok':
      return fetchTikTokOEmbed(url)
    case 'instagram':
      return fetchInstagramOEmbed(url)
    case 'twitter':
      return fetchTwitterOEmbed(url)
    default:
      return fetchGenericOEmbed(url)
  }
}

function detectProvider(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('tiktok.com')) return 'tiktok'
  if (url.includes('instagram.com')) return 'instagram'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
  return 'generic'
}

async function fetchYouTubeOEmbed(url: string): Promise<OEmbedData> {
  // TODO: Implement YouTube oEmbed
  // const videoId = extractYouTubeId(url)
  // const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`)
  
  return {
    type: 'video',
    title: 'YouTube Video',
    url,
    provider: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  }
}

async function fetchTikTokOEmbed(url: string): Promise<OEmbedData> {
  // TODO: Implement TikTok oEmbed
  // TikTok requires special handling - may need their embed API
  
  return {
    type: 'video',
    title: 'TikTok Video',
    url,
    provider: 'tiktok',
  }
}

async function fetchInstagramOEmbed(url: string): Promise<OEmbedData> {
  // TODO: Implement Instagram oEmbed
  // Instagram requires access token for oEmbed API
  
  return {
    type: 'rich',
    title: 'Instagram Post',
    url,
    provider: 'instagram',
  }
}

async function fetchTwitterOEmbed(url: string): Promise<OEmbedData> {
  // TODO: Implement Twitter/X oEmbed
  // const response = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`)
  
  return {
    type: 'rich',
    title: 'Tweet',
    url,
    provider: 'twitter',
  }
}

async function fetchGenericOEmbed(url: string): Promise<OEmbedData> {
  // Try to fetch Open Graph metadata
  try {
    // TODO: Fetch page and extract OG tags
    // const response = await fetch(url)
    // const html = await response.text()
    // Extract og:title, og:description, og:image, etc.
    
    return {
      type: 'link',
      title: 'Link',
      url,
      provider: 'generic',
    }
  } catch (error) {
    throw new Error('Failed to fetch oEmbed data')
  }
}

