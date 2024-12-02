"use client";

import React, { useEffect, useState, useCallback } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AuthContext } from "@/provider/Auth";
import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { EvaluationCourseTable } from "@/components/tables/EvaluationCourse/table";
import { useParams, useSearchParams } from "next/navigation";
import { EvaluationCourseOverview } from "@/components/EvaluationCourseOverview";
import { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";

export default function Page() {
  const { members, currentUser } = useContext(AuthContext);
  const fetch = useDirectusFetch();
  const { courseId } = useParams();
  const searchParams = useSearchParams();

  const [data, setData] = useState<any[]>([]);
  const [totalCourseCompleted, setTotalCourseCompleted] = useState<number>(0);
  const [totalAvgQuizScore, setTotalAvgQuizScore] = useState<number>(0);
  const [totalAvgTaskScore, setTotalAvgTaskScore] = useState<number>(0);
  const [filters, setFilters] = useState<{
    unit: {
      id: string;
      title: string;
    } | null;
    search: string;
    dateRange: DateRange | {};
  }>({
    unit: null,
    search: "",
    dateRange: {
      from: startOfMonth(new Date()),
      to: new Date(),
    },
  });

  const fetchData = useCallback(async () => {
    try {
      //
    } catch (error) {
      console.error("Error fetching average scores:", error);
    }
  }, [filters, currentUser, members, fetch]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (newFilters: {
    unit: {
      id: string;
      title: string;
    } | null;
    search: string;
    dateRange: DateRange | {};
  }) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex-1 space-y-2">
        <BreadCrumb
          items={[
            { title: "Evaluasi", link: "/evaluation" },
            { title: searchParams.get("name") ?? "", link: "#" },
          ]}
        />

        <div className="flex items-start justify-between !mb-10">
          <Heading title={searchParams.get("name") ?? ""} description="" />
        </div>

        <div className="grid gap-4 !mb-10 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"></CardHeader>
            <CardContent className="w-full h-72">
              <EvaluationCourseOverview
                courseId={courseId}
                parentFilters={filters}
              />
            </CardContent>
          </Card>
        </div>

        <EvaluationCourseTable
          members={members}
          currentUser={currentUser}
          onFilterChange={handleFilterChange}
          onDataChange={(items: React.SetStateAction<any[]>) => setData(items)}
          courseId={courseId}
        />
      </div>
    </>
  );
}
