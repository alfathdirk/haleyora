export interface RouteConfig {
  path: string;
  exact?: boolean;
  icon: IconDefinition | string;
  roles?: string[];
  label?: string;
  groupLabel?: string;
  children?: Omit<RouteConfig, "icon">[];
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
} from "@fortawesome/free-solid-svg-icons";

export const publicRoutes = ["/login", "/register"];

export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    roles: [
      "e378a240-d535-4f57-b1bc-7c08c8ab7c12",
      "56828232-5ad4-4318-8f35-21bad6e7a981",
    ],
    groupLabel: "Main Menu",
    label: "Dashboard",
    icon: "../assets/svg/category.svg",
  },
  {
    path: "/employee",
    exact: true,
    roles: ["staff"],
    label: "Employee",
    icon: "../assets/svg/profile-2user.svg",
  },
  {
    path: "/lesson",
    exact: true,
    roles: [
      "e378a240-d535-4f57-b1bc-7c08c8ab7c12",
      "56828232-5ad4-4318-8f35-21bad6e7a981",
    ],
    label: "Lesson",
    icon: "../assets/svg/book-saved.svg",
  },
  {
    path: "/quiz",
    exact: true,
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12", "staff"],
    label: "Quiz",
    icon: "../assets/svg/message.svg",
  },
  {
    path: "/exam",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    label: "Exam",
    icon: "../assets/svg/edit-2.svg",
  },
  {
    path: "/user-admin",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    groupLabel: "User Admin",
    label: "User Admin",
    icon: "../assets/svg/user.svg",
  },
  {
    path: "/role-management",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    label: "Role Management",
    icon: "../assets/svg/user-tick.svg",
  },
  {
    path: "/parameters",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    label: "Parameters",
    icon: "../assets/svg/task-square.svg",
  },
];
