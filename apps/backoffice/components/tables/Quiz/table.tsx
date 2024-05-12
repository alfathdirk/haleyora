"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useEffect, useState, useMemo, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";

export const QuizTable = () => {
  const fetch = useDirectusFetch();
  const { accessToken } = useDirectusContext();

  const [currentLayout, setCurrentLayout] = useState("card");

  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = useCallback((nextValue: string) => {
    setSearchValue(nextValue);
    setCurrentPage(1);
  }, []);

  const debouncedSearchChange = useMemo(
    () => debounce(onInputChange, 500),
    [onInputChange],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    debouncedSearchChange(nextValue);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const filters = searchValue
          ? { title: { _contains: searchValue } }
          : {};

        const { data: res } = await fetch.get("items/quiz", {
          params: {
            fields: ["*"],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: JSON.stringify(filters),
            meta: "total_count,filter_count",
          },
        });

        setTotalItems(res?.meta?.filter_count);
        setData(res?.data ?? []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, currentPage, pageSize, searchValue]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function headerActions() {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="pr-4">
          <div className="flex items-center w-full px-4 border-2 border-[#787486] rounded-xl gap-x-2 focus-within:!border-[#00A9E3]">
            <LucideSearch className="w-6 h-6 text-[#959595]" />
            <Input
              className="!border-none shadow-none px-0 focus-visible:!ring-0"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={currentLayout === "card" ? cardColumns : columns}
        layout="card"
        onLayoutChange={(val: string) => setCurrentLayout(val)}
        data={data}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        cardContainerStyles="!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-2 !gap-12 px-2 md:pr-32 pb-8"
        cardStyles="shadow-md border border-[#F1F1F1] group transition-all ease-in-out duration-500 rounded-xl"
        headerActions={headerActions}
      />
    </>
  );
};
