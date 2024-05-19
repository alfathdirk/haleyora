"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import React, { useEffect, useState } from "react";

export default function Page() {
  const fetch = useDirectusFetch();
  const pageName = "Materi Pembelajaran";

  const [quiz, setQuiz] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: res } = await fetch.get("items/activities", {
          params: {
            fields: ["id, title"],
          },
        });

        res?.data.forEach((item: any) => {
          item._id = item.id;
          item.name = item.title;
        });

        setActivities(res?.data ?? []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    async function fetchDataQuiz() {
      try {
        const { data: res } = await fetch.get("items/quiz", {
          params: {
            fields: ["id, title"],
          },
        });

        res?.data.forEach((item: any) => {
          item._id = item.id;
          item.name = item.title;
        });

        setQuiz(res?.data ?? []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchData();
    fetchDataQuiz();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb
          items={[
            { title: pageName, link: "/course" },
            { title: "Buat Baru", link: "/course/create" },
          ]}
        />

        <CourseForm
          status={[
            { _id: "Published", name: "Published" },
            { _id: "Draft", name: "Draft" },
            { _id: "Archived", name: "Archived" },
          ]}
          activities={activities}
          quiz={quiz}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
