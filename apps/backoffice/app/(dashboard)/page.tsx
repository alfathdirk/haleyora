"use client";

import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { CourseOverview } from "@/components/CourseOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeOverview } from "@/components/EmployeeOverview";
import { useContext } from "react";
import { AuthContext } from "@/provider/Auth";
import LatestCompletedQuiz from "@/components/LatestCompletedQuiz";

export default function page() {
  const { currentUser } = useContext(AuthContext);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, {currentUser?.first_name} {currentUser?.last_name} 👋
          </h2>
          <div className="items-center hidden space-x-2 md:flex">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button>Download</Button> */}
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="analytics" disabled>
              Others
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="overview" className="space-y-16">
            <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-7 min-h-96">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-xl font-normal">
                    Persentase Materi Pembelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <CourseOverview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-4">
                <CardHeader>
                  <CardTitle className="text-xl font-normal">
                    Grafik Kelulusan Karyawan
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pl-2 h-3/4">
                  <EmployeeOverview />
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
