"use client";

import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import React, { PropsWithChildren, useContext } from "react";
import { SidebarContext } from "@/components/Dashboard/sidebar-provider";
import { NavItem, NavLink, Image } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  href: string;
  icon?: string;
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
              src={icon}
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
