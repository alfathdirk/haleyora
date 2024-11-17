"use client";

import { useEffect, useState, useCallback } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Bar,
} from "recharts";
import { DateRange } from "react-day-picker";
import { Loader } from "./ui/loader";

interface Props {
  selectedUnit: { id: string; title: string } | null;
  selectedCourse: { id: string; title: string } | null;
  dateRange: DateRange | undefined;
}

interface EmployeeCourse {
  id: string;
  exam_score: number | null;
  tasks_score: number | null;
  course: {
    id: string;
    is_open_exam: boolean;
    is_open_task: boolean;
  };
  employee: {
    employee_id: string;
    unit: string;
  };
}

type UnitScores = Record<
  string,
  {
    examTotal: number;
    tasksTotal: number;
    examCount: number;
    taskCount: number;
  }
>;

export function UnitOverview({
  selectedUnit,
  selectedCourse,
  dateRange,
}: Props) {
  const fetch = useDirectusFetch();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataBarchart, setDataBarchart] = useState<
    Array<{ name: string; examAverage: number; tasksAverage: number }>
  >([]);

  const fetchData = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const filters: any = {
        completed: { _eq: 1 },
      };

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };

        const { data: employeeCourses }: { data: { data: EmployeeCourse[] } } =
          await fetch.get("items/employee_course", {
            params: {
              fields: [
                "id",
                "exam_score",
                "tasks_score",
                "course.is_open_exam",
                "course.is_open_task",
                "course.id",
                "employee.employee_id",
                "employee.unit",
              ],
              filter: filters,
            },
          });

        const filteredCourses = employeeCourses?.data?.filter((course) => {
          const matchesUnit = selectedUnit?.id
            ? course.employee.unit === selectedUnit.id
            : true;
          const matchesCourse = selectedCourse?.id
            ? course.course.id === selectedCourse.id
            : true;
          return matchesUnit && matchesCourse;
        });

        const unitScores = filteredCourses.reduce<UnitScores>((acc, ec) => {
          const unit = ec.employee.unit || "Unknown Unit";
          const examScore = ec.exam_score || 0;
          const tasksScore = ec.tasks_score || 0;
          const isOpenExam = ec.course.is_open_exam;
          const isOpenTask = ec.course.is_open_task;

          if (!acc[unit]) {
            acc[unit] = {
              examTotal: 0,
              tasksTotal: 0,
              examCount: 0,
              taskCount: 0,
            };
          }

          if (isOpenExam) {
            acc[unit].examTotal += examScore;
            acc[unit].examCount += 1;
          }
          if (isOpenTask) {
            acc[unit].tasksTotal += tasksScore;
            acc[unit].taskCount += 1;
          }

          return acc;
        }, {});

        const formattedData = Object.keys(unitScores).map((unit) => ({
          name: unit,
          examAverage:
            unitScores[unit].examCount > 0
              ? unitScores[unit].examTotal / unitScores[unit].examCount
              : 0,
          tasksAverage:
            unitScores[unit].taskCount > 0
              ? unitScores[unit].tasksTotal / unitScores[unit].taskCount
              : 0,
        }));

        setDataBarchart(formattedData);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setFetching(false);
    }
  }, [fetch, selectedUnit, selectedCourse, dateRange]);

  useEffect(() => {
    const debounceFetch = setTimeout(fetchData, 200);
    return () => clearTimeout(debounceFetch);
  }, [selectedUnit, selectedCourse, dateRange]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {fetching ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
          <p className="ml-2 text-sm">Sedang mengambil data...</p>
        </div>
      ) : error ? (
        <div className="flex flex-row items-center justify-center h-full px-3 py-2 text-sm text-red-500 rounded-md">
          <p>{error}</p>
          <button onClick={fetchData} className="ml-2 text-blue-500 underline">
            Retry
          </button>
        </div>
      ) : dataBarchart.length === 0 ? (
        <div className="flex items-center justify-center h-full text-sm">
          <p>No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataBarchart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <p>{`Unit: ${data.name}`}</p>
                    <p>{`Exam Average: ${(data.examAverage || 0).toFixed(
                      2,
                    )}`}</p>
                    <p>{`Tasks Average: ${(data.tasksAverage || 0).toFixed(
                      2,
                    )}`}</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="examAverage" fill="#8884d8" name="Rata - rata Kuis" />
            <Bar
              dataKey="tasksAverage"
              fill="#82ca9d"
              name="Rata - rata Tugas"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
