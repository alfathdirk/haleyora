"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Legend,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { EmployeeCourse } from "@/types/quiz";
import { DateRange } from "react-day-picker";
import { Loader } from "./ui/loader";

interface Props {
  selectedUnit: { id: string; title: string } | null;
  selectedCourse: { id: string; title: string } | null;
  dateRange: DateRange | undefined;
}

const formatMonth = (month: any, year: any) => {
  const months = [
    "Jan",
    "Feb",
    "Maret",
    "April",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return `${months[month - 1]} ${year}`;
};

const getLastTwelveMonths = () => {
  const today = new Date();
  const months = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    months.push({ month, year });
  }

  return months.reverse();
};

export function EmployeeOverview({
  selectedUnit,
  selectedCourse,
  dateRange,
}: Props) {
  const fetch = useDirectusFetch();
  const [data, setData] = useState<
    Array<{ name: string; Lulus: number; "Tidak Lulus": number }>
  >([]);
  const [loading, setLoading] = useState(false);

  const groupDataByMonth = (allCourses: EmployeeCourse[]) => {
    const months = getLastTwelveMonths();
    const groupedData = months.map(({ month, year }) => {
      const coursesInMonth = allCourses.filter((course) => {
        const courseDate = new Date(course.date_created);
        return (
          courseDate.getFullYear() === parseInt(year, 10) &&
          courseDate.getMonth() + 1 === parseInt(month, 10)
        );
      });

      const passed = coursesInMonth.filter((course) => {
        const isOpenExam = course.course.is_open_exam;
        const isOpenTask = course.course.is_open_task;

        const examScore = course.exam_score || 0;
        const tasksScore = course.tasks_score || 0;

        const examEvaluation = isOpenExam
          ? (examScore / 100) * (isOpenTask ? 70 : 100)
          : 0;
        const taskEvaluation = isOpenTask ? (tasksScore / 100) * 30 : 0;

        const totalEvaluation = examEvaluation + taskEvaluation;

        return totalEvaluation >= course.course.min_score;
      }).length;

      const failed = coursesInMonth.filter((course) => {
        const isOpenExam = course.course.is_open_exam;
        const isOpenTask = course.course.is_open_task;

        const examScore = course.exam_score || 0;
        const tasksScore = course.tasks_score || 0;

        const examEvaluation = isOpenExam
          ? (examScore / 100) * (isOpenTask ? 70 : 100)
          : 0;
        const taskEvaluation = isOpenTask ? (tasksScore / 100) * 30 : 0;

        const totalEvaluation = examEvaluation + taskEvaluation;

        return totalEvaluation < course.course.min_score;
      }).length;

      return {
        name: formatMonth(parseInt(month, 10), year),
        Lulus: passed,
        "Tidak Lulus": failed,
      };
    });

    return groupedData;
  };

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const filters: any = { completed: { _eq: 1 } };

      if (selectedUnit?.id) {
        filters.employee = { id_region: { _eq: selectedUnit.id } };
      }

      if (selectedCourse?.id) {
        filters.course = { _eq: selectedCourse.id };
      }

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };
      }

      const { data: allCourses } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify(filters),
          fields: [
            "id",
            "exam_score",
            "tasks_score",
            "date_created",
            "course.id",
            "course.title",
            "course.is_open_exam",
            "course.is_open_task",
            "course.min_score",
            "employee.employee_id",
            "employee.full_name",
          ],
        },
      });

      const groupedData = groupDataByMonth(allCourses?.data || []);
      setData(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(fetchAllCourses, 500);
    return () => clearTimeout(debounceFetch);
  }, [selectedUnit, selectedCourse, dateRange]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
        <p className="ml-2 text-sm">Sedang mengambil data...</p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <Legend align="right" />
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis stroke="" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} stroke="" />
        <Tooltip cursor={false} />
        <Line
          type="monotone"
          dataKey="Lulus"
          stroke="#00C49F"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Tidak Lulus"
          stroke="#ff5b5b"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
