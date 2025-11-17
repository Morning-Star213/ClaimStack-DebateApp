import { NextRequest, NextResponse } from 'next/server'

// GET /api/claims - Get all claims with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort') || 'newest'
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // TODO: Implement database query
    // const claims = await getClaims({ sort, category, search, page, limit })

    return NextResponse.json({
      claims: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
    })
  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json(
      { error: 'Failed to fetch claims' },
      { status: 500 }
    )
  }
}

// POST /api/claims - Create a new claim
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, categoryId, evidence } = body

    // TODO: Validate input
    // TODO: Create claim in database
    // TODO: If evidence provided, create evidence
    // TODO: Trigger AI summary generation

    return NextResponse.json(
      { message: 'Claim created successfully', claimId: 'new-id' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating claim:', error)
    return NextResponse.json(
      { error: 'Failed to create claim' },
      { status: 500 }
    )
  }
}

