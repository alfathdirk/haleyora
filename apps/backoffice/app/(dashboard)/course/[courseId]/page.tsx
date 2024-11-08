"use client";

import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { useParams } from "next/navigation";

export default function Page() {
  const fetch = useDirectusFetch();
  const { courseId } = useParams();
  const pageName = "Materi Pembelajaran";

  const [quiz, setQuiz] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    async function fetchDataActivities() {
      try {
        const { data: res } = await fetch.get("items/activities", {
          params: {
            fields: ["id", "title", "sub_sector.title"],
          },
        });

        res?.data.forEach((item: any) => {
          item._id = item.id;
          item.name = `${item?.sub_sector?.title ?? '-'} | ${item.title}`;
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
        const { data: res } = await fetch.get("items/course/" + courseId, {
          params: {
            fields: ["*"],
          },
        });

        setCourse({
          id: res?.data?.id,
          activities: res?.data?.activities,
          exam_quiz: res?.data?.exam_quiz,
          duration: res?.data?.duration,
          title: res?.data?.title,
          is_open_exam: res?.data?.is_open_exam,
          is_open_task: res?.data?.is_open_task,
          task_description: res?.data?.task_description,
          description: res?.data?.description ?? "",
          min_score: String(res?.data?.min_score) ?? "",
          status: res?.data?.status ?? "",
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
