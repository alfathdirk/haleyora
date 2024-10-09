"use client";

import BreadCrumb from "@/components/breadcrumb";
import { QuizForm } from "@/components/forms/QuizForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { quizId } = useParams();
  const fetch = useDirectusFetch();
  const pageName = "Ujian";

  const [activities, setActivities] = useState<any>([]);
  const [detail, setDetail] = useState<any>(null);


  async function fetchDetailData(quizId: any) {
    try {
      const { data: res } = await fetch.get("items/quiz", {
        params: {
          fields: ["*", "quiz_question.*"],
          filter: JSON.stringify({
            id: { _eq: quizId },
          }),
          meta: "total_count,filter_count",
        },
      });

      setDetail(res?.data[0] ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    }
  }

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

  useEffect(() => {
    // async function fetchDataActivities() {
    //   try {
    //     const result = await client.request(
    //       readItems("activities", {
    //         fields: ["*"],
    //       }),
    //     );

    //     result.forEach((item) => {
    //       item._id = item.id;
    //       item.name = item.title;
    //     });

    //     setActivities(result ?? []);
    //   } catch (error) {
    //     // eslint-disable-next-line no-console
    //     console.error("Error fetching:", error);
    //   }
    // }

    // async function fetchData() {
    //   try {
    //     const result = await client.request(
    //       readItem("quiz", quizId, {
    //         fields: ["*", "quiz_question.*"],
    //       }),
    //     );

    //     setDetail(result);
    //   } catch (error) {
    //     // eslint-disable-next-line no-console
    //     console.error("Error fetching:", error);
    //   }
    // }

    fetchDataActivities();
    fetchDetailData(quizId);
  }, [quizId]);

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
