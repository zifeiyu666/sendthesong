import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Domain-ownership files must stay at the exact root path
  // (e.g. /.well-known/launchscaler-verify.txt), not locale-prefixed.
  if (pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }

  const indexNowKey = process.env.INDEXNOW_KEY?.trim();

  if (indexNowKey && pathname === `/${indexNowKey}.txt`) {
    const url = request.nextUrl.clone();
    url.pathname = "/indexnow-key.txt";
    return NextResponse.rewrite(url);
  }

  const intlResponse = intlMiddleware(request);

  return intlResponse;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en)/:path*',

    // Expose the IndexNow key at the root-level path required by crawlers.
    // Single segment only so /.well-known/*.txt is not intercepted.
    '/:file.txt',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|\\.well-known|auth|privacy-policy|terms-of-service|refund-policy|.*\\.|favicon.ico).*)'
  ]
};
