"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Book, LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";

export const CourseTable = () => {
  const fetch = useDirectusFetch();
  const { accessToken } = useDirectusContext();
  const router = useRouter();

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

        const { data: res } = await fetch.get("items/course", {
          params: {
            fields: ["*", "employee_course_files", "activities.*", "employee_course.id"],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: JSON.stringify(filters),
            meta: "total_count,filter_count",
          },
        });

        res?.data?.forEach((item: Course) => {
          item.totalEmployeeCourse = item.employee_course?.length;
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

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, currentPage, pageSize, searchValue]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function headerActions() {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex gap-x-4">
          {/* <div className="inline-flex rounded-3xl text-[14px] items-center border-2 border-[#15BE4F] p-2 pr-4 cursor-pointer">
            <div className="bg-[#15BE4F] p-2 rounded-full text-white mr-2">
              <Book className="w-4 h-4" />
            </div>
            Paling Diminati
          </div>
          <div className="inline-flex rounded-3xl text-[14px] items-center border-2 border-[#007DD8] p-2 pr-4 cursor-pointer">
            <div className="bg-[#007DD8] p-2 rounded-full text-white mr-2">
              <Book className="w-4 h-4" />
            </div>
            Jarang Diminati
          </div> */}
        </div>

        <div className="pr-4 border-r border-[#787486]">
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
        cardContainerStyles="!grid-cols-1 md:!grid-cols-3 lg:!grid-cols-4 !gap-12 px-2 md:pr-8 pb-8"
        cardStyles="p-0 rounded-3xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.18)] border border-[#F1F1F1] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
        onClickRow={(item) => router.push(`/course/${item?.id}`)}
        headerActions={headerActions}
      />
    </>
  );
};
