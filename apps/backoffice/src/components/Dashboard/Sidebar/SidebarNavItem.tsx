"use client";

import React, { PropsWithChildren, useContext } from "react";
import { SidebarContext } from "@/components/Dashboard/sidebar-provider";
import { NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {
  href: string;
  icon?: string | IconDefinition;
  isActive?: boolean;
} & PropsWithChildren;

export default function SidebarNavItem(props: Props) {
  const { icon, children, href, isActive } = props;

  const {
    showSidebarState: [, setIsShowSidebar],
  } = useContext(SidebarContext);

  return (
    <NavItem>
      <Link href={href} passHref legacyBehavior>
        <NavLink
          className="px-3 py-2 d-flex align-items-center border-2"
          style={{
            borderRight: isActive ? "2px solid #787486" : "0px solid white",
            backgroundColor: isActive ? "#F5F6F7" : "white",
          }}
          onClick={() => setIsShowSidebar(false)}
        >
          {icon ? (
            <Image
              src={icon as string}
              width={17}
              height={17}
              alt=""
              className="mr-2"
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
