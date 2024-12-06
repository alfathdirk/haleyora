"use client";

import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { ColumnDef } from "@tanstack/react-table";
import CourseAvailabilityFormDialog from "../dialog/CourseAvailabilityFormDialog";
import { DeleteAction } from "../delete-action";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { CourseAvailability } from "@/types/courseAvailability";
import { CourseAvailabilityType } from "@/constants/course_avaibility";

export const CourseAvailabilityTable = ({
  courseId,
  setAvailabilityData,
}: {
  courseId: string;
  setAvailabilityData: (data: any[]) => void;
}) => {
  const fetch = useDirectusFetch();

  const [allData, setAllData] = useState<any[]>([]);
  const [unitRegion, setUnitRegion] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Total items count
  const totalItems = allData.length;

  const columns: ColumnDef<CourseAvailability>[] = [
    {
      accessorKey: "entity",
      header: "Entitas",
      cell: ({ row }) => {
        return <div>{CourseAvailabilityType[row?.original?.entity] ?? ""}</div>;
      },
    },
    {
      accessorKey: "entity_name",
      header: "Nama Entitas",
      cell: ({ row }) => {
        const enitity = row?.original?.entity;
        if (enitity == "unit_region") {
          const value = unitRegion?.find(
            (i) => i.id_region == row?.original?.entity_name,
          );
          return <div>{value?.name ?? ""}</div>;
        }
        return <div>{row?.original?.entity_name ?? ""}</div>;
      },
    },
    {
      accessorKey: "start_date",
      header: "Tanggal Mulai",
      cell: ({ row }) => {
        return (
          <div>
            {format(new Date(row?.original?.start_date?.includes("Z") ? row?.original.start_date : row?.original.start_date + "Z"), "dd MMMM yyyy", {
              locale: id,
            }) ?? "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "end_date",
      header: "Tanggal Berakhir",
      cell: ({ row }) => {
        return (
          <div>
            {format(new Date(row?.original?.end_date?.includes("Z") ? row?.original.end_date : row?.original?.end_date + "Z"), "dd MMMM yyyy", {
              locale: id,
            }) ?? "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        return (
          <DeleteAction
            data={row.original}
            onConfirmCallback={handleRemoveFromData}
          />
        );
      },
    },
  ];

  const handleRemoveFromData = (data: any) => {
    const updatedData = allData.filter((item) => item.id !== data.id);
    setAllData(updatedData); // Update the state in the parent component
  };

  // Fetch all data once
  const fetchData = async function () {
    try {
      let filters = { course: { _eq: courseId } };

      const {
        data: res2,
      }: { data: { data: { id_region: string | null; name: string }[] } } =
        await fetch.get("items/unit_region", {
          params: { fields: ["*"] },
        });
      setUnitRegion(res2?.data);

      const { data: res } = await fetch.get("items/course_availability", {
        params: {
          fields: [
            "id",
            "course.id",
            "entity",
            "entity_name",
            "start_date",
            "end_date",
          ],
          filter: filters,
        },
      });

      setAllData(res?.data ?? []); // Store all data locally
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Update setAvailabilityData when allData changes
  useEffect(() => {
    setAvailabilityData(allData);
  }, [allData, setAvailabilityData]);

  // Calculate paginated data using useMemo
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return allData.slice(start, end); // Get only the current page's items
  }, [allData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const headerActions = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="pr-4">
          <div className="text-lg font-normal">Jadwal Ketersediaan</div>
        </div>
        <CourseAvailabilityFormDialog
          courseId={courseId}
          allData={allData}
          setAllData={setAllData}
          triggerTitle={
            <div className="px-3 py-1 rounded-lg bg-secondary">Tambah</div>
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
      data={paginatedData} // Pass paginated data to the table
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
