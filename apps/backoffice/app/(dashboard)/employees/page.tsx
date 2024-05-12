"use client";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/tables/Employee/table";
import { Heading } from "@/components/ui/heading";

export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-2">
        <BreadCrumb items={[{ title: "Employees", link: "/employees" }]} />

        <div className="flex items-start justify-between !mb-10">
          <Heading title={`Employees`} description="Manage employees" />
        </div>

        <EmployeesTable />
      </div>
    </>
  );
}
