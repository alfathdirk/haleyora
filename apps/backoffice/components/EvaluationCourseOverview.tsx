"use client";

import { useEffect, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface Props {
  courseId?: any;
  parentFilters?: {
    unit: {
      id: string;
      title: string;
    } | null;
    search: string;
    dateRange: any;
  };
}

export function EvaluationCourseOverview({ courseId, parentFilters }: Props) {
  const fetch = useDirectusFetch();
  const [fetching, setFetching] = useState(true);
  const [summary, setSummary] = useState<
    Array<{ name: string; value: number }>
  >([]);

  const COLORS = ["#00C49F", "#ff5b5b"];

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

      if (parentFilters?.search) {
        filters["employee"].full_name = { _contains: parentFilters?.search };
      }

      if (parentFilters?.unit?.id) {
        filters["employee"].id_region = {
          _eq: parentFilters?.unit?.id.toString(),
        };
      }

      if (parentFilters?.dateRange?.from && parentFilters?.dateRange?.to) {
        filters.date_created = {
          _between: [
            parentFilters?.dateRange.from.toISOString(),
            parentFilters?.dateRange.to.toISOString(),
          ],
        };
      }

      try {
        const { data: resPassed } = await fetch.get("items/employee_course", {
          params: {
            filter: { ...filters, is_passed: { _eq: 1 } },
            aggregate: JSON.stringify({
              count: ["id"],
            }),
          },
        });
        const { data: resNotPassed } = await fetch.get(
          "items/employee_course",
          {
            params: {
              filter: { ...filters, is_passed: { _eq: 0 } },
              aggregate: JSON.stringify({
                count: ["id"],
              }),
            },
          },
        );

        setSummary([
          { name: "Lulus", value: resPassed?.data[0]?.count?.id ?? 0 },
          { name: "Tidak Lulus", value: resNotPassed?.data[0]?.count?.id ?? 0 },
        ]);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setFetching(false);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [parentFilters]);

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
            className="inline-flex items-center gap-x-2"
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
