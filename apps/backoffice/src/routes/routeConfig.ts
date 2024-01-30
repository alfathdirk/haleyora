export interface RouteConfig {
  path: string;
  exact?: boolean;
  icon: IconDefinition | string;
  roles?: string[];
  label?: string;
  groupLabel?: string;
  children?: Omit<RouteConfig, 'icon'>[]
}
import {
  IconDefinition,
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'

export const publicRoutes = ['/login', '/register'];

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    roles: ['admin', 'staff'],
    groupLabel: 'Main Menu',
    label: 'Dashboard',
    icon: './assets/svg/category.svg'
  },
  {
    path: '/employee',
    exact: true,
    roles: ['admin', 'staff'],
    label: 'Employee',
    icon: './assets/svg/profile-2user.svg'
  },
  {
    path: '/lesson',
    exact: true,
    roles: ['admin', 'staff'],
    label: 'Lesson',
    icon: './assets/svg/book-saved.svg'
  },
  {
    path: '/quiz',
    exact: true,
    roles: ['admin', 'staff'],
    label: 'Quiz',
    icon: './assets/svg/message.svg'
  },
  {
    path: '/exam',
    roles: ['admin'],
    label: 'Exam',
    icon: './assets/svg/edit-2.svg'

  }, {
    path: '/user-admin',
    roles: ['admin'],
    groupLabel: 'User Admin',
    label: 'User Admin',
    icon: './assets/svg/user.svg'
  },{
    path: '/role-management',
    roles: ['admin'],
    label: 'Role Management',
    icon: './assets/svg/user-tick.svg'
  },{
    path: '/parameters',
    roles: ['admin'],
    label: 'Parameters',
    icon: './assets/svg/task-square.svg'
  }
]
