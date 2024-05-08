"use client";

import BreadCrumb from "@/components/breadcrumb";
import { SectorTable } from "@/components/Tables/Sector/table";
import { Heading } from "@/components/ui/heading";

export default function SectorPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
      <BreadCrumb
        items={[
          { title: "Monitoring", link: "/monitoring" },
          { title: "Bidang", link: "/monitoring/sector" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={`Bidang`} description="Manejemen Bidang" />
      </div>

      <SectorTable categoryId={params?.id} />
    </div>
  );
}
