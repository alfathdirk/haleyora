import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PropsWithChildren } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import HeaderLogout from "@/components/Dashboard/Header/HeaderLogout";

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

export default function HeaderProfileNav() {
  return (
    <Nav>
      <Dropdown as={NavItem}>
        <DropdownToggle
          variant="link"
          bsPrefix="hide-caret"
          className="py-0 px-2 rounded-0"
          id="dropdown-profile"
        >
          <div className="avatar position-relative">
            <Image
              fill
              sizes="32px"
              className="rounded-circle"
              src="/assets/img/avatars/8.jpg"
              alt="user@email.com"
            />
          </div>
        </DropdownToggle>
        <DropdownMenu className="pt-0 mt-2">
          <DropdownHeader className="bg-light fw-bold">Settings</DropdownHeader>
          <HeaderLogout>
            <DropdownItem>
              <ItemWithIcon icon={faPowerOff}>Logout</ItemWithIcon>
            </DropdownItem>
          </HeaderLogout>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  );
}
