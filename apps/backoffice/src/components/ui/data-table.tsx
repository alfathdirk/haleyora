"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Filter, LucideSearch } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { ClassValue, clsx } from "clsx";
import { PauseHorizontalIcon } from "../SVGs/PauseHorizontalIcon";
import { DotsIcon } from "../SVGs/DotsIcon";

interface DataTableProps<TData, TValue> {
  layout?: "table" | "card";
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  tableHeader?: boolean;
  // methods
  onClickRow?: (val: string | number) => void;
  onPageChange: (val: number) => void;
  setCurrentPage: (val: number) => void;
  setPageSize: (val: number) => void;
  onLayoutChange?: (val: string) => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  searchKey,
  currentPage,
  pageSize,
  totalItems,
  layout = "table",
  tableHeader = true,
  onClickRow,
  handleSearchChange,
  onPageChange,
  setCurrentPage,
  setPageSize,
  onLayoutChange,
  tableRowContainerStyles,
  tableRowStyles,
  tableCellStyles,
  cardContainerStyles,
  cardStyles,
}: DataTableProps<TData, TValue>) {
  const [currentLayout, setLayout] = useState(layout);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      },
    },
    onPaginationChange: (updater: any) => {
      const { pageIndex, pageSize } = updater(table.getState().pagination);
      onPageChange(pageIndex + 1);
      setCurrentPage(pageIndex + 1);
      setPageSize(pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pageSize),
  });

  return (
    <>
      <div className="flex items-center justify-between !mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="text-[#787486] border-[0.1rem] rounded-xl border-[#787486]"
          >
            <Button variant="outline" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => alert("Option 1 selected")}>
              Option 1
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Option 2 selected")}>
              Option 2
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Option 3 selected")}>
              Option 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="d-flex gap-x-4">
          <div className="pr-4 border-r border-[#787486]">
            <div className="flex items-center w-full px-4 border-2 border-[#787486] rounded-xl gap-x-2 focus-within:!border-[#00A9E3]">
              <LucideSearch className="w-6 h-6 text-[#959595]" />
              <Input
                className="!border-none shadow-none px-0"
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
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
      </div>

      <ScrollArea className="rounded-md h-[calc(80vh-220px)]">
        {currentLayout === "table" ? (
          <Table className="relative">
            {tableHeader && (
              <TableHeader className="bg-[#FAFBFB] sticky top-0 left-0 z-30">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="px-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            )}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(tableRowStyles)}
                    onClick={() => {
                      console.log("onClickRow", row.original?.id);
                      if (onClickRow) {
                        onClickRow(row.original?.id);
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn("px-2 py-3", tableCellStyles)}
                      >
                        <div className="">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
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
        ) : table.getRowModel().rows.length ? (
          <div
            className={cn(
              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
              cardContainerStyles
            )}
          >
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={cn(
                  "p-4 bg-white border rounded-md shadow-sm",
                  cardStyles
                )}
                onClick={() => {
                  console.log("onClickRow", row.original?.id);
                  if (onClickRow) {
                    onClickRow(row.original?.id);
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

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </>
  );
}
