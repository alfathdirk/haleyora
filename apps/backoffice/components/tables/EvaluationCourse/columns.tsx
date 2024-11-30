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
  // {
  //   accessorKey: "minScore",
  //   header: "Minimum",
  //   cell: ({ row }) => (
  //     <div className="px-2.5 py-1 w-fit">
  //       {row.original?.minScore ?? ""}
  //     </div>
  //   ),
  //   enableSorting: true,
  // },
  // {
  //   accessorKey: "examScore",
  //   header: "Ujian",
  //   cell: ({ row }) => (
  //     <div className="px-2.5 py-1 w-fit">
  //       {row.original?.examScore ?? ""}
  //     </div>
  //   ),
  //   enableSorting: true,
  // },
  // {
  //   accessorKey: "tasksScore",
  //   header: "Tugas",
  //   cell: ({ row }) => (
  //     <div className="px-2.5 py-1 w-fit">
  //       {row.original?.tasksScore ?? ""}
  //     </div>
  //   ),
  //   enableSorting: true,
  // },
  {
    accessorKey: "totalEvaluation",
    header: "Nilai Keseluruhan",
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
