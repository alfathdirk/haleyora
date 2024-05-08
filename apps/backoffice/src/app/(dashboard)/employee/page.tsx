"use client";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/Tables/Employee/table";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [{ title: "Employees", link: "/employees" }];

export default function EmployeePage() {
  return (
    <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={`Employees`} description="Manage employees" />
      </div>

      <EmployeesTable />
    </div>
  );
}
