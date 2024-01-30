/* eslint-disable jsx-a11y/alt-text */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faDroplet } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { Image } from "react-bootstrap";
import { SidebarContext } from "@/components/Dashboard/sidebar-provider";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isNarrow, setIsNarrow] = useState(false);

  const {
    showSidebarState: [isShowSidebar],
    showSidebarMdState: [isShowSidebarMd, setIsShowSidebarMd],
  } = useContext(SidebarContext);

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem("isNarrow", newValue ? "true" : "false");
    setIsNarrow(newValue);
  };

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem("isNarrow")) {
      setIsNarrow(localStorage.getItem("isNarrow") === "true");
    }
  }, [setIsNarrow]);

  // On first time load only
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
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-left border-bottom border-right">
        <Image
          src="./assets/img/general/haleyora-logo.png"
          style={{ width: "170px", paddingLeft: "20px" }}
          fluid
        />
      </div>
      <div className="sidebar-nav flex-fill">{children}</div>

      <div
        className="px-3 py-2 pt-3 d-flex align-center border-top"
        style={{ cursor: "pointer" }}
      >
        <Image
          src="./assets/svg/setting.svg"
          style={{ width: "17px", marginRight: "20px" }}
          alt=""
        />
        <p style={{ marginTop: "12px" }}>Logout</p>
      </div>
    </div>
  );
}
