"use client";

import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { CourseTable } from "@/components/tables/Course/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const pageName = "Materi Pembelajaran";

  return (
    <div className="flex-1 space-y-2">
      <BreadCrumb items={[{ title: pageName, link: "/course" }]} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={pageName} description={`Manage ${pageName}`} />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/course/create`)}
        >
          <Plus className="w-4 h-4 mr-2" /> Buat Baru
        </Button>
      </div>

      <CourseTable />
    </div>
  );
}
