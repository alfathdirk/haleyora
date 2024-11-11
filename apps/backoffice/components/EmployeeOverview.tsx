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

interface Props {
  selectedUnit: string | null;
  selectedCourse: string | null;
  dateRange: DateRange | undefined;
}

// Helper function to format the month name
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

// Function to get the last 12 months from the current date
const getLastTwelveMonths = () => {
  const today = new Date();
  const months = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month in 'MM' format
    const year = date.getFullYear().toString();
    months.push({ month, year });
  }

  return months.reverse(); // Reverse to start from the oldest month
};

export function EmployeeOverview({
  selectedUnit,
  selectedCourse,
  dateRange,
}: Props) {
  const fetch = useDirectusFetch();
  const [data, setData] = useState(
    Array<{
      name: string;
      Lulus: number;
      "Tidak Lulus": number;
    }>,
  );

  // Function to group data by month and category
  const groupDataByMonth = (allCourses: EmployeeCourse[]) => {
    const months = getLastTwelveMonths(); // Get last 12 months dynamically
    const groupedData = months.map(({ month, year }) => {
      // Filter courses by the current month
      const coursesInMonth = allCourses.filter((course) => {
        const courseDate = new Date(course.date_created);
        return (
          courseDate.getFullYear() === parseInt(year, 10) &&
          courseDate.getMonth() + 1 === parseInt(month, 10)
        );
      });

      // Calculate the number of completed, running, and failed courses
      const completed = coursesInMonth.filter(
        (course) =>
          course.completed && course.exam_score >= course.course.min_score,
      ).length;
      const failed = coursesInMonth.filter(
        (course) =>
          course.completed && course.exam_score < course.course.min_score,
      ).length;

      return {
        name: formatMonth(parseInt(month, 10), year),
        Lulus: completed,
        "Tidak Lulus": failed,
      };
    });

    return groupedData;
  };

  // Function to fetch all courses for the last 12 months, including filters
  async function fetchAllCourses() {
    const months = getLastTwelveMonths();
    const startDate =
      dateRange?.from?.toISOString() ||
      `${months[0].year}-${months[0].month}-01`;
    const endDate =
      dateRange?.to?.toISOString() ||
      `${months[11].year}-${months[11].month}-31`;

    try {
      // Set up filters based on selectedUnit, selectedCourse, and dateRange
      const filters: any = {
        date_created: { _gte: startDate, _lte: endDate }, // Courses created in the specified range or last 12 months
      };

      if (selectedUnit) {
        filters.employee = { unit_pln: { _eq: selectedUnit } };
      }
      if (selectedCourse) {
        filters.course = { _eq: selectedCourse };
      }

      // Fetch all employee courses with related course information
      const { data: allCourses } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify(filters),
          fields: [
            "id",
            "completed",
            "exam_attempt",
            "exam_score",
            "date_created",
            "course.min_score",
          ], // Fetch related course.min_score
        },
      });

      // Group the data by month and calculate the needed categories
      const groupedData = groupDataByMonth(allCourses?.data);

      setData(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Debounce fetchAllCourses to avoid multiple calls on rapid state changes
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchAllCourses();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [selectedUnit, selectedCourse, dateRange]);

  return (
    <ResponsiveContainer width="100%" height="100%" className={"relative"}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <Legend align="right" />
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis stroke="" />
        <XAxis
          dataKey="name"
          className="!px-16 !text-red-200"
          padding={{ left: 30, right: 30 }}
          stroke=""
        />
        <Tooltip cursor={false} />
        <Line
          type="monotone"
          dataKey="Lulus"
          stroke="#6956E5"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="Tidak Lulus"
          stroke="#FF0000"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
