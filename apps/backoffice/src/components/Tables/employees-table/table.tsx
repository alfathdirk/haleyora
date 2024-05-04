"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export const EmployeesTable = ({ data }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between !mb-10">
        <Heading
          title={`Employees (${data.length})`}
          description="Manage employees"
        />
      </div>

      <DataTable searchKey="Name" columns={columns} data={data} />
    </>
  );
};
