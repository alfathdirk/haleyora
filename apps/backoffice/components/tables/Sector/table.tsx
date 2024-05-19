"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns/columns";
import { cardColumns } from "./columns/columns-card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface SectorTableProps<TData, TValue> {
  defaultLayout?: string;
  customColumns?: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  tableHeader?: boolean;
  // methods
  onClickRow?: (data: TData) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (val: number) => void;
  setCurrentPage: (val: number) => void;
  setPageSize: (val: number) => void;
}

export const SectorTable = <TData, TValue>({
  data,
  currentPage,
  pageSize,
  totalItems,
  defaultLayout = "table",
  customColumns,
  onClickRow,
  handleInputChange,
  handlePageChange,
  setCurrentPage,
  setPageSize,
}: SectorTableProps<TData, TValue>) => {
  const [currentLayout, setCurrentLayout] = useState(defaultLayout);

  const headerActions = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="pr-4">
          <div className="flex items-center w-full px-4 border-2 border-[#787486] rounded-xl gap-x-2 focus-within:!border-[#00A9E3]">
            <LucideSearch className="w-6 h-6 text-[#959595]" />
            <Input
              className="!border-none shadow-none px-0 focus-visible:!ring-0"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataTable
      columns={
        currentLayout === "card" ? cardColumns : customColumns ?? columns
      }
      onLayoutChange={(val: string) => setCurrentLayout(val)}
      tableHeader={false}
      data={data}
      headerActions={headerActions}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      cardContainerStyles="!grid-cols-1 md:!grid-cols-3 lg:!grid-cols-4 xl:!grid-cols-5 gap-8"
      cardStyles="py-3 px-2 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
      tableRowStyles="!border-0 !mx-8 hover:bg-transparent"
      tableCellStyles={cn(
        "flex flex-col w-full px-3 py-3 mb-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-2xl !border hover:bg-gray-50 transition-all ease-in duration-100",
        onClickRow ? "cursor-pointer" : "cursor-default",
      )}
      onClickRow={onClickRow}
    />
  );
};
