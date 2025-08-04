import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const { idToken, refreshToken } = await req.json();
  const { idToken } = await req.json();

  const res = NextResponse.json({ ok: true });

  res.cookies.set('token', idToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  // res.cookies.set('refreshToken', refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 30, // refresh token 可以存很久
  // });

  return res;
}
