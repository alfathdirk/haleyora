import React, { PropsWithChildren } from "react";
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
      <SidebarNavItem icon={"./assets/svg/category.svg"} href="/">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={"./assets/svg/profile-2user.svg"} href="/employee">
        Employee
      </SidebarNavItem>
      <SidebarNavItem icon={"./assets/svg/book-saved.svg"} href="/lesson">
        Lesson
      </SidebarNavItem>
      <SidebarNavItem icon={"./assets/svg/message.svg"} href="/quiz">
        Quiz
      </SidebarNavItem>
      <SidebarNavItem icon={"./assets/svg/edit-2.svg"} href="/exam">
        Exam
      </SidebarNavItem>

      <SidebarNavTitle>Master Data</SidebarNavTitle>
      <SidebarNavItem icon={"./assets/svg/user.svg"} href="/user-admin">
        User Admin
      </SidebarNavItem>
      <SidebarNavItem
        icon={"./assets/svg/user-tick.svg"}
        href="role-management"
      >
        Role Management
      </SidebarNavItem>
      <SidebarNavItem icon={"./assets/svg/task-square.svg"} href="parameters">
        Parameters
      </SidebarNavItem>
    </ul>
  );
}
