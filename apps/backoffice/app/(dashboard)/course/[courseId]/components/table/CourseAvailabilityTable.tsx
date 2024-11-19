"use client";

import { DataTable } from "@/components/ui/data-table";
// import { Input } from "@/components/ui/input";
// import { LucideSearch } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import CourseAvailabilityFormDialog from "../dialog/CourseAvailabilityFormDialog";
import { Button } from "@/components/ui/button";
import { DeleteAction } from "../delete-action";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { CourseAvaibility } from "@/types/courseAvailbility";
import {CourseAvaibilityType} from "@/constants/course_avaibility";

export const CourseAvailabilityTable = ({
  courseId,
}: {
  courseId: string;
}) => {
  const fetch = useDirectusFetch();

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

  const columns: ColumnDef<CourseAvaibility>[] = [
    {
      accessorKey: "entity",
      header: "Entitas",
      cell: ({ row }) => {
        return <div>{CourseAvaibilityType[row?.original?.entity] ?? ""}</div>;
      },
    },
    {
      accessorKey: "entity_name",
      header: "Nama Entitas",
      cell: ({ row }) => {
        return <div>{row?.original?.entity_name ?? ""}</div>;
      },
    },
    {
      accessorKey: "start_date",
      header: "Tanggal Mulai",
      cell: ({ row }) => {
        return <div>{format(new Date(row?.original.start_date), 'dd MMMM yyyy', { locale: id }) ?? '-'}</div>;
      },
    },
    {
      accessorKey: "end_date",
      header: "Tanggal Berakhir",
      cell: ({ row }) => {
        return <div>{format(new Date(row?.original.end_date), 'dd MMMM yyyy', { locale: id }) ?? '-'}</div>;
      },
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
      let filters = { course: { _eq: courseId } };

      // if (searchValue) {
      //   Object.assign(filters, {
      //     course: {
      //       title: { _contains: searchValue },
      //     },
      //   });
      // }

      const { data: res } = await fetch.get(
        "items/course_availability",
        {
          params: {
            fields: [
              "id",
              "course.id",
              "entity",
              "entity_name",
              "start_date",
              "end_date",
            ],
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: filters,
            meta: "total_count,filter_count",
          },
        },
      );

      setTotalItems(res?.meta?.filter_count);
      setData(res?.data ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchValue, courseId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const headerActions = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="pr-4">
          {/* <div className="flex items-center w-full px-4 border-2 border-[#787486] rounded-xl gap-x-2 focus-within:!border-[#00A9E3]">
            <LucideSearch className="w-6 h-6 text-[#959595]" />
            <Input
              className="!border-none shadow-none px-0 focus-visible:!ring-0"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div> */}
          <div className="mt-4 text-lg font-normal">Jadwal Ketersediaan</div>
        </div>
        <CourseAvailabilityFormDialog
          courseId={courseId}
          triggerTitle={
            <Button type="button" size={'sm'} className="" variant={"secondary"}>
              Tambah
            </Button>
          }
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
      canChangeLayout={false}
      headerActions={headerActions}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      scrollAreaStyles="h-64 !mt-2"
      cardContainerStyles="!grid-cols-3 gap-8 py-4 pr-8"
      cardStyles="p-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
    />
  );
};
