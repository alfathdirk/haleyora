/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { SidebarContext } from "@/components/Dashboard/sidebar-provider";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isNarrow, setIsNarrow] = useState(false);

  const {
    showSidebarState: [isShowSidebar],
    showSidebarMdState: [isShowSidebarMd, setIsShowSidebarMd],
  } = useContext(SidebarContext);

  useEffect(() => {
    if (localStorage.getItem("isNarrow")) {
      setIsNarrow(localStorage.getItem("isNarrow") === "true");
    }
  }, [setIsNarrow]);

  useEffect(() => {
    if (localStorage.getItem("isShowSidebarMd")) {
      setIsShowSidebarMd(localStorage.getItem("isShowSidebarMd") === "true");
    }
  }, [setIsShowSidebarMd]);

  return (
    <div
      className={classNames("sidebar d-flex flex-column position-fixed h-100", {
        "sidebar-narrow": isNarrow,
        show: isShowSidebar,
        "md-hide": !isShowSidebarMd,
      })}
      id="sidebar"
    >
      <Link href="/" className=" py-2 border-b-2 border-r-2">
        <Image
          src="/assets/img/general/haleyora-logo.png"
          width={160}
          height={10}
          alt="haleyora-logo"
          className="pl-4 my-1 pt-1"
        />
      </Link>
      <div className="sidebar-nav flex-fill border-r-2">{children}</div>

      <div className=" cursor-pointer border-r-2 flex p-3 border-t-2">
        <Image
          src="/assets/svg/setting.svg"
          width={17}
          height={100}
          alt=""
          className="mr-2"
        />
        <p className="">Logout</p>
      </div>
    </div>
  );
}
