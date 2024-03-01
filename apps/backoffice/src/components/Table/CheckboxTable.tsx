import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";

export interface Column<T> {
  id?: string | number;
  name: string;
  selector?: (row: T) => string;
  cell?: (row: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalRecords?: number;
  loading?: boolean;
  noDataComponent?: React.ReactNode;
  noDataMessage?: string;
  onSort?: (column: Column<T>) => void;
}

const CheckboxTable = <T,>({ data, columns }: DataGridProps<T>) => {
  if (data.length < 1) {
    return (
      <div className="flex flex-column items-center justify-center gap-4 mt-3">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-[#FFB822] text-4xl mr-2"
        />
        <h5>No Data Found</h5>
      </div>
    );
  }
  return (
    <Table responsive className="table-ellipsis">
      <thead>
        <tr>
          {columns.map((column, key) => (
            <th key={key}>
              <p className="text-[#42526D]">{column.name}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, key) => (
          <tr key={key + "_a"}>
            {columns.map((column, key) => (
              <React.Fragment key={key + "_b"}>
                {column.cell ? (
                  column.cell(row)
                ) : (
                  <>
                    {column.selector && (
                      <td className="text-overflow" width={column.width}>
                        {column.selector(row)}
                      </td>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default CheckboxTable;
