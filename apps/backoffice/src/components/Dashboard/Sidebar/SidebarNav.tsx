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
      <SidebarNavItem icon={faDroplet} href="#">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="#">
        Employee
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="#">
        Lesson
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="#">
        Quiz
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="#">
        Exam
      </SidebarNavItem>

      <SidebarNavTitle>Master Data</SidebarNavTitle>
      <SidebarNavItem icon={faDroplet} href="#">
        User Admin
      </SidebarNavItem>
      <SidebarNavItem icon={faPencil} href="#">
        Role Management
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="#">
        Parameters
      </SidebarNavItem>
    </ul>
  );
}
