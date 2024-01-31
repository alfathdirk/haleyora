"use client";

import React, { PropsWithChildren } from "react";
import SidebarNavGroup from "@/components/Dashboard/Sidebar/SidebarNavGroup";
import SidebarNavItem from "@/components/Dashboard/Sidebar/SidebarNavItem";
import { routeConfig } from "@/routes/routeConfig";
import { usePathname } from "next/navigation";

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

export default function SidebarNav() {
  const currentPath = usePathname();

  return (
    <ul className="list-unstyled">
      {routeConfig.map((route, key) => (
        <React.Fragment key={key}>
          {route.groupLabel && (
            <SidebarNavTitle>{route.groupLabel}</SidebarNavTitle>
          )}
          {route.children ? (
            <React.Fragment>
              <SidebarNavGroup
                toggleIcon={route.icon}
                toggleText={route.label ?? ""}
              >
                {route.children.map((child, childKey) => (
                  <SidebarNavItem
                    key={childKey}
                    href={child.path}
                    isActive={currentPath.startsWith(child.path)}
                  >
                    {child.label}
                  </SidebarNavItem>
                ))}
              </SidebarNavGroup>
            </React.Fragment>
          ) : (
            <SidebarNavItem
              href={route.path}
              icon={route.icon}
              isActive={currentPath === route.path}
            >
              {route.label}
            </SidebarNavItem>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
