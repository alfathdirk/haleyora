"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { ClassValue, clsx } from "clsx";
import { PauseHorizontalIcon } from "../icons/PauseHorizontalIcon";
import { DotsIcon } from "../icons/DotsIcon";

interface DataTableProps<TData, TValue> {
  layout?: "table" | "card";
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  tableHeader?: boolean;
  // methods
  onClickRow?: (data: TData) => void;
  onPageChange: (val: number) => void;
  setCurrentPage: (val: number) => void;
  setPageSize: (val: number) => void;
  onLayoutChange?: (val: string) => void;
  headerActions?: () => React.ReactNode;
  // Styling
  tableRowContainerStyles?: ClassValue;
  tableRowStyles?: ClassValue;
  tableCellStyles?: ClassValue;
  cardContainerStyles?: ClassValue;
  cardStyles?: ClassValue;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  pageSize,
  totalItems,
  layout = "table",
  tableHeader = true,
  onClickRow,
  onPageChange,
  setCurrentPage,
  setPageSize,
  headerActions,
  onLayoutChange,
  tableRowContainerStyles,
  tableRowStyles,
  tableCellStyles,
  cardContainerStyles,
  cardStyles,
}: DataTableProps<TData, TValue>) {
  const [currentLayout, setLayout] = useState(layout);

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pageSize),
  });

  const renderPagination = () => (
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(totalItems / pageSize)}
      onPageChange={onPageChange}
      // showFirstLast
    />
  );

  return (
    <>
      <div className="flex items-center justify-between">
        {headerActions ? headerActions() : <div></div>}

        <div className="flex gap-x-4">
          <div className="flex items-center gap-x-2">
            <div
              className={clsx(
                "h-fit p-2 text-[#787486] rounded-sm cursor-pointer flex items-center",
                {
                  "bg-[#00A9E3] !text-white": currentLayout === "table",
                },
              )}
              onClick={() => {
                if (onLayoutChange) {
                  onLayoutChange("table");
                }
                setLayout("table");
              }}
            >
              <PauseHorizontalIcon className="w-full h-5 cursor-pointer" />
            </div>
            <div
              className={clsx(
                "h-fit p-2 text-[#787486] rounded-sm cursor-pointer flex items-center",
                {
                  "bg-[#00A9E3] !text-white": currentLayout === "card",
                },
              )}
              onClick={() => {
                if (onLayoutChange) {
                  onLayoutChange("card");
                }
                setLayout("card");
              }}
            >
              <DotsIcon className="w-full h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="rounded-md h-[calc(85vh-220px)] pt-4">
        {currentLayout === "table" ? (
          <Table className="relative">
            {tableHeader && (
              <TableHeader className="bg-[#FAFBFB] sticky top-0 left-0 z-30">
                {tableInstance.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="px-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            )}
            <TableBody>
              {tableInstance.getRowModel().rows.length ? (
                tableInstance.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    tabIndex={0}
                    aria-label={`Row ${row.id}`}
                    className={cn(tableRowStyles)}
                    onClick={() => onClickRow && onClickRow(row.original)}
                    onKeyPress={(event) =>
                      event.key === "Enter" &&
                      onClickRow &&
                      onClickRow(row.original)
                    }
                    role="button"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn("px-2 py-3", tableCellStyles)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : tableInstance.getRowModel().rows.length ? (
          <div
            className={cn(
              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
              cardContainerStyles,
            )}
          >
            {tableInstance.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={cn(
                  "p-4 border rounded-md shadow-sm",
                  cardStyles,
                )}
                onClick={() => {
                  if (onClickRow) {
                    onClickRow(row.original);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 text-center">No results.</div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {renderPagination()}
    </>
  );
}
