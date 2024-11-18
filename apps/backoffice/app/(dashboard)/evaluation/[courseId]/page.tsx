"use client";

import React, { useEffect, useState, useCallback } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { AuthContext } from "@/provider/Auth";
import { useContext } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { EvaluationCourseTable } from "@/components/tables/EvaluationCourse/table";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const { members, currentUser } = useContext(AuthContext);
  const fetch = useDirectusFetch();
  const { courseId } = useParams();
  const searchParams = useSearchParams();

  const [totalCourseCompleted, setTotalCourseCompleted] = useState<number>(0);
  const [totalAvgQuizScore, setTotalAvgQuizScore] = useState<number>(0);
  const [totalAvgTaskScore, setTotalAvgTaskScore] = useState<number>(0);
  const [filters, setFilters] = useState<{
    unit_pln: string | null;
    search: string;
  }>({
    unit_pln: null,
    search: "",
  });

  const fetchAverageScores = useCallback(async () => {
    try {
      const filterParams: any = {};

      if (filters.search) {
        filterParams["full_name"] = { _contains: filters.search };
      }
      if (filters.unit_pln) {
        filterParams["unit_pln"] = { _eq: filters.unit_pln };
      }
      if (!["Administrator", "Admin Pusat"].includes(currentUser?.role?.name ?? "")) {
        filterParams["employee_id"] = { _in: members };
      }

      const { data: res } = await fetch.get("items/employee", {
        params: {
          fields: [
            "id",
            "employee_course.exam_score",
            "employee_course.tasks_score",
            "employee_course.completed",
            "employee_course.course.is_open_task",
            "employee_course.course.is_open_exam",
          ],
          filter: filterParams,
        },
      });

      // Aggregation variables
      let totalQuizCount = 0;
      let totalExamScore = 0;
      let totalTaskCount = 0;
      let totalTaskScore = 0;
      let completedCourseCount = 0;

      // Iterate over each employee's courses to compute totals
      res?.data?.forEach((employee: any) => {
        employee.employee_course?.forEach((course: any) => {
          if (course?.completed) {
            completedCourseCount += 1;

            if (course.course?.is_open_exam) {
              totalQuizCount += 1;
              totalExamScore += Number(course.exam_score ?? 0);
            }

            if (course.course?.is_open_task) {
              totalTaskCount += 1;
              totalTaskScore += Number(course.tasks_score ?? 0);
            }
          }
        });
      });

      // Calculate averages
      const averageExamScore = totalQuizCount > 0 ? totalExamScore / totalQuizCount : 0;
      const averageTaskScore = totalTaskCount > 0 ? totalTaskScore / totalTaskCount : 0;

      // Update state with calculated totals and averages
      setTotalCourseCompleted(completedCourseCount);
      setTotalAvgQuizScore(Number(averageExamScore.toFixed(1)) || 0);
      setTotalAvgTaskScore(Number(averageTaskScore.toFixed(1)) || 0);
    } catch (error) {
      console.error("Error fetching average scores:", error);
    }
  }, [filters, currentUser, members, fetch]);

  useEffect(() => {
    fetchAverageScores();
  }, [fetchAverageScores]);

  const handleFilterChange = (newFilters: {
    unit_pln: string | null;
    search: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex-1 space-y-2">
        <BreadCrumb items={[{ title: "Evaluasi", link: "/evaluation" }, { title: searchParams.get("name") ?? "", link: "#" } ]} />

        <div className="flex items-start justify-between !mb-10">
          <Heading title={searchParams.get("name") ?? ""} description='' />
        </div>

        {/* <div className="grid gap-4 !mb-10 md:grid-cols-2 lg:grid-cols-3">
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
        </div> */}

        <EvaluationCourseTable
          members={members}
          currentUser={currentUser}
          // onFilterChange={handleFilterChange}
          onFilterChange={() => {}}
          courseId={courseId}
        />
      </div>
    </>
  );
}
