"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sector } from "@/types/sector";

export const cardColumns: ColumnDef<Sector>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="py-2 text-lg font-bold text-center">
        {row?.original?.title}
      </div>
    ),
  },
];
