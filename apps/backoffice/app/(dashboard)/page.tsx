"use client";

import { AuthContext } from "@/provider/Auth";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { CourseOverview } from "@/components/CourseOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeOverview } from "@/components/EmployeeOverview";
import LatestCompletedQuiz from "@/components/LatestCompletedQuiz";
// import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import SelectFilterUnit from "@/components/SelectFilterUnit";
import SelectFilterCourse from "@/components/SelectFilterCourse";
import { UnitOverview } from "@/components/UnitOverview";
import { CoursesSummary } from "@/components/CoursesSummary";
import { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";

export default function page() {
  const { currentUser } = useContext(AuthContext);
  // const fetch = useDirectusFetch();

  const [selectedUnit, setSeletedUnit] = useState<string | null>(null);
  const [selectedCourse, setSeletedCourse] = useState<{ id: string; title: string } | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const handleUnitChange = (unit: string | null) => {
    setSeletedUnit(unit);
  };

  useEffect(() => {}, []);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, {currentUser?.first_name} {currentUser?.last_name} 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-16">
            {/* Filters */}
            <div className="flex items-center justify-between px-1 space-x-2">
              <div className="flex items-center w-full space-x-2 ">
                <CalendarDateRangePicker
                  selectedRange={dateRange}
                  onChange={(range: SetStateAction<DateRange | undefined>) =>
                    setDateRange(range)
                  }
                />
                <div className="w-1/3">
                  <SelectFilterUnit
                    selectedUnit={selectedUnit}
                    onUnitChange={handleUnitChange}
                  />
                </div>
                <div className="w-1/3">
                  <SelectFilterCourse
                    selectedCourse={selectedCourse}
                    onCourseChange={setSeletedCourse}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-7 min-h-96">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg font-normal">
                    Persentase Materi Pembelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <CourseOverview
                    dateRange={dateRange}
                    selectedUnit={selectedUnit}
                    selectedCourse={selectedCourse}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg font-normal">
                    Grafik Kelulusan Karyawan
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <EmployeeOverview
                    dateRange={dateRange}
                    selectedUnit={selectedUnit}
                    selectedCourse={selectedCourse}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-7 min-h-96">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg font-normal">
                    Bagan Nilai Rata - rata per Unit
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <UnitOverview
                    dateRange={dateRange}
                    selectedUnit={selectedUnit}
                    selectedCourse={selectedCourse}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-4">
                <CardHeader>
                  <CardTitle className="text-lg font-normal">
                    Nilai Rata - rata per Materi Pembelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <CoursesSummary
                    dateRange={dateRange}
                    selectedUnit={selectedUnit}
                    selectedCourse={selectedCourse}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <LatestCompletedQuiz />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
