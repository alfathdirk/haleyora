"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { readItem, readItems } from "@directus/sdk";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { courseId } = useParams();
  const { client } = useDirectusContext();
  const pageName = "Materi Pembelajaran";

  const [activities, setActivities] = useState<any>([]);
  const [course, setCourse] = useState<any>(null);

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
          readItem("course", courseId),
        );

        setCourse({
          id: result?.id,
          activities: result?.activities,
          title: result?.title,
          is_open_exam: result?.is_open_exam,
          is_open_task: result?.is_open_task,
          description: result?.description ?? '',
          min_score: result?.min_score ?? '',
          status: result?.status ?? '',
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchDataActivities();
    fetchData();
  }, [client, courseId]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb
          items={[
            { title: pageName, link: "/course" },
            { title: "Ubah", link: "/course/create" },
          ]}
        />

        <CourseForm
          status={[
            { _id: "published", name: "Published" },
            { _id: "draft", name: "Draft" },
            { _id: "archived", name: "Archived" },
          ]}
          activities={activities}
          initialData={course}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
