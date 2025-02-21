import type { NextRequest } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { withBasicAuthMiddleware } from '@/lib/middleware/plugins/with-basic-auth';

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authResponse;
  }

  const basicAuthMiddlewareResponse = withBasicAuthMiddleware(request, authResponse);

  for (const [key, value] of authResponse.headers) {
    basicAuthMiddlewareResponse.headers.set(key, value);
  }

  return basicAuthMiddlewareResponse;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|monitoring|logout-with-redirect).*)'],
};
