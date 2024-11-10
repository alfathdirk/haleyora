"use client";

import { useEffect, useState } from "react";
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

interface Props {
  selectedUnit: string | null;
  selectedCourse: string | null;
  dateRange: DateRange | undefined;
}

export function UnitOverview({ selectedUnit, selectedCourse, dateRange }: Props) {
  const fetch = useDirectusFetch();
  const [fetching, setFetching] = useState(true);
  const [dataBarchart, setDataBarchart] = useState<
    Array<{ name: string; examAverage: number; tasksAverage: number }>
  >([]);

  async function fetchData() {
    setFetching(true);
    try {
      // Define filters based on selectedUnit, selectedCourse, and dateRange
      const filters: any = {
        completed: true,
      };

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };
      }

      const { data: employeeCourses } = await fetch.get("items/employee_course", {
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

      // Filter data based on selectedUnit and selectedCourse before grouping
      const filteredCourses = employeeCourses?.data?.filter((course: any) => {
        const matchesUnit = selectedUnit ? course.employee.unit === selectedUnit : true;
        const matchesCourse = selectedCourse ? course.course.id === selectedCourse : true;
        return matchesUnit && matchesCourse;
      });

      // Group data by unit, only including scores if the respective `is_open` flags are true
      const unitScores = filteredCourses.reduce(
        (
          acc: Record<
            string,
            {
              examTotal: number;
              tasksTotal: number;
              examCount: number;
              taskCount: number;
            }
          >,
          ec: any, // Employee Course
        ) => {
          const unit = ec.employee.unit;
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

          // Add to totals and increment counts based on the `is_open` flags
          if (isOpenExam) {
            acc[unit].examTotal += examScore;
            acc[unit].examCount += 1;
          }
          if (isOpenTask) {
            acc[unit].tasksTotal += tasksScore;
            acc[unit].taskCount += 1;
          }

          return acc;
        },
        {},
      );

      // Calculate average scores for each unit and format the data for the chart
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
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  // Debounce fetchData when filters change
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceFetch);
  }, [selectedUnit, selectedCourse, dateRange]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {fetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p>Sedang mengambil data...</p>
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
            <Tooltip />
            <Bar dataKey="examAverage" fill="#8884d8" name="Rata - rata Kuis" />
            <Bar dataKey="tasksAverage" fill="#82ca9d" name="Rata - rata Tugas" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
