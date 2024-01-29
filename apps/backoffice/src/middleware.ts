
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { publicRoutes } from './routes/routeConfig'

export default function middleware(request: NextRequest) {
  const authSession = request.cookies.get('auth')?.value;
  console.log(authSession)

  if (!publicRoutes.includes(request.nextUrl.pathname) && !authSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (publicRoutes.includes(request.nextUrl.pathname) && authSession) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
