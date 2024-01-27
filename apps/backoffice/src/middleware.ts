import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes } from './router';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!isPublicRoute && !currentUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
