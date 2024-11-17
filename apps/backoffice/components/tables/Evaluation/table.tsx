"use client";

import { SetStateAction, useEffect, useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { debounce } from "@/lib/utils";
import SelectFilterUnit from "@/components/SelectFilterUnit";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

export const EvaluationTable = ({
  members,
  currentUser,
  onFilterChange,
}: any) => {
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState<any>([]);
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

  const handleUnitChange = (unit: {
    id: string;
    title: string;
  } | null) => {
    setSeletedUnit(unit);
    setCurrentPage(1); // Reset to first page on unit change
    onFilterChange({ unit_pln: unit, search: searchValue });
  };

  async function fetchData() {
    setFetching(true);

    const filters: any = {
      completed: { _eq: 1 },
      ...(searchValue && { course: { title: { _contains: searchValue } } }),
      ...(selectedUnit?.id && { employee: { unit_pln: { _eq: selectedUnit?.id } } }),
    };

    if (dateRange?.from && dateRange?.to) {
      filters.date_created = {
        _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
      };
    }

    try {
      const { data: employeeCourses } = await fetch.get(
        "items/employee_course",
        {
          params: {
            fields: [
              "id",
              "exam_score",
              "tasks_score",
              "course.id",
              "course.title",
              "course.is_open_exam",
              "course.is_open_task",
              "employee.employee_id",
              "employee.unit_pln",
              "employee.unit",
            ],
            filter: filters,
          },
        },
      );

      const courseScores = employeeCourses?.data?.reduce(
        (
          acc: Record<
            string,
            {
              title: string;
              passedCount: number;
              notPassedCount: number;
            }
          >,
          course: any,
        ) => {
          const courseId = course.course.id;
          const title = course.course.title;
          const examScore = course.exam_score || 0;
          const tasksScore = course.tasks_score || 0;
          const isOpenExam = course.course.is_open_exam;
          const isOpenTask = course.course.is_open_task;

          // Initialize course data if not already present
          if (!acc[courseId]) {
            acc[courseId] = {
              title,
              passedCount: 0,
              notPassedCount: 0,
            };
          }

          // Apply the pass/fail evaluation formula
          const examEvaluation = isOpenExam ? (examScore / 100) * 70 : 0;
          const taskEvaluation = isOpenTask ? (tasksScore / 100) * 30 : 0;
          const totalEvaluation = examEvaluation + taskEvaluation;

          // Increment pass/fail counts based on total evaluation
          if (totalEvaluation >= 70) {
            acc[courseId].passedCount += 1;
          } else {
            acc[courseId].notPassedCount += 1;
          }

          return acc;
        },
        {},
      );

      // Format data to include pass percentage
      const formattedData = Object.keys(courseScores).map((courseId) => {
        const { title, passedCount, notPassedCount } = courseScores[courseId];
        const totalEvaluations = passedCount + notPassedCount;
        const passPercentage =
          totalEvaluations > 0 ? (passedCount / totalEvaluations) * 100 : 0;
        const notPassPercentage = 100 - passPercentage;

        return {
          id: courseId,
          title,
          pass_percentage: passPercentage.toFixed(2), // Pass percentage
          not_pass_percentage: notPassPercentage.toFixed(2), // Not pass percentage
        };
      });

      setData(formattedData);
      setTotalItems(formattedData.length);
      setFetching(false);
      updatePaginatedData(formattedData, currentPage, pageSize);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  // Updates paginated data based on current page and page size
  const updatePaginatedData = (allData: any[], page: number, size: number) => {
    const startIndex = (page - 1) * size;
    const paginatedData = allData.slice(startIndex, startIndex + size);
    setData(paginatedData);
  };

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
    dateRange
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
          <CalendarDateRangePicker
            selectedRange={dateRange}
            onChange={(range: SetStateAction<DateRange | undefined>) =>
              setDateRange(range)
            }
          />
          <div className="w-1/3">
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
