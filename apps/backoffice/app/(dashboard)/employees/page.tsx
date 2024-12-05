"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/tables/Employee/table";
import { Heading } from "@/components/ui/heading";
import { AuthContext } from "@/provider/Auth";
import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { debounce } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useDirectusContext } from "@/hooks/useDirectusContext";

export default function Page() {
  const { accessToken } = useDirectusContext();
  const { members, currentUser } = useContext(AuthContext);
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState<boolean>(true);
  const [exporting, setExporting] = useState(false);
  const [totalCourseCompleted, setTotalCourseCompleted] = useState<number>(0);
  const [totalAvgQuizScore, setTotalAvgQuizScore] = useState<number>(0);
  const [totalAvgTaskScore, setTotalAvgTaskScore] = useState<number>(0);
  const [filters, setFilters] = useState<{
    dateRange: DateRange;
    id_region: {
      id: string | null;
      title: string | null;
    };
    search: string;
  }>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    id_region: {
      id: null,
      title: null,
    },
    search: "",
  });

  const fetchAverageScores = useCallback(
    async (appliedFilters: typeof filters) => {
      try {
        setFetching(true);
        const filters: any = {
          completed: { _eq: 1 },
          employee: {
            full_name: {},
            unit_pln: {},
          },
        };

        if (appliedFilters.search) {
          filters["employee"].full_name = { _contains: appliedFilters.search };
        }

        if (appliedFilters.id_region?.id) {
          filters["employee"].id_region = {
            _eq: appliedFilters.id_region?.id.toString(),
          };
        }

        if (appliedFilters?.dateRange?.from && appliedFilters?.dateRange?.to) {
          filters["date_created"] = {
            _between: [
              appliedFilters?.dateRange?.from.toISOString(),
              appliedFilters?.dateRange?.to.toISOString(),
            ],
          };
        }

        if (
          !["Administrator", "Admin Pusat"].includes(
            currentUser?.role?.name ?? "",
          ) &&
          members
        ) {
          filters["employee"] = { _in: members };
        }

        const { data: res } = await fetch.get("items/employee_course", {
          params: {
            filter: filters,
            aggregate: {
              count: "*",
              avg: ["exam_score", "tasks_score"],
            },
          },
        });

        if (!!res?.data[0]) {
          const data = res?.data[0];
          setTotalCourseCompleted(data?.count);
          setTotalAvgQuizScore(Math.round(data?.avg?.exam_score) || 0);
          setTotalAvgTaskScore(Math.round(data?.avg?.tasks_score) || 0);
        }
      } catch (error) {
        console.error("Error fetching average scores:", error);
      } finally {
        setFetching(false);
      }
    },
    [currentUser, members, fetch],
  );

  const debouncedFetchRef = useRef(debounce(fetchAverageScores, 300));

  useEffect(() => {
    debouncedFetchRef.current(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    debouncedFetchRef.current(newFilters);
  };

  const handleExport = async () => {
    setExporting(true);
    const appliedFilters = filters;

    const apiFilter: any = {
      completed: { _eq: 1 },
    };

    if (appliedFilters.search) {
      apiFilter.employee = { full_name: { _contains: appliedFilters.search } };
    }

    if (appliedFilters.id_region?.id) {
      apiFilter.employee = Object.assign(apiFilter?.employee ?? {}, {
        id_region: { _eq: appliedFilters.id_region?.id.toString() },
      });
    }

    if (appliedFilters?.dateRange?.from && appliedFilters?.dateRange?.to) {
      apiFilter.date_created = {
        _between: [
          appliedFilters?.dateRange?.from.toISOString(),
          appliedFilters?.dateRange?.to.toISOString(),
        ],
      };
    }

    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
    const title = `report-monitoring-${timestamp}`;

    try {
      await fetch.post("utils/export/employee_course", {
        body: {
          format: "csv",
          file: {
            title,
          },
          query: {
            fields: [
              "employee.id_region.name",
              "employee.unit_pln",
              "employee.employee_id",
              "employee.full_name",
              "course.title",
              "exam_score_final",
              "tasks_score_final",
              "score_final",
              "is_passed",
              // "exam_score",
              // "tasks_score",
            ],
            filter: apiFilter,
            limit: 10000,
          },
        },
      });

      const file = await pollForFile(title);

      const downloadUrl = getDownloadUrl(file.id);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "";
      link.click();
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setExporting(false);
    }
  };

  const SummaryCard = React.memo(
    ({
      title,
      value,
      fetching,
    }: {
      title: string;
      value: number;
      fetching: boolean;
    }) => (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {fetching ? <Loader /> : value}
          </div>
        </CardContent>
      </Card>
    ),
  );

  const pollForFile = async (
    title: string,
    maxAttempts: number = 10,
    delayMs: number = 3000,
  ) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const { data: res } = await fetch.get("files", {
          params: {
            fields: ["id", "title"],
            filter: {
              title: {
                _eq: title,
              },
            },
          },
        });

        if (res?.data.length > 0) {
          // File is ready
          return res?.data[0]; // Return the file metadata
        }
      } catch (error) {
        console.error(
          `Attempt ${attempt}: Error checking file readiness`,
          error,
        );
      }

      // Wait before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    throw new Error("File not ready after maximum attempts");
  };

  const getDownloadUrl = (fileId: string) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${fileId}?download=&access_token=${accessToken}`;
  };

  return (
    <div className="flex-1 space-y-2">
      <BreadCrumb items={[{ title: "Karyawan", link: "/employees" }]} />

      <div className="flex items-end justify-between !mb-10">
        <Heading title={`Karyawan`} description="Manajemen Karyawan" />
        <div>
          <Button className="text-xs md:text-sm" onClick={handleExport}>
            <DownloadCloud className="w-4 h-4 mr-2" />{" "}
            {exporting ? "Mohon Tunggu.." : "Unduh Data"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 !mb-10 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Pembelajaran Selesai"
          value={totalCourseCompleted}
          fetching={fetching}
        />
        <SummaryCard
          title="Nilai Rata - rata Ujian"
          value={totalAvgQuizScore}
          fetching={fetching}
        />
        <SummaryCard
          title="Nilai Rata - rata Tugas"
          value={totalAvgTaskScore}
          fetching={fetching}
        />
      </div>

      <EmployeesTable
        members={members}
        currentUser={currentUser}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
