"use client";

import { useEffect, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { DateRange } from "react-day-picker";

interface Props {
  data: Array<object>;
}

export function EvaluationCourseOverview({ data }: Props) {
  const fetch = useDirectusFetch();
  const [fetching, setFetching] = useState(true);
  const [summary, setSummary] = useState<
    Array<{ name: string; value: number }>
  >([]);

  const COLORS = ["#00C49F", "#ff5b5b"];

  async function convertData(data: Array<any>) {
    setFetching(true);
    try {
      const lulus = data?.filter((item) => item?.passed === 'Ya')?.length;
      const tidakLulus = data?.filter((item) => item?.passed !== 'Ya')?.length;

      setSummary([
        { name: "Lulus", value: lulus },
        { name: "Tidak Lulus", value: tidakLulus },
      ]);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    convertData(data);
  }, [data]);

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
