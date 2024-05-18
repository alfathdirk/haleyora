"use client";

import BreadCrumb from "@/components/breadcrumb";
import { MonitoringTable } from "@/components/tables/Monitoring/table";
import { Heading } from "@/components/ui/heading";

export default function MonitoringPage() {
  const pageName = "Monitoring";

  return (
    <div className="flex-1">
      <BreadCrumb items={[{ title: pageName, link: "/monitoring" }]} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description="" />
      </div>

      <MonitoringTable />
    </div>
  );
}
