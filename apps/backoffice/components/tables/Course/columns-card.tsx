"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Course } from "@/types/course";
import { Clock, Clock5, Users2Icon } from "lucide-react";
import { formatDurationFromMinutes } from "@/lib/helper";

export const cardColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="flex items-end justify-center bg-red-200 rounded-t-[20px]">
          <Avatar className="w-full h-48 rounded-none rounded-t-[20px]">
            <AvatarImage src={row.original?.imageUrl ?? ""} alt="@shadcn" />
            <AvatarFallback className="rounded-none">IMG</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "totalEmployeeCourse",
    cell: ({ row }) => (
      <div className="flex justify-between px-3 py-2 mb-2 text-xs text-[#878787] font-normal">
        <div className="flex items-center mr-1">
          <Users2Icon className="w-[14px] h-[14px] mr-1" />
          {row.original?.totalEmployeeCourse} Peminat
        </div>
        <div className="flex items-center">
          <Clock5 className="w-3 h-3 mr-1" />
          {row?.original?.duration ? formatDurationFromMinutes(row?.original?.duration) : "-"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "activities.title",
    header: "Kategori",
    cell: ({ row }) => (
      <div className="px-3 text-[10px] font-medium uppercase text-[#8E8D8D]">
        {row?.original?.activities?.title}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="px-3 pb-2 text-lg font-semibold leading-tight text-[#515151]">
        {row?.original?.title ?? "-"}
      </div>
    ),
  },
];
