"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import SelectFilterUnit from "@/components/SelectFilterUnit";

export const EvaluationCourseTable = ({
  members,
  onFilterChange,
  onDataChange,
  courseId,
}: any) => {
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<any[]>([]); // Paginated and sorted data
  const [totalItems, setTotalItems] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [selectedUnit, setSeletedUnit] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [sortingFields, setSortingFields] = useState<
    { id: string; desc: boolean }[]
  >([]);

  const onInputChange = useCallback(
    (nextValue: string) => {
      setSearchValue(nextValue);
      onFilterChange({ unit: selectedUnit, search: nextValue });
    },
    [selectedUnit],
  );

  const debouncedSearchChange = useMemo(
    () => debounce(onInputChange, 500),
    [onInputChange],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    debouncedSearchChange(nextValue);
  };

  const handleUnitChange = (
    unit: {
      id: string;
      title: string;
    } | null,
  ) => {
    setSeletedUnit(unit);
    setCurrentPage(1);
    onFilterChange({ unit: unit, search: searchValue });
  };

  async function fetchData() {
    if (courseId) {
      setFetching(true);

      const filters: any = {
        completed: { _eq: 1 },
        course: { _eq: courseId },
        employee: {
          full_name: {},
          unit_pln: {},
        },
      };

      if (searchValue) {
        filters["employee"].full_name = { _contains: searchValue };
      }

      if (selectedUnit?.id) {
        filters["employee"].id_region = { _eq: selectedUnit?.id.toString() };
      }

      try {
        const { data: res } = await fetch.get(
          "items/employee_course",
          {
            params: {
              fields: [
                "id",
                "exam_score",
                "exam_score_final",
                "tasks_score",
                "tasks_score_final",
                "score_final",
                "is_passed",
                "employee.full_name",
                "employee.id_region.name",
              ],
              filter: filters,
              limit: pageSize,
              offset: (currentPage - 1) * pageSize,
              sort: sortingFields.map((field) => {
                if (field.id === "employee_full_name") {
                  return `${field.desc ? "-" : ""}employee.full_name`;
                }
                return `${field.desc ? "-" : ""}${field.id}`;
              }),
              meta: "total_count,filter_count",
            },
          },
        );

        if (onDataChange) {
          onDataChange(res?.data)
        }

        setData(res?.data ?? []);
        setTotalItems(res?.meta?.filter_count);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setFetching(false);
      }
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    courseId,
    currentPage,
    pageSize,
    searchValue,
    members,
    selectedUnit,
    sortingFields,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortingState: any) => {
    setSortingFields(sortingState);
    setCurrentPage(1);
  };

  const headerActions = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-full space-x-2 ">
          <div className="w-3/5">
            <SelectFilterUnit
              selectedUnit={selectedUnit}
              onUnitChange={handleUnitChange}
            />
          </div>
        </div>
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
      layout="table"
      columns={columns}
      canChangeLayout={false}
      data={data}
      loading={fetching}
      headerActions={headerActions}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      onSortChange={handleSortChange}
    />
  );
};
