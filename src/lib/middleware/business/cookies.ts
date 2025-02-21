import { NextResponse } from 'next/server';
import { clientLocaleCookieName, languageCookieName } from '@/src/lib/dictionary/settings';

const canSetCookie = process.env.MODE !== 'test';

export function setLanguageCookies(response: NextResponse, language: string, clientLocale: string) {
  if (!canSetCookie) {
    return;
  }
  response.cookies.set({ name: languageCookieName, value: language, path: '/', sameSite: 'strict' });
  response.cookies.set({ name: clientLocaleCookieName, value: clientLocale, path: '/', sameSite: 'strict' });
}

export function setGuestIdCookie(response: NextResponse) {
  if (!canSetCookie) {
    return;
  }

  const guestId = crypto.randomUUID();
  response.cookies.set({ name: 'guestId', value: guestId, path: '/', sameSite: 'strict' });
}
