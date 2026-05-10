import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_PATH = '/adminprivateatuljha123'
const LOGIN_PATH = `${ADMIN_PATH}/login`

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const encoder = new TextEncoder()
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const data = encoder.encode(`${parts[0]}.${parts[1]}`)
    const sig = parts[2].replace(/-/g, '+').replace(/_/g, '/')
    const padded = sig + '='.repeat((4 - (sig.length % 4)) % 4)
    const sigBytes = Uint8Array.from(atob(padded), c => c.charCodeAt(0))

    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, data)
    if (!valid) return false

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (payload.exp && Date.now() / 1000 > payload.exp) return false
    if (payload.role !== 'admin') return false

    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all admin routes except login
  if (pathname.startsWith(ADMIN_PATH) && pathname !== LOGIN_PATH) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    }

    const valid = await verifyJWT(token, secret)
    if (!valid) {
      const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [`/adminprivateatuljha123/:path*`],
}
