import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * UC-21: User Role & Permission Enforcement
 * Business Rules:
 * - Redirect unauthenticated users to /login
 * - Protect root and other private routes
 */
export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // Allow login page, public assets, and api routes
    if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Redirect to login if no token is found
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        // Optional: save the intended destination to redirect back after login
        // loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
