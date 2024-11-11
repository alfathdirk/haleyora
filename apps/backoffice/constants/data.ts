import { NavItem, Role } from "@/types";

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
    roles: ["Administrator", "Admin Pusat"],
  },
  {
    title: "Monitoring",
    path: "/employees",
    label: "Monitoring",
    icon: "employee",
    roles: ["Administrator", "Admin Pusat", "⁠Admin Unit", "Leader"],
  },
  {
    path: "/evaluation",
    title: "Evaluasi",
    label: "Evaluasi",
    icon: "parameter",
    roles: ["Administrator", "Admin Pusat", "⁠Admin Unit", "Leader"],
  },
  {
    path: "/course",
    title: "Pembelajaran",
    label: "Pembelajaran",
    icon: "lessons",
    roles: ["Administrator", "Admin Pusat", "Trainer"],
  },
  {
    path: "/quiz",
    title: "Ujian",
    label: "Ujian",
    icon: "quiz",
    roles: ["Administrator", "Admin Pusat", "Trainer"],
  },
  {
    path: "/task",
    title: "Tugas",
    label: "Tugas",
    icon: "parameter",
    roles: ["Administrator", "Admin Pusat", "Trainer"],
  },
  // {
  //   path: "/monitoring",
  //   title: "Monitoring",
  //   label: "Monitoring",
  //   icon: "dashboard",
  // },
  {
    path: "#",
    groupLabel: "Master Data",
    title: "Master Data",
    label: "Master Data",
    roles: ["Administrator", "Admin Pusat"],
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
    roles: ["Administrator", "Admin Pusat"],
  },
  {
    path: "/masterdata/subsector",
    title: "Sub Bidang",
    label: "Sub Bidang",
    icon: "parameter",
    roles: ["Administrator", "Admin Pusat"],
  },
  {
    path: "/masterdata/activities",
    title: "Aktifitas",
    label: "Aktifitas",
    icon: "report",
    roles: ["Administrator", "Admin Pusat"],
  },
];

// Filter nav items based on the user's role
export const getAccessibleNavItems = (role: Role | undefined): NavItem[] => {
  if (!role) {
    return [];
  }

  return navItems.filter((item) => {
    // If no roles are defined, it means the item is accessible to everyone
    if (!item.roles) return false;
    // Check if the current user's role is allowed for this item
    return item.roles.includes(role);
  });
};

const getBasePath = (path: string): string => {
  const segments = path.split("/").filter(Boolean); // Split and remove empty segments
  return `/${segments[0] ?? ''}`; // Return the base segment (e.g., "/employees")
};

export const canAccessPath = (role: Role | undefined, path: string): boolean => {
  if (!role) {
    return false;
  }

  const basePath = getBasePath(path); // Extract the base path from the full path

  const route = navItems.find((item) => item.path === basePath); // Check access for the base route

  if (!route) {
    return false; // If route not found, deny access by default
  }

  return !!route?.roles?.includes(role);
};
