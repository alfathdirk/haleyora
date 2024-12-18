"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useSearchParams } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/helper";

export default function Page() {
  const { employeeId } : { employeeId: string } = useParams();
  const searchParams = useSearchParams();
  const fetch = useDirectusFetch();

  const [detail, setDetail] = useState<Employee>();
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalCourseCompleted, setTotalCourseCompleted] = useState<number>(0);
  const [totalAvgQuizScore, setTotalAvgQuizScore] = useState<number>(0);
  const [totalAvgTaskScore, setTotalAvgTaskScore] = useState<number>(0);

  async function fetchTotalAndCompletedEmployeeCourses(employeeId: any) {
    try {
      // Fetch total employee courses
      const { data: totalRes } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            employee: { _eq: employeeId },
          }),
          aggregate: JSON.stringify({
            count: "*",
          }),
        },
      });

      // Fetch completed employee courses
      const { data: completedRes } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            employee: { _eq: employeeId },
            completed: { _eq: true },
          }),
          aggregate: JSON.stringify({
            count: "*",
          }),
        },
      });

      const totalEmployeeCourses = totalRes?.data?.[0]?.count;
      const completedEmployeeCourses = completedRes?.data?.[0]?.count;

      setTotalCourse(totalEmployeeCourses);
      setTotalCourseCompleted(completedEmployeeCourses);
    } catch (error) {
      console.error("Error fetching employee courses:", error);
    }
  }

  async function fetchAverageScores(employeeId: any) {
    try {
      const { data: res } = await fetch.get("items/employee_course", {
        params: {
          filter: JSON.stringify({
            employee: { _eq: employeeId },
          }),
          aggregate: JSON.stringify({
            avg: ["exam_score", "tasks_score"],
          }),
        },
      });

      const averageExamScore = res?.data?.[0]?.avg?.exam_score;
      const averageTaskScore = res?.data?.[0]?.avg?.task_score;
      setTotalAvgQuizScore(averageExamScore ?? 0);
      setTotalAvgTaskScore(averageTaskScore ?? 0);
    } catch (error) {
      console.error("Error fetching average scores:", error);
    }
  }

  async function fetchDetailData(employeeId: any) {
    try {
      const { data: res } = await fetch.get("items/employee", {
        params: {
          fields: ["*"],
          filter: JSON.stringify({
            id: { _eq: employeeId },
          }),
          meta: "total_count,filter_count",
        },
      });

      setDetail(res?.data[0] ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  }

  useEffect(() => {
    fetchDetailData(employeeId);
    fetchAverageScores(employeeId);
    fetchTotalAndCompletedEmployeeCourses(employeeId);
  }, [employeeId]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb
          items={[
            { title: "Karyawan", link: "/employees" },
            { title: "Ringkasan", link: "#" },
          ]}
        />

        <div className="flex items-start justify-between">
          <Heading
            title={searchParams.get("name") ?? ""}
            description={searchParams.get("title") ?? ""}
          />
          <Badge variant={detail?.status === "active" ? "success" : "danger"}>
            <span
              className={clsx(
                "rounded-full w-2 h-2 bg-[#12B76A] mr-2",
                detail?.status === "active" ? "bg-[#12B76A]" : "bg-[#F15046]",
              )}
            />
            {capitalizeFirstLetter(detail?.status ?? "")}
          </Badge>
        </div>

        <div className="flex items-start gap-x-4 !mb-10">
          <div className="px-2.5 py-1 bg-gray-200 rounded-full w-fit">
            #{detail?.employee_id}
          </div>
          <span className="font-semibold">{detail?.role ?? "-"}</span>
        </div>

        <div className="grid gap-4 !mb-10 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Pembelajaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourse}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Pembelajaran Selesai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourseCompleted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Nilai Rata - rata Ujian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAvgQuizScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Nilai Rata - rata Tugas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAvgTaskScore}</div>
            </CardContent>
          </Card>
        </div>
        <h1 className="text-2xl font-normal">Riwayat Pembelajaran</h1>
        <Separator className="my-8" />
        {/* <EmployeeCourseTable employeeId={employeeId} /> */}
      </div>
    </ScrollArea>
  );
}
