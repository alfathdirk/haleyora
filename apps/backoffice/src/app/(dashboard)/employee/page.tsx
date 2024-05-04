"use client";

import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/Tables/employees-table/table";
import { DirectusContext } from "@/provider/Directus";

import { readItems } from "@directus/sdk";
import { useContext } from "react";

const breadcrumbItems = [{ title: "Employees", link: "/dashboard/employees" }];

export default function EmployeePage() {
  const { client } = useContext(DirectusContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: any = await client.request(
          readItems("employee", {
            fields: ["*"],
          }),
        );

        // Map over the result data and convert specific keys to lowercase
        const processedData = result.map((item: any) => ({
          ...item,
        }));

        setEmployees(processedData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ employees });

  return (
    <>
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeesTable data={employees} />
      </div>
    </>
  );
}
