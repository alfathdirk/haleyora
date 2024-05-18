"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import BreadCrumb from "@/components/breadcrumb";
import { SectorTable } from "@/components/tables/Sector/table";
import { Heading } from "@/components/ui/heading";
import { debounce } from "@/lib/utils";

export default function SectorPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const pageName = "Bidang";
  const fetch = useDirectusFetch();

  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = useCallback((nextValue: string) => {
    setSearchValue(nextValue);
    setCurrentPage(1);
  }, []);

  const debouncedSearchChange = useMemo(
    () => debounce(onInputChange, 500),
    [onInputChange],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    debouncedSearchChange(nextValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  async function fetchData() {
    let filters = { category_id: { _eq: params?.id } };

    if (searchValue) {
      Object.assign(filters, {
        title: {
          _contains: searchValue,
        },
      });
    }

    try {
      const { data: res } = await fetch.get("items/sector", {
        params: {
          fields: ["*"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: JSON.stringify(filters),
          meta: "total_count,filter_count",
        },
      });

      setTotalItems(res?.meta?.filter_count);
      setData(res?.data ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchValue]);

  return (
    <div className="flex-1">
      <BreadCrumb
        items={[
          { title: "Monitoring", link: "/monitoring" },
          { title: pageName, link: "/monitoring/sector" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description={`Manajemen ${pageName}`} />
      </div>

      <SectorTable
        data={data}
        onClickRow={false}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        handleInputChange={handleInputChange}
        handlePageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}
