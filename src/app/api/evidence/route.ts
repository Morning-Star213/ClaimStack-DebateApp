import { NextRequest, NextResponse } from 'next/server'

// GET /api/evidence - Get evidence for a claim
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const claimId = searchParams.get('claimId')
    const position = searchParams.get('position') // 'for' or 'against'
    const sort = searchParams.get('sort') || 'score' // 'score', 'recent', 'votes'

    if (!claimId) {
      return NextResponse.json(
        { error: 'claimId is required' },
        { status: 400 }
      )
    }

    // TODO: Implement database query
    // const evidence = await getEvidenceByClaimId(claimId, { position, sort })

    return NextResponse.json({ evidence: [] })
  } catch (error) {
    console.error('Error fetching evidence:', error)
    return NextResponse.json(
      { error: 'Failed to fetch evidence' },
      { status: 500 }
    )
  }
}

// POST /api/evidence - Create new evidence
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { claimId, type, position, url, fileUrl, description, metadata } = body

    // TODO: Validate input
    // TODO: If file, upload to S3/Supabase
    // TODO: If URL, fetch oEmbed metadata
    // TODO: Create evidence in database
    // TODO: Trigger AI summary update

    return NextResponse.json(
      { message: 'Evidence created successfully', evidenceId: 'new-id' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating evidence:', error)
    return NextResponse.json(
      { error: 'Failed to create evidence' },
      { status: 500 }
    )
  }
}

