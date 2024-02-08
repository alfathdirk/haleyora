
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { RouteConfig, publicRoutes, routeConfig } from './routes/routeConfig'
import { UserData } from './provider/Auth';

const searchRole = (routesConfig: RouteConfig[], role: string) => {
  let path: string[] = [];
  const searchRouteConfigByRole = (routesConfig: RouteConfig[], role: string) => {
    routesConfig.forEach((route: RouteConfig) => {
      if (route.roles?.includes(role)) {
        path.push(route.path);
      }
      if (route.children) {
        searchRouteConfigByRole(route.children, role);
      }
    })
    return path;
  }
  return searchRouteConfigByRole(routesConfig, role);
}


export default function middleware(request: NextRequest) {
  // const authSession = request.cookies.get('auth')?.value;

  // if(authSession) {
  //   let userData = JSON.parse(authSession) as UserData;
  //   let allowedPath = searchRole(routeConfig, userData.role)

  //   if(!allowedPath.includes(request.nextUrl.pathname) && !publicRoutes.includes(request.nextUrl.pathname) && authSession) {
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
  // }

  // if (!publicRoutes.includes(request.nextUrl.pathname) && !authSession) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }


  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
