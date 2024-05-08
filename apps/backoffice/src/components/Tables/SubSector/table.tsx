"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useEffect, useState, useContext } from "react";
import { DirectusContext } from "@/provider/Directus";
import { readItems, aggregate } from "@directus/sdk";
import { useRouter } from "next/navigation";

interface SubSectorTableProps {
  sectorId: string;
  defaultLayout?: string;
}

export const SubSectorTable = ({ sectorId, defaultLayout = 'table' }: SubSectorTableProps) => {
  const router = useRouter();
  const { client } = useContext(DirectusContext);

  const [currentLayout, setCurrentLayout] = useState(defaultLayout);

  const [data, setData] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let filters = searchQuery ? { title: { _contains: searchQuery } } : {};
    Object.assign(filters, {
      sector_id: {
        _eq: sectorId,
      },
    })

    // TODO: get total with search
    async function fetchTotalCount() {
      try {
        const data = await client.request(
          aggregate("sub_sector", {
            filter: filters,
            aggregate: { count: ["id"] },
          })
        );

        setTotalItems(Number(data[0]?.count?.id ?? 0));
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    }

    async function fetchData() {
      try {
        const result = await client.request(
          readItems("sub_sector", {
            fields: ["*"],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: filters,
          })
        );

        setData(result ?? []);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }

    fetchTotalCount();
    fetchData();
  }, [sectorId, client, currentPage, pageSize, searchQuery]);

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
        columns={currentLayout === "card" ? cardColumns : columns}
        onLayoutChange={(val: string) => setCurrentLayout(val)}
        tableHeader={false}
        searchKey="Name"
        data={data}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        handleSearchChange={handleSearchChange}
        cardContainerStyles="!grid-cols-5"
        cardStyles="py-3 px-2 rounded-xl shadow-xl shadow-[#F4F4F4] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
        tableRowStyles="!border-0 !mx-8 hover:bg-transparent"
        tableCellStyles="flex flex-col w-full px-3 py-3 mb-4 shadow-sm rounded-2xl !border hover:bg-gray-50 transition-all ease-in duration-100 cursor-pointer"
        onClickRow={(id) => router.push(`/monitoring/subsector/${id}`)}
      />
    </>
  );
};
