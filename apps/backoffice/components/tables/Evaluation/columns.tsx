"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeCourse } from "@/types/quiz";

export const columns: ColumnDef<EmployeeCourse>[] = [
  {
    accessorKey: "title",
    header: "Materi Pembelajaran",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.title ?? "-"}
      </div>
    ),
    // enableSorting: true
  },
  {
    accessorKey: "pass_percentage",
    header: "Lulus (%)",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">
        {row.original?.pass_percentage ?? ""}%
      </div>
    ),
  },
  {
    accessorKey: "not_pass_percentage",
    header: "Tidak Lulus (%)",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 w-fit">
        {row.original?.not_pass_percentage ?? ""}%
      </div>
    ),
  },
];
