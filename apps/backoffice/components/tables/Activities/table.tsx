"use client";

import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { columns } from "./columns/columns";
import { cardColumns } from "./columns/columns-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface ActivitiesTableProps<TData, TValue> {
  defaultLayout?: string;
  onClickRow?: boolean;
  customColumns?: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  tableHeader?: boolean;
  // methods
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (val: number) => void;
  setCurrentPage: (val: number) => void;
  setPageSize: (val: number) => void;
}

export const ActivitiesTable = <TData, TValue>({
  data,
  currentPage,
  pageSize,
  totalItems,
  defaultLayout = "table",
  onClickRow = true,
  customColumns,
  handleInputChange,
  handlePageChange,
  setCurrentPage,
  setPageSize,
}: ActivitiesTableProps<TData, TValue>) => {
  const router = useRouter();

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
      columns={currentLayout === "card" ? cardColumns : (customColumns ?? columns)}
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
      cardContainerStyles="!grid-cols-5"
      cardStyles="py-3 px-2 rounded-xl shadow-xl shadow-[#F4F4F4] border border-[#F4F4F4] bg-[#F9FAFC] group hover:bg-[#F5F9FF] transition-all ease-in-out duration-500 cursor-pointer"
      tableRowStyles="!border-0 !mx-8 hover:bg-transparent"
      tableCellStyles={cn(
        "flex flex-col w-full px-3 py-3 mb-4 shadow-sm rounded-2xl !border hover:bg-gray-50 transition-all ease-in duration-100",
        onClickRow ? "cursor-pointer" : "cursor-default",
      )}
    />
  );
};
