import Link from "next/link";
import { Col, Container } from "react-bootstrap";
import HeaderSidebarToggler from "@/components/Dashboard/Header/HeaderSidebarToggler";
import HeaderFeaturedNav from "@/components/Dashboard/Header/HeaderFeaturedNav";
import HeaderNotificationNav from "@/components/Dashboard/Header/HeaderNotificationNav";
import HeaderProfileNav from "@/components/Dashboard/Header/HeaderProfileNav";
// import Breadcrumb from '@/components/Dashboard/Breadcrumb/Breadcrumb'

export default function Header() {
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center">
        <HeaderSidebarToggler />
        <Link href="/" className="header-brand d-md-none">
          <svg width="80" height="46">
            <title>CoreUI Logo</title>
            <use xlinkHref="/assets/brand/coreui.svg#full" />
          </svg>
        </Link>
        <div className="header-nav d-none d-md-flex">
          {/* <HeaderFeaturedNav /> */}
          <h2 style={{ marginRight: "8px", color: "#C2BB34" }}>E-LEARNING</h2>
          <h2 style={{ color: "#05A5DE" }}> HALEYORA POWER</h2>
        </div>
        <div className="header-nav ms-auto">
          {/* <HeaderNotificationNav /> */}
          <div style={{ textAlign: "right" }}>
            <p style={{ marginTop: "-24px" }}>Henry Pramudya</p>
            <p
              style={{
                marginTop: "-20px",
                color: "#787486",
                marginBottom: "-24px",
              }}
            >
              Super Administrator
            </p>
          </div>
        </div>
        <div className="header-nav ms-2">
          <HeaderProfileNav />
        </div>
      </Container>
      {/* <div className="header-divider border-top my-2 mx-sm-n2" />
      <Container fluid>
        <Breadcrumb />
      </Container> */}
    </header>
  );
}
