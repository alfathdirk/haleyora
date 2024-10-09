"use client";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/tables/Employee/table";
import { Heading } from "@/components/ui/heading";
import { AuthContext } from "@/provider/Auth";
import { useContext } from "react";

export default function Page() {
  const { members, currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="flex-1 space-y-2">
        <BreadCrumb items={[{ title: "Karyawan", link: "/employees" }]} />

        <div className="flex items-start justify-between !mb-10">
          <Heading title={`Karyawan`} description="Manajemen Karyawan" />
        </div>

        <EmployeesTable members={members} currentUser={currentUser} />
      </div>
    </>
  );
}
