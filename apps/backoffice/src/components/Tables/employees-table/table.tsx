"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useEffect, useState, useContext } from "react";
import { DirectusContext } from "@/provider/Directus";
import { readItems, aggregate } from "@directus/sdk";

export const EmployeesTable = () => {
  const { client } = useContext(DirectusContext);

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // TODO: get total with search
    async function fetchTotalCount() {
      try {
        const data = await client.request(
          aggregate("employee", {
            filter: searchQuery ? { full_name: { _contains: searchQuery } } : {}, // # not working
            aggregate: { count: ["id"] },
          })
        );

        setTotalItems(Number(data[0]?.count?.id ?? 0));
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    }

    async function fetchEmployees() {
      try {
        const filters = searchQuery ? { full_name: { _contains: searchQuery } } : {};

        const result = await client.request(
          readItems("employee", {
            fields: ["*"],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: filters,
          })
        );

        setEmployees(result ?? []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchTotalCount();
    fetchEmployees();
  }, [client, currentPage, pageSize, searchQuery]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      <DataTable
        columns={columns}
        searchKey="Name"
        data={employees}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        handleSearchChange={handleSearchChange}
      />
    </>
  );
};
