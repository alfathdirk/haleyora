"use client";

import {
  SetStateAction,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { DownloadCloud, LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import SelectFilterUnit from "@/components/SelectFilterUnit";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useDirectusContext } from "@/hooks/useDirectusContext";

export const EvaluationCourseTable = ({
  members,
  onFilterChange,
  onDataChange,
  courseId,
}: any) => {
  const fetch = useDirectusFetch();
  const { accessToken } = useDirectusContext();

  const [fetching, setFetching] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<any[]>([]); // Paginated and sorted data
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
      onFilterChange({
        unit: selectedUnit,
        search: nextValue,
        dateRange: dateRange,
      });
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
    onFilterChange({ unit: unit, search: searchValue, dateRange: dateRange });
  };

  async function fetchData() {
    if (courseId) {
      setFetching(true);

      const filters: any = {
        completed: { _eq: 1 },
        course: { _eq: courseId },
        employee: {
          full_name: {},
          id_region: {},
        },
      };

      if (searchValue) {
        filters["employee"].full_name = { _contains: searchValue };
      }

      if (selectedUnit?.id) {
        filters["employee"].id_region = { _eq: selectedUnit?.id.toString() };
      }

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };
      }

      try {
        const { data: res } = await fetch.get("items/employee_course", {
          params: {
            fields: [
              "id",
              "employee.id_region.name",
              "employee.full_name",
              "exam_score",
              "exam_score_final",
              "tasks_score",
              "tasks_score_final",
              "score_final",
              "is_passed",
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
        });

        if (onDataChange) {
          onDataChange(res?.data);
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
    dateRange,
    sortingFields,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortingState: any) => {
    setSortingFields(sortingState);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    if (courseId) {
      setExporting(true);
      const filters: any = {
        completed: { _eq: 1 },
        course: { _eq: courseId },
      };

      if (searchValue) {
        filters.employee = { full_name: { _contains: searchValue } };
      }

      if (selectedUnit?.id) {
        filters.employee = Object.assign(filters?.employee ?? {}, {
          id_region: { _eq: selectedUnit?.id.toString() }
        })
      }

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };
      }

      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const title = `report-evaluation-${timestamp}`;

      try {
        await fetch.post("utils/export/employee_course", {
          body: {
            format: "csv",
            file: {
              title,
            },
            query: {
              fields: [
                "employee.id_region.name",
                "employee.unit_pln",
                "employee.employee_id",
                "employee.full_name",
                "course.title",
                "exam_score_final",
                "tasks_score_final",
                "score_final",
                "is_passed",
                // "exam_score",
                // "tasks_score",
              ],
              filter: filters,
              limit: 10000
            },
          },
        });

        const file = await pollForFile(title);

        const downloadUrl = getDownloadUrl(file.id);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";
        link.click();

      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setExporting(false);
      }
    }
  };

  const pollForFile = async (title: string, maxAttempts: number = 10, delayMs: number = 3000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const { data: res } = await fetch.get("files", {
          params: {
            fields: ["id", "title"],
            filter: {
              title: {
                _eq: title,
              },
            },
          },
        });

        if (res?.data.length > 0) {
          // File is ready
          return res?.data[0]; // Return the file metadata
        }
      } catch (error) {
        console.error(`Attempt ${attempt}: Error checking file readiness`, error);
      }

      // Wait before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    throw new Error("File not ready after maximum attempts");
  };

  const getDownloadUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${fileId}?download=&access_token=${accessToken}`;
  };

  const headerActions = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-full space-x-2 ">
          <CalendarDateRangePicker
            selectedRange={dateRange}
            onChange={(range: SetStateAction<DateRange | undefined>) => {
              setDateRange(range);
              onFilterChange({
                unit: selectedUnit,
                search: searchValue,
                dateRange: range,
              });
            }}
          />
          <div className="w-full">
            <SelectFilterUnit
              selectedUnit={selectedUnit}
              onUnitChange={handleUnitChange}
            />
          </div>
          <div className="w-2/5">
            <Button className="text-xs md:text-sm" onClick={handleExport}>
              <DownloadCloud className="w-4 h-4 mr-2" />{" "}
              {exporting ? "Mohon Tunggu.." : "Unduh Data"}
            </Button>
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
