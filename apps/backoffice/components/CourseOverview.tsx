"use client";

import { useEffect, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { DateRange } from "react-day-picker";

interface Props {
  selectedUnit: { id: string; title: string } | null;
  selectedCourse: { id: string; title: string } | null;
  dateRange: DateRange | undefined;
}

export function CourseOverview({
  selectedUnit,
  selectedCourse,
  dateRange,
}: Props) {
  const fetch = useDirectusFetch();
  const [fetching, setFetching] = useState(true);
  const [summary, setSummary] = useState<Array<{ name: string; value: number }>>([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  async function fetchData() {
    setFetching(true);
    try {
      const filters: any = {
        completed: { _eq: 1 },
      };

      if (selectedUnit?.id) {
        filters.employee = { id_region: { _eq: selectedUnit?.id } };
      }

      if (selectedCourse?.id) {
        filters.course = { _eq: selectedCourse?.id };
      }

      if (dateRange?.from && dateRange?.to) {
        filters.date_created = {
          _between: [dateRange.from.toISOString(), dateRange.to.toISOString()],
        };

        // Add course availability filter
        const courseAvailabilityFilter = {
          start_date: { _lte: dateRange.to.toISOString() },
          end_date: { _gte: dateRange.from.toISOString() }
        };

        const { data: resTotalCompleted } = await fetch.get("items/employee_course", {
          params: {
            filter: JSON.stringify(filters),
            aggregate: JSON.stringify({ count: "id" }),
            deep: JSON.stringify({
              course: {
                course_availability: {
                  _filter: courseAvailabilityFilter
                }
              }
            }),
          },
        });

        const { data: resTotalOngoing } = await fetch.get("items/employee_course", {
          params: {
            filter: JSON.stringify({
              ...filters,
              completed: { _eq: 0 },
              exam_score: { _eq: 0 },
              exam_attempt: { _lte: 3 },
            }),
            aggregate: JSON.stringify({ count: "id" }),
            deep: JSON.stringify({
              course: {
                course_availability: {
                  _filter: courseAvailabilityFilter
                }
              }
            }),
          },
        });

        const { data: resTotalQuizTaken } = await fetch.get("items/employee_course", {
          params: {
            filter: JSON.stringify({
              ...filters,
              completed: { _eq: 1 },
              exam_score: { _lte: 0 },
            }),
            aggregate: JSON.stringify({ count: "id" }),
            deep: JSON.stringify({
              course: {
                course_availability: {
                  _filter: courseAvailabilityFilter
                }
              }
            }),
          },
        });

        setSummary([
          { name: "Selesai", value: resTotalCompleted.data[0].count.id || 0 },
          { name: "Ujian", value: resTotalQuizTaken.data[0].count.id || 0 },
          {
            name: "Sedang Berjalan",
            value: resTotalOngoing.data[0].count.id || 0,
          },
        ]);

      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    // Debounce effect for fetchData
    const delayDebounceFn = setTimeout(() => {
      // Validate if date range is fully provided before fetching
      if (!dateRange || (dateRange.from && dateRange.to)) {
        fetchData();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [selectedUnit, selectedCourse, dateRange]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="absolute flex flex-col w-1/2 left-[65%] -top-16 gap-y-3">
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="inline-flex gap-x-2 items-center"
          >
            <div
              className={"w-3 h-3"}
              style={{ background: COLORS[index] }}
            ></div>
            {entry.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%" className={"relative"}>
      <PieChart>
        <Pie
          data={summary}
          cx="30%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {summary.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend content={renderLegend} verticalAlign="middle" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}
