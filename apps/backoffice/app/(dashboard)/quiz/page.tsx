"use client";

import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { QuizTable } from "@/components/tables/Quiz/table";

export default function Page() {
  const router = useRouter();
  const pageName = "Ujian";

  return (
    <>
      <div className="flex-1 space-y-2">
        <BreadCrumb items={[{ title: pageName, link: "/quiz" }]} />

        <div className="flex items-start justify-between !mb-10">
          <Heading title={pageName} description={`Manajemen ${pageName}`} />
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/quiz/create`)}
          >
            <Plus className="w-4 h-4 mr-2" /> Buat Baru
          </Button>
        </div>

        <QuizTable />
      </div>
    </>
  );
}
