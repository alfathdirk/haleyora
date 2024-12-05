"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeeCourse } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import EmpCourseRecFormDialog from "../dialog/EmpCourseRecFormDialog";
import { Button } from "@/components/ui/button";
import { DeleteAction } from "../delete-action";

export const EmployeeCourseRecommendationTable = ({ employeeId }: { employeeId: string }) => {
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState<boolean>(true);
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

  const columns: ColumnDef<EmployeeCourse>[] = [
    {
      accessorKey: "course.title",
      header: "Materi",
      cell: ({ row }) => {
        return <div>{row?.original?.course?.title ?? ''}</div>;
      },
    },
    {
      accessorKey: "course.is_open_exam",
      header: "Ujian",
      cell: ({ row }) => {
        const hasQuiz = row?.original?.course?.is_open_exam;
        return (
          <Badge
            className="!font-semibold"
            variant={hasQuiz ? "success" : "secondary"}
          >
            {hasQuiz ? "Ya" : "Tidak"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "course.is_open_task",
      header: "Tugas",
      cell: ({ row }) => {
        const hasTask = row?.original?.course?.is_open_task;
        return (
          <Badge
            className="!font-semibold"
            variant={hasTask ? "success" : "secondary"}
          >
            {hasTask ? "Ya" : "Tidak"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "course.min_score",
      header: "Min. Nilai",
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        return (
          <DeleteAction
            data={row.original}
            onConfirmCallback={() => fetchData()}
          />
        );
      },
    }
  ];

  const fetchData = async function () {
    try {
      setFetching(true)
      let filters = { employee: { _eq: employeeId } };

      if (searchValue) {
        Object.assign(filters, {
          course: {
            title: { _contains: searchValue },
          },
        });
      }

      const { data: res } = await fetch.get("items/employee_course_recommendation", {
        params: {
          fields: [
            "id",
            "course.id", "course.title", "course.min_score", "course.is_open_exam", "course.is_open_task"
          ],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: filters,
          meta: "total_count,filter_count",
        },
      });

      setTotalItems(res?.meta?.filter_count);
      setData(res?.data ?? []);
      setFetching(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchValue]);

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
        <EmpCourseRecFormDialog
          employeeId={employeeId}
          employeeRecommendations={data}
          triggerTitle={(
            <Button
                className=""
                variant={"secondary"}
              >
                Tambah Rekomendasi
            </Button>
          )}
          dialogTriggerProps={{
            className: "p-2 h-fit group hover:bg-transparent",
            variant: "ghost",
          }}
          onSubmitCallback={() => fetchData()}
        />
      </div>
    );
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={fetching}
      canChangeLayout={false}
      headerActions={headerActions}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      cardContainerStyles="!grid-cols-3 gap-8 py-4 pr-8"
      cardStyles="p-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
    />
  );
};
