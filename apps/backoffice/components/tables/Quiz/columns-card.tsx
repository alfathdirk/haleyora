"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Circle, Clock5, Edit2Icon } from "lucide-react";
import { formatDurationFromMinutes } from "@/lib/helper";
import { Quiz } from "@/types/quiz";
import { format, parseISO } from "date-fns";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const cardColumns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "title",
    cell: ({ row }) => (
      <div className="text-xl font-semibold">{row?.original?.title ?? "-"}</div>
    ),
  },
  {
    accessorKey: "totalEmployeeCourse",
    cell: ({ row }) => {
      const date = parseISO(row.original?.date_created);
      const formattedDate = format(date, "dd / MM / yyyy");
      const formattedTime = format(date, "HH : mm");

      return (
        <div className="flex mb-4">
          <div className="flex items-center justify-center mr-4">
            <CalendarDays className="w-4 h-4 mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock5 className="w-4 h-4 mr-1" />
            {formattedTime}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    cell: ({ row }) => (
      <div className="flex justify-between border border-[#0000004D] w-9/12 rounded-xl mb-2">
        <div className="flex items-center bg-[#FCEE00] text-black rounded-xl w-full px-3 py-2 font-medium text-lg">
          Durasi
        </div>
        <div className="flex items-center w-7/12 px-3 py-2">
          {row?.original?.duration
            ? formatDurationFromMinutes(row?.original?.duration)
            : "-"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "quiz_question",
    cell: ({ row }) => (
      <div className="flex justify-between border border-[#0000004D] w-9/12 rounded-xl mb-2">
        <div className="flex items-center bg-[#FCEE00] text-black rounded-xl w-full px-3 py-2 font-medium text-lg">
          Jumlah Pertanyaan
        </div>
        <div className="flex items-center w-7/12 px-3 py-2">
          {row?.original?.quiz_question?.length ?? 0}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "score_per_question",
    cell: ({ row }) => (
      <div className="flex justify-between border border-[#0000004D] w-9/12 rounded-xl mb-2">
        <div className="flex items-center bg-[#FCEE00] text-black rounded-xl w-full px-3 py-2 font-medium text-lg">
          Nilai per Pertanyaan
        </div>
        <div className="flex items-center w-7/12 px-3 py-2">
          {row?.original?.score_per_question ?? 0}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="flex flex-col justify-between border border-[#0000004D] w-9/12 rounded-xl mb-2">
        <div className="flex items-center bg-[#FCEE00] text-black rounded-xl w-full px-3 py-2 font-medium text-lg">
          Deskripsi
        </div>
        <div className="flex items-center w-7/12 px-3 py-2">
          {row?.original?.description ?? "-"}
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: "score_per_question",
  //   cell: ({ row }) => (
  //     <div className="flex justify-between border border-[#0000004D] w-9/12 rounded-xl mb-2">
  //       <div className="flex items-center bg-[#FCEE00] text-black rounded-xl w-full px-3 py-2 font-medium text-lg">
  //         Bank Pertanyaan
  //       </div>
  //       <div className="flex items-center w-7/12 px-3 py-2">
  //         {row?.original?.score_per_question ?? 0}
  //       </div>
  //     </div>
  //   ),
  // },
  {
    accessorKey: "randomize",
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.original?.randomize ? (
          <CheckCircledIcon className="w-5 h-5 mr-2" />
        ) : (
          <Circle className="w-5 h-5 mr-2" />
        )}
        Pertanyaan di acak
      </div>
    ),
  },
  {
    accessorKey: "action",
    cell: ({ row }) => (
      <div className="flex items-center justify-end font-semibold text-white">
        <Link
          href={`/quiz/${row?.original?.id}`}
          className="flex items-center justify-center px-8 py-1 bg-black rounded-xl"
        >
          <Edit2Icon className="w-4 h-4 mr-2" />
          Edit
        </Link>
      </div>
    ),
  },
];
