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
      name: "Jan 2024",
      selesai: 4000,
      "sedang berjalan": 2400,
    },
    {
      name: "Feb 2024",
      selesai: 3000,
      "sedang berjalan": 1398,
    },
    {
      name: "Maret 2024",
      selesai: 2000,
      "sedang berjalan": 9800,
    },
    {
      name: "April 2024",
      selesai: 2780,
      "sedang berjalan": 3908,
    },
    {
      name: "Mei 2024",
      selesai: 1890,
      "sedang berjalan": 4800,
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
        <Legend
          align="right"
        />
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis stroke="" />
        <XAxis
          dataKey="name"
          className="!px-16 !text-red-200"
          padding={{ left: 30, right: 30 }}
          stroke=""
        />
        <Tooltip cursor={false} />
        <Line type="monotone" dataKey="selesai" stroke="#FB896B" strokeWidth={2} />
        <Line type="monotone" dataKey="sedang berjalan" stroke="#6956E5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
