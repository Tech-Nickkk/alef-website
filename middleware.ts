import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Adjust path
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  request.headers.set('x-pathname', request.nextUrl.pathname);
  request.headers.set('x-url', request.nextUrl.href);
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)']
};