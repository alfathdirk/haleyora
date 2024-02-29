import Link from "next/link";
import {
  Container,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "react-bootstrap";
import HeaderSidebarToggler from "@/components/Dashboard/Header/HeaderSidebarToggler";
import HeaderProfileNav from "@/components/Dashboard/Header/HeaderProfileNav";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import HeaderLogout from "./HeaderLogout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header className="sticky top-0 mb-4 py-3 border-b-2 bg-white z-10">
      <Container fluid className="header-navbar d-flex align-items-center">
        <HeaderSidebarToggler />
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title>CoreUI Logo</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>
        <div className="flex text-2xl font-semibold">
          <p className="text-[#C2BB34] mr-2">E-LEARNING</p>
          <p className="text-[#05A5DE]"> HALEYORA POWER</p>
        </div>
        <div className="header-nav ms-auto">
          <div className="text-right flex flex-col leading-4">
            <p>Henry Pramudya</p>
            <p className="text-[#787486] text-sm">Super Administrator</p>
          </div>
        </div>
        <div className="header-nav ms-2">
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
                <DropdownHeader className="bg-light fw-bold">
                  Settings
                </DropdownHeader>
                <HeaderLogout>
                  <DropdownItem>
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      fixedWidth
                      className="mr-2"
                    />
                    Logout
                  </DropdownItem>
                </HeaderLogout>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </header>
  );
}
