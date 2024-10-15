"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "@/types/employee";

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
      <div className="px-2.5 py-1 bg-gray-200 dark:bg-gray-600 rounded-full w-fit">
        #{row?.original?.employee_id}
      </div>
    ),
  },
  {
    accessorKey: "employee_course",
    header: "Total Pembelajaran",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="">
          {row.original?.employee_course?.length ?? 0}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "employee_course.exam_score",
    header: "Rata - rata Ujian",
    cell: ({ row }) => {
      let totalQuiz = 0;
      let totalExamScore = 0;

      row.original?.employee_course?.map((course) => {
        totalQuiz += 1;
        totalExamScore += Number(course?.exam_score ?? 0);
      })

      const averageExamScore = totalQuiz > 0 ? totalExamScore / totalQuiz : 0;

      return (
        <div className="flex flex-col">
          <span className="">
            {Number(averageExamScore.toFixed(1)) || 0}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_course.tasks_score",
    header: "Rata - rata Tugas",
    cell: ({ row }) => {
      let totalTasks = 0;
      let totalTasksScore = 0;

      row.original?.employee_course?.map((course) => {
        totalTasks += 1;
        totalTasksScore += Number(course?.tasks_score ?? 0);
      })

      const averageTaskScore = totalTasks > 0 ? totalTasksScore / totalTasks : 0;

      return (
        <div className="flex flex-col">
          <span className="">
            {Number(averageTaskScore.toFixed(1)) || 0}
          </span>
        </div>
      );
    },
  },
];
