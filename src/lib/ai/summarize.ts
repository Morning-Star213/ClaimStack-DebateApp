// AI summary generation utilities

export interface SummaryOptions {
  evidence: Array<{
    position: 'for' | 'against'
    title?: string
    description?: string
    content?: string
  }>
  claimTitle: string
  claimDescription?: string
}

export interface SummaryResult {
  forSummary: string
  againstSummary: string
}

export async function generateSummaries(
  options: SummaryOptions
): Promise<SummaryResult> {
  const aiProvider = process.env.AI_PROVIDER || 'openai' // 'openai' or 'anthropic'

  if (aiProvider === 'openai') {
    return generateWithOpenAI(options)
  } else {
    return generateWithAnthropic(options)
  }
}

async function generateWithOpenAI(options: SummaryOptions): Promise<SummaryResult> {
  // TODO: Implement OpenAI API call
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  // const prompt = buildPrompt(options)
  // const response = await openai.chat.completions.create({ ... })
  
  // Mock response for now
  return {
    forSummary: 'AI-generated summary for the "For" position based on the provided evidence...',
    againstSummary: 'AI-generated steel man summary for the "Against" position...',
  }
}

async function generateWithAnthropic(options: SummaryOptions): Promise<SummaryResult> {
  // TODO: Implement Anthropic API call
  // const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  // const prompt = buildPrompt(options)
  // const response = await client.messages.create({ ... })
  
  // Mock response for now
  return {
    forSummary: 'AI-generated summary for the "For" position based on the provided evidence...',
    againstSummary: 'AI-generated steel man summary for the "Against" position...',
  }
}

function buildPrompt(options: SummaryOptions): string {
  const forEvidence = options.evidence.filter((e) => e.position === 'for')
  const againstEvidence = options.evidence.filter((e) => e.position === 'against')

  return `
Generate two summaries for the following claim:

Claim: ${options.claimTitle}
${options.claimDescription ? `Description: ${options.claimDescription}` : ''}

Evidence FOR the claim:
${forEvidence.map((e, i) => `${i + 1}. ${e.title || e.description || e.content}`).join('\n')}

Evidence AGAINST the claim:
${againstEvidence.map((e, i) => `${i + 1}. ${e.title || e.description || e.content}`).join('\n')}

Please generate:
1. A "Leading Position Summary (For)" - A clear, concise summary of the strongest arguments supporting the claim.
2. A "Steel Man of Opposing View (Against)" - A fair, thoughtful restatement of the best opposing arguments, even stronger than what opponents might present.

Both summaries should be balanced, evidence-based, and promote deeper understanding.
  `.trim()
}

