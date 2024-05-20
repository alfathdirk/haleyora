"use client";

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

export function EmployeeOverview() {
  const data = [
    {
      name: "Jan 2024",
      selesai: 400,
      "sedang berjalan": 240,
    },
    {
      name: "Feb 2024",
      selesai: 300,
      "sedang berjalan": 139,
    },
    {
      name: "Maret 2024",
      selesai: 200,
      "sedang berjalan": 980,
    },
    {
      name: "April 2024",
      selesai: 278,
      "sedang berjalan": 390,
    },
    {
      name: "Mei 2024",
      selesai: 189,
      "sedang berjalan": 480,
    },
  ];

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
          dataKey="selesai"
          stroke="#FB896B"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="sedang berjalan"
          stroke="#6956E5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
