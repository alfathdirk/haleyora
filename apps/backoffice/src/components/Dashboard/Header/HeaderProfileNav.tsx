import {
  Badge,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { PropsWithChildren } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faListCheck,
  faLock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import HeaderLogout from "@/components/Dashboard/Header/HeaderLogout";

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" img={icon} fixedWidth />
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
        <DropdownMenu className="pt-0">
          <DropdownHeader className="bg-light fw-bold">Settings</DropdownHeader>
          <Link href="#" passHref legacyBehavior>
            <DropdownItem>
              <ItemWithIcon icon={faLock}>Edit Account</ItemWithIcon>
            </DropdownItem>
          </Link>
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
