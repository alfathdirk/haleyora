"use client";

import FilterCard from "@/components/Cards/FilterCard";
import SearchCard from "@/components/Cards/SearchCard";
import Pagination from "@/components/Pagination/Pagination";
import CheckboxTable, { Column } from "@/components/Table/CheckboxTable";
import { formatDateTime } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export interface EmployeeData {
  category: string;
  date_created: string;
  duedate: string | null;
  id: string;
  message: string | null;
  phone: string | null;
  rating: string | null;
  sort: string | null;
  subcategory: string | null;
  ticket_number: string;
  user_complaint: string;
  user_created: string;
  history: {
    status: { status: string };
    duedate: string;
  }[];
}

export default function EmployeePage() {
  const navigate = useRouter();
  const [data, setData] = useState<EmployeeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const exampleData = [
    {
      column1: "Value 1A",
      column2: "Value 1B",
      column3: "Value 1C",
      column4: "Value 1D",
      column5: "Value 1E",
    },
  ];

  const columns: Column<EmployeeData>[] = [
    {
      name: "Name",
      cell: (row) => (
        <td width="15%">
          <div
            className="d-flex align-items-center pointer-hand"
            onClick={() => {
              navigate.push("/complaint/detail/" + row.id);
            }}
          >
            <div>
              <div className="">{row.user_complaint}</div>
              <div className="text-dark">{row.phone}</div>
            </div>
          </div>
        </td>
      ),
    },
    {
      name: "Complaint",
      cell: (row) => (
        <td width="15%">
          <div className="d-flex align-items-center">
            <div>
              <div className="">{row.category}</div>
              <div className="text-dark">{row.subcategory}</div>
            </div>
          </div>
        </td>
      ),
    },
    {
      name: "Message",
      selector: (row) => row.message ?? "-",
      width: "10%",
    },

    {
      name: "Created Date",
      selector: (row) => formatDateTime(row.date_created, false) ?? "-",
      width: "10%",
    },

    {
      name: "Complaint Number",
      selector: (row) => row.ticket_number,
      width: "10%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <td
          width={"10%"}
          onClick={() => {
            navigate.push("/complaint/detail/" + row.id);
          }}
          className="cursor-pointer "
        >
          <span className="text-[#05A5DE]">Detail Complaint</span>
        </td>
      ),
      width: "10%",
    },
  ];

  return (
    <div>
      <p className="text-2xl mb-4 font-semibold">Employee page</p>
      <div>
        <div className="flex justify-between items-center mb-6 ">
          <FilterCard
            label={"Filter"}
            src={"./assets/svg/filter-icon.svg"}
            options={[]}
            onSelect={() => {}}
          />
          <div className="d-flex">
            <div className="pr-6 mr-6 border-r-2 border-[#787486]">
              <SearchCard onSearch={(ev) => setSearchTerm(ev)} />
            </div>
            <Image
              src="./assets/svg/menu-blue.svg"
              width={36}
              height={36}
              className="mr-6"
              alt=""
            />
            <Image src="./assets/svg/menu.svg" width={24} height={24} alt="" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <CheckboxTable data={exampleData} columns={columns} />
      </div>
      <div>
        <Pagination meta={exampleData} />
      </div>
    </div>
  );
}
