"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/helper";
import { LessonTags } from "@/components/ui/lesson-tags";
import clsx from "clsx";

export const cardColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => {
      const isActive = row?.original?.status === "active";
      return (
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-auto">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => {
      const isActive = row?.original?.status === "active";
      return (
        <div className="flex justify-between min-h-20">
          <div className="flex flex-col max-w-40">
            <span className="font-bold">{row.original?.full_name}</span>
            <span>{row.original?.email}</span>
          </div>
          <Badge variant={isActive ? "success" : "danger"} className="h-fit ">
            <span
              className={clsx(
                "rounded-full w-2 h-2 bg-[#12B76A] mr-2",
                isActive ? "bg-[#12B76A]" : "bg-[#F15046]",
              )}
            />
            {capitalizeFirstLetter(row?.original?.status ?? "")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex justify-between min-h-20">
        <div className="flex flex-col">
          <span className="">
            {/* {row.original?.full_name}  */}
            Engineer
          </span>
          <span className="font-thin">
            {/* {row.original?.email} */}
            Full time
          </span>
        </div>
        <div className="px-2.5 py-1 ml-8 bg-gray-200 rounded-full w-fit h-fit">
          #{row?.original?.employee_id}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "lesson",
    header: "Lesson",
    cell: ({ row }) => (
      <LessonTags tags={["Electrical", "Cable", "Installation"]} />
    ),
  },
];
