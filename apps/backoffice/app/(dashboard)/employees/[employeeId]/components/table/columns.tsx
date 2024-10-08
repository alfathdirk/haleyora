"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EmployeeCourse } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { format } from "date-fns";
import id from "date-fns/locale/id";

export const columns: ColumnDef<EmployeeCourse>[] = [
  {
    accessorKey: "course.title",
    header: "Materi",
    cell: ({ row }) => {
      return <div>{row?.original.course.title}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const isCompleted = row?.original?.completed;
      return (
        <Badge
          className="!font-semibold"
          variant={isCompleted ? "success" : "secondary"}
        >
          <span
            className={clsx(
              "rounded-full w-2 h-2 bg-[#12B76A] mr-2",
              isCompleted ? "bg-[#12B76A]" : "bg-gray-300",
            )}
          />
          {isCompleted ? "Selesai" : "Sedang Berjalan"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Nilai Minimum",
    cell: ({ row }) => {
      return <div>{row?.original?.course?.min_score ?? '-'}</div>;
    },
  },
  {
    accessorKey: "exam_score",
    header: "Nilai Ujian",
    cell: ({ row }) => {
      return <div>{row?.original.exam_score ?? '-'}</div>;
    },
  },
  {
    accessorKey: "tasks_score",
    header: "Nilai Tugas",
    cell: ({ row }) => {
      return <div>{row?.original.tasks_score ?? '-'}</div>;
    },
  },
  {
    accessorKey: "date_created",
    header: "Mulai Pembelajaran",
    cell: ({ row }) => {
      return <div>{format(new Date(row?.original.date_created), 'dd MMMM yyyy', { locale: id }) ?? '-'}</div>;
    },
  },
];
