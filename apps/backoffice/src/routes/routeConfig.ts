interface RouteConfig {
  path: string;
  exact?: boolean;
  roles?: string[];
  label?: string;
  children?: RouteConfig[];
}

export const publicRoutes = ['/login', '/register'];

export const routeConfig: RouteConfig[] = [
  {
    path: '/users',
    roles: ['admin'],
    label: 'Users',
    children: [{
      path: '/users/:id',
      exact: true,
      roles: ['admin']
    }]
  }, {
    path: '/products',
    roles: ['admin', 'staff'],
    label: 'Products',
    children: [{
      path: '/products/:id',
      exact: true,
      roles: ['admin']
    }]
  }
]
