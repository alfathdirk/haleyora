"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubSector } from "@/types/subSector";

export const cardColumns: ColumnDef<SubSector>[] = [
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
