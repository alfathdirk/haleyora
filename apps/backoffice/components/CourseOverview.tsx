"use client";

import { useEffect, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function CourseOverview() {
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState(true);
  const [summary, setSummary] = useState<Array<object>>([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  async function fetchData() {
    try {
      const { data: resTotalCompleted } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            completed: {
              _eq: 1,
            },
          }),
          aggregate: JSON.stringify({
            count: "id",
          }),
        },
      });

      const { data: resTotalOngoing } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            completed: {
              _eq: 0,
            },
            exam_score: {
              _eq: 0,
            },
            exam_attempt: {
              _lte: 3,
            },
          }),
          aggregate: JSON.stringify({
            count: "id",
          }),
        },
      });

      const { data: resTotalQuizTaken } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            completed: {
              _eq: 1,
            },
            exam_score: {
              _lte: 0,
            },
          }),
          aggregate: JSON.stringify({
            count: "id",
          }),
        },
      });

      setSummary([
        { name: "Selesai", value: resTotalCompleted.data[0].count.id },
        // { name: "Ujian", value: 0 },
        { name: "Kuis", value: resTotalQuizTaken.data[0].count.id },
        { name: "Sedang Berjalan", value: resTotalOngoing.data[0].count.id },
      ]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
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
