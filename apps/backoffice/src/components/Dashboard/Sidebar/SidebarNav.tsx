import {
  faAddressCard,
  faBell,
  faFileLines,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import {
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
import React, { PropsWithChildren } from "react";
import { Badge } from "react-bootstrap";
import SidebarNavGroup from "@/components/Dashboard/Sidebar/SidebarNavGroup";
import SidebarNavItem from "@/components/Dashboard/Sidebar/SidebarNavItem";

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>Main Menu</SidebarNavTitle>
      <SidebarNavItem icon={faDroplet} href="/">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="/employee">
        Employee
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="/lesson">
        Lesson
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="/quiz">
        Quiz
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="/exam">
        Exam
      </SidebarNavItem>

      <SidebarNavTitle>Master Data</SidebarNavTitle>
      <SidebarNavItem icon={faDroplet} href="/user-admin">
        User Admin
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="role-management">
        Role Management
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="parameters">
        Parameters
      </SidebarNavItem>
    </ul>
  );
}
