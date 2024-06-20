"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import useCategoriesStore from "@/stores/useCategoriesStore";
import { debounce } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3 } from "lucide-react";
import { DeleteAction } from "@/components/tables/Activities/columns/delete-action";
import ActivitiesFormDialog from "@/components/forms/ActivitiesFormDialog";
import { ActivitiesTable } from "@/components/tables/Activities/table";
import { Activities, Status } from "@/types/activities";
import { Badge } from "@/components/ui/badge";
import { VariantComponent } from "@/types/next";

export default function MasterDataActivitiesPage() {
  const pageName = "Aktifitas";
  const fetch = useDirectusFetch();
  const { setCategories } = useCategoriesStore();

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
    let filters = searchValue ? { title: { _contains: searchValue } } : {};

    try {
      const { data: res } = await fetch.get("items/activities", {
        params: {
          fields: ["*"],
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          filter: JSON.stringify(filters),
          sort: "-id",
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data: res } = await fetch.get("items/sub_sector", {
          params: {
            fields: ["id, title"],
          },
        });

        res?.data?.forEach((item: Activities) => {
          item.name = item.title;
        });

        setCategories(res?.data ?? []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchCategories();
  }, []);

  const columnsWithAction: ColumnDef<Activities>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const statusColor: Record<Status, VariantComponent>  = {
          draft: "outline",
          published: "success",
          archived: "outline",
        };

        return (
          <div
            id={row.original?.id}
            className="flex items-center justify-between font-semibold"
          >
            <div>
              {row.original?.title}
              <Badge
                variant={statusColor[row.original?.status ?? 'draft']}
                className="ml-8 font-semibold uppercase"
              >
                {row.original?.status}
              </Badge>
            </div>
            <div>
              <ActivitiesFormDialog
                initialData={row?.original}
                triggerTitle={
                  <Edit3 className="w-4 h-auto text-gray-400 group-hover:text-[#00A9E3]" />
                }
                dialogTriggerProps={{
                  className: "p-2 h-fit group hover:bg-transparent",
                  variant: "ghost",
                }}
                onSubmitCallback={() => fetchData()}
              />
              <DeleteAction
                data={row.original}
                onConfirmCallback={() => fetchData()}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-1">
      <BreadCrumb
        items={[
          { title: "Master Data", link: "#" },
          { title: pageName, link: "/masterdata/activities" },
        ]}
      />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description={`Manajemen ${pageName}`} />

        <ActivitiesFormDialog onSubmitCallback={() => fetchData()} />
      </div>

      <ActivitiesTable
        data={data}
        customColumns={columnsWithAction}
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
