"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types/task";
import { ChevronRight } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div id={row.original?.id} className="flex items-center justify-between font-semibold">
          {row.original?.course?.title ?? '-'}
          <ChevronRight className="w-6 h-6 text-[#959595]" />
      </div>
    ),
  },
];
