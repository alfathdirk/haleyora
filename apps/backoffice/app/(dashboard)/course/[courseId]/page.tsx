"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { readItem, readItems } from "@directus/sdk";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const fetch = useDirectusFetch();
  const { courseId } = useParams();
  const { client } = useDirectusContext();
  const pageName = "Materi Pembelajaran";

  const [quiz, setQuiz] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    async function fetchDataActivities() {
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

    async function fetchData() {
      try {
        const { data: res } = await fetch.get("items/course/"+courseId, {
          params: {
            fields: ["*"],
          },
        });
        console.log('\n \x1b[33m ~ res:', res);

        setCourse({
          id: res?.data?.id,
          activities: res?.data?.activities,
          exam_quiz: res?.data?.exam_quiz,
          title: res?.data?.title,
          is_open_exam: res?.data?.is_open_exam,
          is_open_task: res?.data?.is_open_task,
          description: res?.data?.description ?? '',
          min_score: String(res?.data?.min_score) ?? '',
          status: res?.data?.status ?? '',
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching:", error);
      }
    }

    fetchData();
    fetchDataQuiz();
    fetchDataActivities();
  }, [courseId]);

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
          quiz={quiz}
          initialData={course}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
