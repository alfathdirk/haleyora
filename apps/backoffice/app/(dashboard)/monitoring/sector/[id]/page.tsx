"use client";

import BreadCrumb from "@/components/breadcrumb";
import { SectorTable } from "@/components/tables/Sector/table";
import { Heading } from "@/components/ui/heading";

export default function SectorPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const pageName = "Bidang";

  return (
    <div className="flex-1">
      <BreadCrumb
        items={[
          { title: "Monitoring", link: "/monitoring" },
          { title: pageName, link: "/monitoring/sector" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description={`Manajemen ${pageName}`} />
      </div>

      <SectorTable categoryId={params?.id} />
    </div>
  );
}
