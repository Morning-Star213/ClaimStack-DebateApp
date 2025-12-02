import { NextRequest, NextResponse } from 'next/server'

// Mark route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    let url: URL
    try {
      url = new URL(targetUrl)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return NextResponse.json(
        { error: 'Only HTTP and HTTPS URLs are allowed' },
        { status: 400 }
      )
    }

    // Fetch the content from the target URL
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': url.origin,
      },
      // Set a timeout
      signal: AbortSignal.timeout(30000), // 30 seconds
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch content: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    // Get the content type
    const contentType = response.headers.get('content-type') || 'text/html'

    // If it's HTML, we need to process it
    if (contentType.includes('text/html')) {
      let html = await response.text()

      // Rewrite URLs to be absolute or relative to our proxy
      const baseUrl = new URL(targetUrl)
      const proxyBase = new URL(request.url)
      proxyBase.search = ''
      proxyBase.pathname = '/api/proxy'

      // Add base tag to help with relative URLs - this ensures resources load from original domain
      if (!html.includes('<base')) {
        html = html.replace(
          /<head[^>]*>/i,
          `$&<base href="${baseUrl.href}">`
        )
      }

      // Fix relative URLs in the HTML to be absolute (so they load from original domain)
      // This is important for CSS, JS, images, etc.
      html = html.replace(
        /(href|src|action|background|cite|data|formaction|poster|profile)=["']([^"']+)["']/gi,
        (match, attr, urlValue) => {
          try {
            // Skip if already absolute
            if (urlValue.startsWith('http://') || urlValue.startsWith('https://') || urlValue.startsWith('//')) {
              return match
            }
            // Skip data URLs, mailto, tel, javascript, etc.
            if (urlValue.startsWith('data:') || 
                urlValue.startsWith('mailto:') || 
                urlValue.startsWith('tel:') || 
                urlValue.startsWith('#') ||
                urlValue.startsWith('javascript:') ||
                urlValue.startsWith('about:')) {
              return match
            }
            // Convert relative URL to absolute (loads from original domain)
            const absoluteUrl = new URL(urlValue, baseUrl).href
            return `${attr}="${absoluteUrl}"`
          } catch {
            return match
          }
        }
      )

      // Fix URLs in CSS (url(...)) to be absolute
      html = html.replace(
        /url\(["']?([^"')]+)["']?\)/gi,
        (match, urlValue) => {
          try {
            // Skip if already absolute or special protocol
            if (urlValue.startsWith('http://') || 
                urlValue.startsWith('https://') || 
                urlValue.startsWith('//') ||
                urlValue.startsWith('data:') ||
                urlValue.startsWith('#')) {
              return match
            }
            // Convert relative URL to absolute (loads from original domain)
            const absoluteUrl = new URL(urlValue, baseUrl).href
            return `url("${absoluteUrl}")`
          } catch {
            return match
          }
        }
      )

      // Remove X-Frame-Options and CSP frame-ancestors from meta tags
      html = html.replace(/<meta[^>]*http-equiv=["']X-Frame-Options["'][^>]*>/gi, '')
      html = html.replace(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '')

      // Return the processed HTML with headers that allow embedding
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Frame-Options': 'SAMEORIGIN', // Allow embedding from same origin
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    }

    // For non-HTML content, return as-is
    const content = await response.arrayBuffer()
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'X-Frame-Options': 'SAMEORIGIN',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Handle timeout
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout' },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to proxy request', details: errorMessage },
      { status: 500 }
    )
  }
}

