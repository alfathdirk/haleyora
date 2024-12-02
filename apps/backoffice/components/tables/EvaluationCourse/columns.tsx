"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeCourse } from "@/types/quiz";

export const columns: ColumnDef<EmployeeCourse>[] = [
  {
    accessorKey: "employee.full_name",
    header: "Nama",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.employee?.full_name ?? "-"}
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
        {row.original?.employee?.id_region?.name ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "score_final",
    header: "Nilai Keseluruhan",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">
        {row.original?.score_final ?? ""}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "is_passed",
    header: "Lulus",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">{row.original?.is_passed ? "Ya" : "Tidak"}</div>
    ),
    enableSorting: true,
  },
];
