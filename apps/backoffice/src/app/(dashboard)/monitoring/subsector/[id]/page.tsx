"use client";

import BreadCrumb from "@/components/breadcrumb";
import { SubSectorTable } from "@/components/Tables/SubSector/table";
import { Heading } from "@/components/ui/heading";

export default function SubSectorPage({
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
          { title: "Sub Bidang", link: "/monitoring/sector" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={`Sub Bidang`} description="Manejemen Sub Bidang" />
      </div>

      <SubSectorTable sectorId={params?.id} />
    </div>
  );
}
