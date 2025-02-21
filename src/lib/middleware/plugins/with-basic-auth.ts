import { NextRequest, NextResponse } from 'next/server';


export function withBasicAuthMiddleware(req: NextRequest, res: NextResponse): NextResponse {
  const url = req.nextUrl;

  if (!process.env.NEXT_PUBLIC_BASIC_AUTH_USER || !process.env.NEXT_PUBLIC_BASIC_AUTH_PASS || url.pathname.startsWith('/api') || url.pathname.startsWith('/auth')) {
    return res;
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER && pwd === process.env.NEXT_PUBLIC_BASIC_AUTH_PASS) {
      return res;
    }
  }

  url.pathname = '/api/basic-auth';
  return NextResponse.rewrite(url);
}
