"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Filter,
  LucideSearch,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import Image from "next/image";
import {
  Pagination,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [layout, setLayout] = useState("table");

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    onPaginationChange: (updater: any) => {
      const { pageIndex, pageSize } = updater(table.getState().pagination);
      setCurrentPage(pageIndex + 1);
      setPageSize(pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.length / pageSize),
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
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
            <div className="flex items-center w-full px-4 border-2 border-[#787486] rounded-xl gap-x-2">
              <LucideSearch className="w-6 h-6 text-[#959595]" />
              <Input
                className="!border-none shadow-none px-0"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex">
            <Image
              src="./assets/svg/menu-blue.svg"
              width={36}
              height={36}
              className={`mr-6 cursor-pointer ${
                layout === "table" ? "opacity-100" : "opacity-50"
              }`}
              alt=""
              onClick={() => setLayout("table")}
            />
            <Image
              src="./assets/svg/menu.svg"
              width={24}
              height={24}
              className={`cursor-pointer ${
                layout === "card" ? "opacity-100" : "opacity-50"
              }`}
              alt=""
              onClick={() => setLayout("card")}
            />
          </div>
        </div>
      </div>

      <ScrollArea className="rounded-md h-[calc(80vh-220px)]">
        {layout === "table" ? (
          <Table className="relative">
            <TableHeader className="bg-[#FAFBFB]">
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
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-2 py-3">
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
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="p-4 bg-white border rounded-md shadow-sm"
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="px-2 py-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(table.getFilteredRowModel().rows.length / pageSize)}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </>
  );
}
