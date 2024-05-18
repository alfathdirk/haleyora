import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const routeConfig = [
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
    label: "Karyawan",
    icon: "../assets/svg/profile-2user.svg",
  },
  {
    path: "/lesson",
    exact: true,
    roles: [
      "e378a240-d535-4f57-b1bc-7c08c8ab7c12",
      "56828232-5ad4-4318-8f35-21bad6e7a981",
    ],
    label: "Pembelajaran",
    icon: "../assets/svg/book-saved.svg",
  },
  {
    path: "/quiz",
    exact: true,
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12", "staff"],
    label: "Kuis",
    icon: "../assets/svg/message.svg",
  },
  {
    path: "/monitoring",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    label: "Monitoring",
    icon: "../assets/svg/category.svg",
  },
  {
    path: "/exam",
    roles: ["e378a240-d535-4f57-b1bc-7c08c8ab7c12"],
    label: "Ujian",
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

export const navItems: NavItem[] = [
  {
    path: "#",
    groupLabel: "Menu Utama",
    title: "Menu Utama",
    label: "Menu Utama",
  },
  {
    title: "Dashboard",
    path: "/",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Karyawan",
    path: "/employees",
    label: "Karyawan",
    icon: "employee",
  },
  {
    path: "/course",
    title: "Pembelajaran",
    label: "Pembelajaran",
    icon: "lessons",
  },
  {
    path: "/quiz",
    title: "Kuis",
    label: "Kuis",
    icon: "quiz",
  },
  {
    path: "/monitoring",
    title: "Monitoring",
    label: "Monitoring",
    icon: "dashboard",
  },
  {
    path: "/exam",
    title: "Ujian",
    label: "Ujian",
    icon: "lessons",
  },
  {
    path: "#",
    groupLabel: "Master Data",
    title: "Master Data",
    label: "Master Data",
  },
  // {
  //   path: "/admin-management",
  //   title: "Data Admin",
  //   label: "Data Admin",
  //   icon: "userRole",
  // },
  {
    path: "/master-data/sector",
    title: "Bidang",
    label: "Bidang",
    icon: "parameter",
  },
  {
    path: "/master-data/sub-sector",
    title: "Sub Bidang",
    label: "Sub Bidang",
    icon: "parameter",
  },
  {
    path: "/master-data/activities",
    title: "Aktifitas",
    label: "Aktifitas",
    icon: "report",
  },
];
