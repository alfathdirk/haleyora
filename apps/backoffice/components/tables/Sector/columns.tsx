"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sector } from "@/types/sector";
import { ChevronRight } from "lucide-react";

export const columns: ColumnDef<Sector>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div id={row.original?.id} className="flex items-center justify-between font-semibold">
          {row.original?.title}
          <ChevronRight className="w-6 h-6 text-[#959595]" />
      </div>
    ),
  },
];
