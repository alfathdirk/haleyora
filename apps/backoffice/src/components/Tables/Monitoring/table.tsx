"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useEffect, useState, useContext } from "react";
import { DirectusContext } from "@/provider/Directus";
import { readItems, aggregate } from "@directus/sdk";

export const MonitoringTable = () => {
  const { client } = useContext(DirectusContext);

  const [currentLayout, setCurrentLayout] = useState("card");

  const [data, setData] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // TODO: get total with search
    async function fetchTotalCount() {
      try {
        const data = await client.request(
          aggregate("category", {
            filter: searchQuery
              ? { full_name: { _contains: searchQuery } }
              : {}, // # not working
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
        const filters = searchQuery
          ? { full_name: { _contains: searchQuery } }
          : {};

        const result = await client.request(
          readItems("category", {
            fields: ["*"],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: filters,
          })
        );

        const token = await client.getToken();

        result.forEach(category => {
            if (category.image) {
                category.imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${category.image}?access_token=${token}`;
            }
        });

        setData(result ?? []);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }

    fetchTotalCount();
    fetchData();
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
        columns={currentLayout === 'card' ? cardColumns : columns}
        layout="card"
        onLayoutChange={(val: string) => setCurrentLayout(val)}
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
      />
    </>
  );
};
