import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-compatible JWT verification (jsonwebtoken doesn't work in Edge Runtime)
async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const data = encoder.encode(`${parts[0]}.${parts[1]}`)
    // base64url decode the signature
    const sig = parts[2].replace(/-/g, '+').replace(/_/g, '/')
    const padded = sig + '='.repeat((4 - (sig.length % 4)) % 4)
    const sigBytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))

    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, data)
    if (!valid) return false

    // Check expiry from payload
    const payloadJson = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    if (payloadJson.exp && Date.now() / 1000 > payloadJson.exp) return false

    // Check role
    if (payloadJson.role !== 'admin') return false

    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const valid = await verifyJWT(token, secret)
    if (!valid) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
