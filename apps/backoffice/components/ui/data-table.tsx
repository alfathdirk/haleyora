"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
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
  canChangeLayout?: boolean;
  // methods
  headerActions?: () => React.ReactNode;
  onClickRow?: (data: TData) => void;
  onPageChange: (val: number) => void;
  onSortChange?: (sorting: SortingState) => void;
  onLayoutChange?: (val: string) => void;
  setCurrentPage: (val: number) => void;
  setPageSize: (val: number) => void;
  // Styling
  tableRowContainerStyles?: ClassValue;
  tableRowStyles?: ClassValue;
  tableCellStyles?: ClassValue;
  cardContainerStyles?: ClassValue;
  cardStyles?: ClassValue;
  scrollAreaStyles?: ClassValue;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  pageSize,
  totalItems,
  layout = "table",
  tableHeader = true,
  canChangeLayout = true,
  onClickRow,
  onPageChange,
  setCurrentPage,
  setPageSize,
  headerActions,
  onLayoutChange,
  onSortChange,
  tableRowContainerStyles,
  tableRowStyles,
  tableCellStyles,
  cardContainerStyles,
  cardStyles,
  scrollAreaStyles,
}: DataTableProps<TData, TValue>) {
  const [currentLayout, setLayout] = useState(layout);
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pageSize),
    onSortingChange: (updater) => {
      const newSortingState =
        typeof updater === "function" ? updater(sorting) : updater;
      if (onSortChange) {
        onSortChange(newSortingState);
      } else {
        setSorting(newSortingState);
      }
    },
    manualSorting: !!onSortChange,
  });

  const handleSortClick = (columnId: string) => {
    setSorting((prevSorting) => {
      const existingSort = prevSorting.find((sort) => sort.id === columnId);
      let updatedSorting: SortingState;

      if (!existingSort) {
        // First click: set to descending
        updatedSorting = [...prevSorting, { id: columnId, desc: true }];
      } else if (existingSort.desc) {
        // Second click: set to ascending
        updatedSorting = prevSorting.map((sort) =>
          sort.id === columnId ? { ...sort, desc: false } : sort
        );
      } else {
        // Third click: remove sorting
        updatedSorting = prevSorting.filter((sort) => sort.id !== columnId);
      }

      if (onSortChange) {
        onSortChange(updatedSorting);
      }
      return updatedSorting;
    });
  };

  const renderPagination = () => (
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(totalItems / pageSize)}
      onPageChange={onPageChange}
    />
  );

  return (
    <>
      <div className="flex items-center justify-between">
        {headerActions ? headerActions() : <div></div>}

        {canChangeLayout ? (
          <div className="flex gap-x-4">
            <div className="flex items-center ml-4 gap-x-2">
              <div
                className={clsx(
                  "h-fit p-2 text-[#787486] rounded-sm cursor-pointer flex items-center",
                  {
                    "bg-[#00A9E3] !text-white": currentLayout === "table",
                  }
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
                  }
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
        ) : (
          <div></div>
        )}
      </div>

      <ScrollArea className={clsx('rounded-md h-[calc(85vh-220px)]', scrollAreaStyles ?? '')}>
        {currentLayout === "table" ? (
          <Table className="relative">
            {tableHeader && (
              <TableHeader className="bg-[#FAFBFB] dark:bg-gray-600 sticky top-0 left-0 z-30">
                {tableInstance.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const enableSorting = header.column.columnDef.enableSorting;
                      const isSorted = sorting.find((sort) => sort.id === header.id);
                      const isDesc = isSorted?.desc;
                      const sortIcon = isSorted
                        ? isDesc
                          ? " ↓" // Descending icon
                          : " ↑" // Ascending icon
                        : " ↓"; // Default icon with low opacity

                      return (
                        <TableHead
                          key={header.id}
                          className={cn("px-2 cursor-pointer", {
                            "text-blue-500": enableSorting && isSorted,
                          })}
                          onClick={() =>
                            enableSorting &&
                            handleSortClick(header.id)
                          }
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {enableSorting && (
                            <span
                              className={cn("ml-1", {
                                "opacity-50": !isSorted,
                              })}
                            >
                              {sortIcon}
                            </span>
                          )}
                        </TableHead>
                      );
                    })}
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
                    className={cn("", tableRowStyles)}
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
                          cell.getContext()
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
              "grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3",
              cardContainerStyles
            )}
          >
            {tableInstance.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={cn("p-4 border rounded-md shadow-sm", cardStyles)}
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
