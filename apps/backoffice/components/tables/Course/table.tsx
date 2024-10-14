"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Book, Edit2Icon, EditIcon, LucideSearch, ThumbsUpIcon } from "lucide-react";
import { columns } from "./columns";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Clock5, Users2Icon } from "lucide-react";
import { formatDurationFromMinutes } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
// import CourseRecommendationFormDialog from "@/components/forms/CourseRecommendationFormDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteAction } from "@/app/(dashboard)/course/components/delete-action";

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


  const fetchData = async function () {
    try {
      let filters = { };

      if (searchValue) {
        Object.assign(filters, {
          title: {
            _contains: searchValue,
          },
        });
      }

      const { data: res } = await fetch.get("items/course", {
        params: {
          fields: ["*", "employee_course_files", "activities.*", "employee_course.id"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: filters,
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

  useEffect(() => {

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


  const cardColumns: ColumnDef<Course>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex items-end justify-center rounded-t-[20px]">
            <Avatar className="w-full h-48 rounded-none rounded-t-[20px]">
              <AvatarImage src={row.original?.imageUrl ?? ""} alt="@shadcn" />
              <AvatarFallback className="rounded-none">IMG</AvatarFallback>
            </Avatar>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "totalEmployeeCourse",
      cell: ({ row }) => (
        <div className="flex justify-between px-3 py-2 mb-2 text-xs text-[#878787] font-normal">
          <div className="flex items-center mr-1">
            <Users2Icon className="w-[14px] h-[14px] mr-1" />
            {row.original?.totalEmployeeCourse} Peminat
          </div>
          <div className="flex items-center">
            <Clock5 className="w-3 h-3 mr-1" />
            {row?.original?.duration ? formatDurationFromMinutes(row?.original?.duration) : "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "activities.title",
      header: "Kategori",
      cell: ({ row }) => (
        <div className="px-3 text-[10px] font-medium uppercase text-[#8E8D8D]">
          {row?.original?.activities?.title}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="px-3 pb-2 text-lg min-h-[5rem] font-semibold leading-tight text-[#515151]">
          {row?.original?.title ?? "-"}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <div
          id={row.original?.id}
          className="z-50 flex items-start px-3 mt-2 mb-4 gap-x-2"
        >
          <Button className="items-center font-semibold rounded-xl" size={"sm"} variant="default" onClick={() => router.push(`/course/${row.original?.id}`)}>
            <EditIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <DeleteAction
            data={row.original}
            onConfirmCallback={() => fetchData()}
          />
          {/* <CourseRecommendationFormDialog
              initialData={row?.original}
              triggerTitle={(
                <Button className="font-semibold" size={"sm"} variant="default">
                  <ThumbsUpIcon className="w-4 h-4 mr-2" />
                  Rekomendasi
                </Button>
              )}
              dialogTriggerProps={{
                className: "p-0 h-fit group hover:bg-transparent",
                variant: "ghost",
              }}
              // onSubmitCallback={() => fetchData()}
            /> */}
        </div>
      ),
    }
  ];

  return (
    <DataTable
      columns={currentLayout === "card" ? cardColumns : columns}
      layout="card"
      onLayoutChange={(val: string) => setCurrentLayout(val)}
      canChangeLayout={false}
      data={data}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      cardContainerStyles="!grid-cols-1 md:!grid-cols-3 lg:!grid-cols-4 !gap-12 px-2 md:pr-8 pb-8"
      cardStyles="p-0 rounded-3xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.18)] border border-[#F1F1F1] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500"
      onClickRow={() => {}}
      headerActions={headerActions}
    />
  );
};
