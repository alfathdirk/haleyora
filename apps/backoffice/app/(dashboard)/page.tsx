"use client";

import { AuthContext } from "@/provider/Auth";
import { useContext, useState } from "react";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { CourseOverview } from "@/components/CourseOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeOverview } from "@/components/EmployeeOverview";
import LatestCompletedQuiz from "@/components/LatestCompletedQuiz";
import SelectFilterUnit from "@/components/SelectFilterUnit";
import SelectFilterCourse from "@/components/SelectFilterCourse";
import { UnitOverview } from "@/components/UnitOverview";
import { CoursesSummary } from "@/components/CoursesSummary";
import { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { currentUser } = useContext(AuthContext);

  const [tempUnit, setTempUnit] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [tempCourse, setTempCourse] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  // Final states applied to child components
  const [selectedUnit, setSelectedUnit] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  // Apply filters on "Submit" button click
  const handleFilterSubmit = () => {
    setSelectedUnit(tempUnit);
    setSelectedCourse(tempCourse);
    setDateRange(tempDateRange);
  };

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
          <TabsContent value="overview" className="space-y-8">
            <div className="flex items-center justify-between p-2 space-x-2 bg-white border shadow-sm rounded-xl">
              <div className="flex items-center w-full space-x-2">
                <CalendarDateRangePicker
                  selectedRange={tempDateRange}
                  onChange={(range) => setTempDateRange(range)}
                />
                <div className="w-full">
                  <SelectFilterUnit
                    selectedUnit={tempUnit}
                    onUnitChange={setTempUnit}
                  />
                </div>
                <div className="w-full">
                  <SelectFilterCourse
                    selectedCourse={tempCourse}
                    onCourseChange={setTempCourse}
                  />
                </div>
              </div>
              <Button type="button" size="sm" onClick={handleFilterSubmit}>
                Submit
              </Button>
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
                    <p className="text-sm font-light text-gray-400">
                      Grafik berikut ini merupakan kelulusan dari Nilai
                      Keseluruhan
                    </p>
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
                    <p className="text-sm font-light text-gray-400">
                      Bagan berikut ini merupakan rata - rata nilai Ujian &
                      Tugas
                    </p>
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
                    Rata - rata Nilai Keseluruhan per Materi Pembelajaran
                    <p className="text-sm font-light text-gray-400">
                      Daftar berikut ini merupakan rata - rata dari Nilai
                      Keseluruhan (Kelulusan)
                    </p>
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
