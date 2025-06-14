import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/login', '/register'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      try {
        verifyToken(token);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch {
        // Invalid token - allow access to auth pages
      }
    }
    return NextResponse.next();
  }

  // Protected routes
  try {
    const payload = verifyToken(token || '');
    const isAdmin = payload.role === 'ADMIN';

    // Admin route protection
    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/checkout/:path*'
  ],
};