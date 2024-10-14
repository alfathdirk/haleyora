"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import { cardColumns } from "./columns-card";
import { useRouter } from "next/navigation";

export const EmployeesTable = ({ members, currentUser }: any) => {
  const fetch = useDirectusFetch();
  const router = useRouter();

  const [currentLayout, setCurrentLayout] = useState<"card" | "table">("table");
  const [data, setData] = useState<any>([]);
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

      if (!["Administrator", "Admin Pusat"].includes(currentUser?.role?.name)) {
        Object.assign(filters, {
          employee_id: {
            _in: members,
          },
        });
      }

      const { data: res } = await fetch.get("items/employee", {
        params: {
          fields: ["id", "employee_id", "email", "full_name", "status", "employee_course.id", "employee_course.completed", "employee_course.exam_score", "employee_course.tasks_score"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: filters,
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchValue, members]);

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
    <DataTable
      layout={currentLayout}
      columns={currentLayout === "card" ? cardColumns : columns}
      onLayoutChange={(val: any) => setCurrentLayout(val)}
      canChangeLayout={false}
      data={data}
      headerActions={headerActions}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      cardContainerStyles="!grid-cols-3 gap-8 py-4 pr-8"
      cardStyles="p-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
      onClickRow={(item) => router.push(`/employees/${item?.id}?name=${encodeURIComponent(item?.full_name)}`)}
    />
  );
};
