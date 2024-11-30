"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import BreadCrumb from "@/components/breadcrumb";
import { TaskTable } from "@/components/tables/Task/table";
import { Heading } from "@/components/ui/heading";
import TaskFormDialog from "@/components/forms/TaskFormDialog";
import { debounce } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";

export default function MasterDataSectorPage() {
  const pageName = "Tugas";
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState<boolean>(true);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  async function fetchData() {
    setFetching(true);
    let filters = searchValue ? { course: { title: { _contains: searchValue }, is_open_task: { _eq: 1 } } } : { course: { is_open_task: { _eq: 1 } } };

    try {
      const { data: res } = await fetch.get("items/employee_course", {
        params: {
          fields: ["id", "course.title", "employee.id", "employee.full_name", "tasks", "tasks_score", "employee_course_files.id"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: JSON.stringify(filters),
          meta: "total_count,filter_count",
        },
      });

      setTotalItems(res?.meta?.filter_count);
      setData(res?.data ?? []);
      setFetching(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchValue]);

  const columnsWithAction: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div
          id={row.original?.id}
          className="flex items-center justify-between"
        >
          <div className="flex flex-col">
            <div className="font-normal">
              Tugas {row.original?.course?.title ?? '-'}
              <Badge
                className="ml-4 font-normal"
                variant={row?.original?.tasks_score != 0 ? ((row?.original?.tasks_score ?? 0) < 51 ? "danger" : "success") : "secondary"}
              >
                {row?.original?.tasks_score !=0 ? row?.original?.tasks_score : "Belum ada penilaian"}
              </Badge>
            </div>
            <div className="font-light">Oleh {row.original?.employee?.full_name ?? '-'}</div>
          </div>
          {row?.original?.tasks?.length ? (
            <div className="flex items-center">
              <TaskFormDialog
                initialData={row?.original}
                triggerTitle={(
                  <Badge
                      className=""
                      variant={"secondary"}
                    >
                      Lihat tugas & penilaian
                  </Badge>
                )}
                dialogTriggerProps={{
                  className: "p-2 h-fit group hover:bg-transparent",
                  variant: "ghost",
                }}
                onSubmitCallback={() => fetchData()}
              />
            </div>
          ) : (
            <Badge
                className="ml-4 font-normal"
                variant={"destructive"}
              >
              Belum submit tugas
            </Badge>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <BreadCrumb
        items={[
          { title: pageName, link: "/task" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description={`Manajemen ${pageName}`} />
      </div>

      <TaskTable
        data={data}
        loading={fetching}
        customColumns={columnsWithAction}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        handleInputChange={handleInputChange}
        handlePageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}
