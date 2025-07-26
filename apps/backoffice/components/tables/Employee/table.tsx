"use client";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { cardColumns } from "./columns-card";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SelectFilterUnit from "@/components/SelectFilterUnit";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

export const EmployeesTable = ({
  members,
  currentUser,
  onFilterChange,
}: any) => {
  const fetch = useDirectusFetch();
  const router = useRouter();

  const [currentLayout, setCurrentLayout] = useState<"card" | "table">("table");
  const [data, setData] = useState<any>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [searchValue, setSearchValue] = useState("");
  const [selectedUnit, setSeletedUnit] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [sortingFields, setSortingFields] = useState<
    { id: string; desc: boolean }[]
  >([]);

  const onInputChange = useCallback(
    (nextValue: string) => {
      setSearchValue(nextValue);
      onFilterChange({ dateRange: dateRange, id_region: selectedUnit, search: nextValue });
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

  const handleUnitChange = (unit: {
    id: string;
    title: string;
  } | null) => {
    setSeletedUnit(unit);
    setCurrentPage(1);
    onFilterChange({ dateRange: dateRange, id_region: unit, search: searchValue });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range)
    setCurrentPage(1);
    onFilterChange({ dateRange: range, id_region: selectedUnit, search: searchValue });
  };

  async function fetchData() {
    try {
      setFetching(true)
      const filters: any = {
        ...(searchValue && { full_name: { _contains: searchValue } }),
        ...(selectedUnit?.id && { id_region: { _eq: selectedUnit?.id } }),
      };

      if (dateRange?.from && dateRange?.to) {
        filters.employee_course = {
          date_created: {
            _between: [
              dateRange.from.toISOString(),
              dateRange.to.toISOString(),
            ],
          },
          completed: {
            _eq: 1,
          },
        };
      }

      if (!["Administrator", "Admin Pusat"].includes(currentUser?.role?.name)) {
        filters.employee_id = { _in: members };
      }

      const sortParams = sortingFields.map(
        (field) => `${field.desc ? "-" : ""}${field.id}`,
      );

      const { data: res } = await fetch.get("items/employee", {
        params: {
          fields: [
            "id",
            "employee_id",
            "email",
            "full_name",
            "status",
            "employee_course.id",
            "employee_course.completed",
            "employee_course.exam_score",
            "employee_course.tasks_score",
            "employee_course.date_created",
          ],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: filters,
          sort: sortParams,
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
  }, [
    currentPage,
    pageSize,
    searchValue,
    members,
    selectedUnit,
    sortingFields,
    dateRange,
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
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2 w-full">
          <div className="w-1/2">
            <SelectFilterUnit
              selectedUnit={selectedUnit}
              onUnitChange={handleUnitChange}
            />
          </div>
          <CalendarDateRangePicker
            selectedRange={dateRange}
            onChange={handleDateChange}
          />
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
      layout={currentLayout}
      columns={currentLayout === "card" ? cardColumns : columns}
      onLayoutChange={(val: any) => setCurrentLayout(val)}
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
      cardContainerStyles="!grid-cols-3 gap-8 py-4 pr-8"
      cardStyles="p-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
      onClickRow={(item) =>
        router.push(
          `/employees/${item?.id}?name=${encodeURIComponent(item?.full_name)}`,
        )
      }
      onSortChange={handleSortChange}
    />
  );
};
