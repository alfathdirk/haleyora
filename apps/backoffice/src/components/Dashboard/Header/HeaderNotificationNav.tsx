import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBasketShopping,
  faChartBar,
  faGaugeHigh,
  faList,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
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
  NavLink,
  ProgressBar,
} from "react-bootstrap";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import Image from "next/image";

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

export default function HeaderNotificationNav() {
  return (
    <Nav>
      <NavItem>
        <Dropdown>
          <DropdownToggle as={NavLink} bsPrefix="hide-caret" id="dropdown-mail">
            <FontAwesomeIcon img={faBell} size="lg" />
            <Badge
              pill
              bg="primary"
              className="position-absolute top-0 right-0"
            >
              7
            </Badge>
          </DropdownToggle>
          <DropdownMenu className="pt-0" align="end">
            <DropdownHeader className="bg-light fw-bold rounded-top">
              You have 4 messages
            </DropdownHeader>
            <Link href="#" passHref legacyBehavior>
              <DropdownItem>
                <div className="message">
                  <div className="py-3 me-3 float-start">
                    <div className="avatar d-inline-flex position-relative">
                      <Image
                        fill
                        className="rounded-circle"
                        src="/assets/img/avatars/1.jpg"
                        alt="user@email.com"
                      />
                      <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">John Doe</small>
                    <small className="text-muted float-end mt-1">
                      Just now
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="text-danger">!</span> Pet Pikachu
                  </div>
                  <div className="small text-truncate text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt
                  </div>
                </div>
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    </Nav>
  );
}
