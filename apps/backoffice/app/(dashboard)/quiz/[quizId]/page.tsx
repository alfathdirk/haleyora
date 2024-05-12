"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { QuizForm } from "@/components/forms/QuizForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { readItem, readItems } from "@directus/sdk";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { quizId } = useParams();
  const { client } = useDirectusContext();
  const pageName = "Kuis";

  const [activities, setActivities] = useState<any>([]);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    async function fetchDataActivities() {
      try {
        const result = await client.request(
          readItems("activities", {
            fields: ["*"],
          }),
        );

        result.forEach((item) => {
          item._id = item.id;
          item.name = item.title;
        });

        setActivities(result ?? []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    async function fetchData() {
      try {
        const result = await client.request(
          readItem("quiz", quizId, {
            fields: ["*", "quiz_question.*"],
          }),
        );

        setDetail(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchDataActivities();
    fetchData();
  }, [client, quizId]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb
          items={[
            { title: pageName, link: "/quiz" },
            { title: "Ubah", link: "/quiz/create" },
          ]}
        />

        <QuizForm
          activities={activities}
          initialData={detail}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
