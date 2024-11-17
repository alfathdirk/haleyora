"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeCourse } from "@/types/quiz";

export const columns: ColumnDef<EmployeeCourse>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.name ?? "-"}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.unit ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "totalEvaluation",
    header: "Nilai",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">
        {row.original?.totalEvaluation ?? ""}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "passed",
    header: "Lulus",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">{row.original?.passed ?? ""}</div>
    ),
    enableSorting: true,
  },
];
