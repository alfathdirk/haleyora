"use client";

import BreadCrumb from "@/components/breadcrumb";
import NewDataDialog from "@/components/Dialog/newDataDialog";
import { MonitoringTable } from "@/components/Tables/Monitoring/table";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MonitoringPage() {
  const router = useRouter()

  return (
    <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
      <BreadCrumb items={[{ title: "Monitoring", link: "/monitoring" }]} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={`Monitoring`} description="Manejemen Kategori" />

        <NewDataDialog name="monitoring" />
      </div>

      <MonitoringTable />
    </div>
  );
}
