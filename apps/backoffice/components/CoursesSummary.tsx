"use client";

import { useEffect, useMemo, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { EmployeeCourse } from "@/types/quiz";
import { DateRange } from "react-day-picker";

interface Props {
  selectedUnit: { id: string; title: string } | null;
  selectedCourse: { id: string; title: string } | null;
  dateRange: DateRange | undefined;
}

const columns: ColumnDef<EmployeeCourse>[] = [
  {
    accessorKey: "title",
    header: "Materi Pembelajaran",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.title ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "average_score",
    header: "Nilai Rata - rata",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 bg-gray-200 dark:bg-gray-600 rounded-full w-fit">
        {row.original?.average_score ?? "-"}
      </div>
    ),
  },
];

export function CoursesSummary({
  selectedUnit,
  selectedCourse,
  dateRange,
}: Props) {
  const fetch = useDirectusFetch();

  const [allData, setAllData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [fetching, setFetching] = useState(true);

  async function fetchData() {
    setFetching(true);

    const filters: any = {};
    const deep: any = {
      employee_course: {
        _filter: {
          completed: {
            _eq: 1,
          },
        },
      },
    };

    if (selectedUnit?.id) {
      deep.employee_course._filter.employee = {
        id_region: { _eq: selectedUnit?.id },
      };
    }

    if (dateRange?.from && dateRange?.to) {
      filters["employee_course"] = {
        date_created: {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        },
      };
    }

    if (selectedCourse?.id) {
      filters.id = { _eq: selectedCourse?.id };
    }

    try {
      const { data: employeeCourses } = await fetch.get("items/course", {
        params: {
          fields: [
            "id",
            "title",
            "is_open_exam",
            "is_open_task",
            "employee_course.exam_score",
            "employee_course.tasks_score",
          ],
          filter: filters,
          deep,
        },
      });

      const formattedData = employeeCourses?.data.map((course: any) => {
        const { id, title, is_open_exam, is_open_task, employee_course } =
          course;

        let totalEvaluationSum = 0;
        let totalCount = 0;

        employee_course.forEach(
          (record: {
            exam_score: number | null;
            tasks_score: number | null;
          }) => {
            const examScore = record.exam_score || 0;
            const tasksScore = record.tasks_score || 0;

            const examEvaluation = is_open_exam
              ? (examScore / 100) * (is_open_task ? 70 : 100)
              : 0;
            const taskEvaluation = is_open_task ? (tasksScore / 100) * 30 : 0;

            const totalEvaluation = examEvaluation + taskEvaluation;

            totalEvaluationSum += totalEvaluation;
            totalCount += 1;
          },
        );

        const averageEvaluation =
          totalCount > 0 ? totalEvaluationSum / totalCount : 0;

        return {
          id,
          title,
          average_score: averageEvaluation.toFixed(2), // Rounded to 2 decimal places
        };
      });

      setAllData(formattedData);
      setTotalItems(formattedData.length);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedUnit, selectedCourse, dateRange]);

  // Memoized calculation for paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return allData.slice(startIndex, startIndex + pageSize);
  }, [allData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DataTable
      layout="table"
      columns={columns}
      canChangeLayout={false}
      data={paginatedData}
      loading={fetching}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      scrollAreaStyles="h-[350px]"
    />
  );
}
