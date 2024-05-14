"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Category } from "@/types/category";

export const cardColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="flex items-end justify-center">
          <Avatar className="w-auto h-24">
            <AvatarImage src={row.original?.imageUrl ?? ""} alt="@shadcn" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="py-2 text-lg font-bold text-center">
        {row?.original?.name ?? '-'}
      </div>
    ),
  },
];
