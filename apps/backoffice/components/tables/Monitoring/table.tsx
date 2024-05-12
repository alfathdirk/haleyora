"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";

export const MonitoringTable = () => {
  const router = useRouter();
  const { accessToken } = useDirectusContext();
  const fetch = useDirectusFetch();

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

  async function fetchData() {
    try {
      const filters = searchValue
        ? { full_name: { _contains: searchValue } }
        : {};

      const { data: res } = await fetch.get("items/category", {
        params: {
          fields: ["*"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: JSON.stringify(filters),
          meta: "total_count,filter_count",
        },
      });

      res?.data.forEach((item: any) => {
        if (item.image) {
          item.imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${item.image}?access_token=${accessToken}`;
        }
      });

      setTotalItems(res?.meta?.filter_count);
      setData(res?.data ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, accessToken, pageSize, searchValue]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const headerActions = () => {
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
  };

  return (
    <>
      <DataTable
        columns={currentLayout === "card" ? cardColumns : columns}
        layout="card"
        onLayoutChange={(val: string) => setCurrentLayout(val)}
        data={data}
        headerActions={headerActions}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        cardContainerStyles="!grid-cols-5"
        cardStyles="py-3 px-2 rounded-xl shadow-xl shadow-[#F4F4F4] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
        onClickRow={(id) => router.push(`/monitoring/sector/${id}`)}
      />
    </>
  );
};
