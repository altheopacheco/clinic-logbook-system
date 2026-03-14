import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, protectedRouteCheck } from './lib/session'
 
// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
    const session = await getSession()

    if (!session && request.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}