"use client";

import { Square } from "lucide-react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

export function EmployeeOverview() {
  const data = [
    {
      name: "Page A",
      done: 4000,
      ongoing: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      done: 3000,
      ongoing: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      done: 2000,
      ongoing: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      done: 2780,
      ongoing: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      done: 1890,
      ongoing: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      done: 2390,
      ongoing: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      done: 3490,
      ongoing: 4300,
      amt: 2100,
    },
  ];

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div className="absolute flex flex-col w-1/2 left-[65%] -top-16 gap-y-3">
        {payload.map((entry, index) => (
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
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="!px-16" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend align="left" verticalAlign="top" style={{  marginBottom: '200px' }} />
        <Line type="monotone" dataKey="done" stroke="#FB896B" />
        <Line type="monotone" dataKey="ongoing" stroke="#6956E5" />
      </LineChart>
    </ResponsiveContainer>
  );
}
