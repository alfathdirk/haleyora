"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/utils/helper";
import { LessonTags } from "@/components/ui/lesson-tags";
import clsx from "clsx";

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border border-[#D0D5DD] shadow-none"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border border-[#D0D5DD] shadow-none"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-4">
            <span className="font-bold">{row.original?.full_name}</span>
            <span>{row.original?.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
    cell: ({ row }) => (
      <div className="px-2.5 py-1 bg-gray-200 rounded-full w-fit">
        {/* {row?.original?.id} */} #23454GH6J7YT6
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
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
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row?.original?.status === "active";
      return (
        <Badge variant={isActive ? "success" : "danger"}>
          <span
            className={clsx(
              "rounded-full w-2 h-2 bg-[#12B76A] mr-2",
              isActive ? "bg-[#12B76A]" : "bg-[#F15046]"
            )}
          />
          {capitalizeFirstLetter(row?.original?.status ?? "")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lesson",
    header: "Lesson",
    cell: ({ row }) => (
      <LessonTags tags={["Electrical", "Cable", "Installation"]} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
