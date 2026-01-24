import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Adjust path

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)']
};