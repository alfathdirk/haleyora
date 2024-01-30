import { Container } from "react-bootstrap";
import React from "react";
import SidebarProvider from "@/components/Dashboard/sidebar-provider";
import SidebarOverlay from "@/components/Dashboard/Sidebar/SidebarOverlay";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import SidebarNav from "@/components/Dashboard/Sidebar/SidebarNav";
import Header from "@/components/Dashboard/Header/Header";
import Footer from "@/components/Dashboard/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarOverlay />
      <Sidebar>
        <SidebarNav />
      </Sidebar>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header />
        <div className="body flex-grow-1 px-sm-2 mb-4">
          <Container fluid="lg">{children}</Container>
        </div>
      </div>

      <SidebarOverlay />
    </SidebarProvider>
  );
}
