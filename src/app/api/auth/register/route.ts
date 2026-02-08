import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log(`[register proxy] forwarding to ${BACKEND}/api/auth/register`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const res = await fetch(`${BACKEND}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await res.json().catch(() => null)
    console.log(`[register proxy] response status: ${res.status}`)
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    console.error(`[register proxy] error: ${err.message}`)
    return NextResponse.json({ error: String(err.message) || 'Backend error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
