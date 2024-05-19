import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const DirectusStatus = [
  {
    id: "draft",
    name: "Draft"
  },
  {
    id: "published",
    name: "Published"
  },
  {
    id: "archived",
    name: "Archived"
  }
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
    path: "/task",
    title: "Tugas",
    label: "Tugas",
    icon: "parameter",
  },
  {
    path: "/monitoring",
    title: "Monitoring",
    label: "Monitoring",
    icon: "dashboard",
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
    path: "/masterdata/sector",
    title: "Bidang",
    label: "Bidang",
    icon: "parameter",
  },
  {
    path: "/masterdata/subsector",
    title: "Sub Bidang",
    label: "Sub Bidang",
    icon: "parameter",
  },
  {
    path: "/masterdata/activities",
    title: "Aktifitas",
    label: "Aktifitas",
    icon: "report",
  },
];
