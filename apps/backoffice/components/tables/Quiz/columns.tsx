"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { Course } from "@/types/course";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div
        id={row.original?.id}
        className="flex items-center justify-between font-semibold"
      >
        {row.original?.title ?? "-"}
        <ChevronRight className="w-6 h-6 text-[#959595]" />
      </div>
    ),
  },
];
