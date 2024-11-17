"use client";

import { useEffect, useState } from "react";
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

export function CoursesSummary({ selectedUnit, selectedCourse, dateRange }: Props) {
  const fetch = useDirectusFetch();

  const [allData, setAllData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortingFields, setSortingFields] = useState<
    { id: string; desc: boolean }[]
  >([]);
  const [fetching, setFetching] = useState(true);

  async function fetchData() {
    setFetching(true);

    // Build filters based on selectedUnit, selectedCourse, and dateRange
    const filters: any = {
      completed: true,
    };
    if (selectedUnit?.id) {
      filters.employee = { unit_pln: { _eq: selectedUnit?.id } };
    }
    if (selectedCourse?.id) {
      filters.course = { _eq: selectedCourse?.id };
    }
    if (dateRange?.from && dateRange?.to) {
      filters.date_created = {
        _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
      };
    }

    try {
      const { data: employeeCourses } = await fetch.get("items/employee_course", {
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
            "employee.unit",
          ],
          filter: filters,
        },
      });

      // Group data by course.id, calculate averages
      const courseScores = employeeCourses?.data?.reduce(
        (
          acc: Record<
            string,
            {
              title: string;
              examTotal: number;
              taskTotal: number;
              examCount: number;
              taskCount: number;
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

          if (!acc[courseId]) {
            acc[courseId] = {
              title,
              examTotal: 0,
              taskTotal: 0,
              examCount: 0,
              taskCount: 0,
            };
          }

          // Add scores if the respective `is_open` flags are true
          if (isOpenExam) {
            acc[courseId].examTotal += examScore;
            acc[courseId].examCount += 1;
          }
          if (isOpenTask) {
            acc[courseId].taskTotal += tasksScore;
            acc[courseId].taskCount += 1;
          }

          return acc;
        },
        {},
      );

      const formattedData = Object.keys(courseScores).map((courseId) => {
        const { title, examTotal, examCount, taskTotal, taskCount } =
          courseScores[courseId];
        const averageExam = examCount > 0 ? examTotal / examCount : 0;
        const averageTask = taskCount > 0 ? taskTotal / taskCount : 0;
        const averageScore = (averageExam + averageTask) / 2;

        return {
          id: courseId,
          title,
          average_score: averageScore.toFixed(2), // Rounded to 2 decimal places
        };
      });

      setAllData(formattedData);
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
  }, [selectedUnit, selectedCourse, dateRange]);

  useEffect(() => {
    updatePaginatedData(allData, currentPage, pageSize);
  }, [currentPage, pageSize, allData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortingState: any) => {
    setSortingFields(sortingState);
    setCurrentPage(1);
  };

  return (
    <DataTable
      layout="table"
      columns={columns}
      canChangeLayout={false}
      data={data}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      onSortChange={handleSortChange}
      scrollAreaStyles="h-[25vh]"
    />
  );
}
