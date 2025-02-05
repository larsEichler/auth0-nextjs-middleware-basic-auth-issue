import { Auth0Client } from '@auth0/nextjs-auth0/server';
import {NextResponse} from 'next/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  },
  async onCallback(error, context) {
    if (error) {
      return NextResponse.redirect(new URL(`/?notification=${error.message}`, process.env.APP_BASE_URL));
    }

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(new URL(context.returnTo || '/', process.env.APP_BASE_URL));
  },
});
