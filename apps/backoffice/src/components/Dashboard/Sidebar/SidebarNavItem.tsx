"use client";

import React, { PropsWithChildren, useContext } from "react";
import { SidebarContext } from "@/components/Dashboard/sidebar-provider";
import { NavItem, NavLink, Image } from "react-bootstrap";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  href: string;
  icon?: string | IconDefinition;
} & PropsWithChildren;

export default function SidebarNavItem(props: Props) {
  const { icon, children, href } = props;

  const {
    showSidebarState: [, setIsShowSidebar],
  } = useContext(SidebarContext);

  return (
    <NavItem>
      <Link href={href} passHref legacyBehavior>
        <NavLink
          className="px-3 py-2 d-flex align-items-center"
          onClick={() => setIsShowSidebar(false)}
        >
          {icon ? (
            <Image
              src={icon as string}
              style={{ width: "17px", marginRight: "20px" }}
              alt=""
            />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </NavLink>
      </Link>
    </NavItem>
  );
}
