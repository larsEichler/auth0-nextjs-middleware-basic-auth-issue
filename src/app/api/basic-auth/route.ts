import { NextResponse } from 'next/server';

function GET(req: Request) {
  const newHeaders = new Headers(req.headers);
  newHeaders.set('WWW-authenticate', 'Basic realm="Secure Area"');
  return NextResponse.json(
    {
      error: 'Auth Required.',
    },
    {
      status: 401,
      headers: newHeaders,
    },
  );
}

export { GET };
