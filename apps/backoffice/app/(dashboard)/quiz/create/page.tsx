"use client";

import BreadCrumb from "@/components/breadcrumb";
import { QuizForm } from "@/components/forms/QuizForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import React, { useEffect, useState } from "react";

export default function Page() {
  const fetch = useDirectusFetch();
  const pageName = "Ujian";

  const [activities, setActivities] = useState<any>([]);

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
    // async function fetchData() {
    //   try {
    //     const filters = {};

    //     const result = await client.request(
    //       readItems("activities", {
    //         fields: ["*"],
    //         filter: filters,
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

    fetchDataActivities();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <BreadCrumb
          items={[
            { title: pageName, link: "/quiz" },
            { title: "Buat Baru", link: "/quiz/create" },
          ]}
        />

        <QuizForm
          // status={[
          //   { _id: "Published", name: "Published" },
          //   { _id: "Draft", name: "Draft" },
          //   { _id: "Archived", name: "Archived" },
          // ]}
          activities={activities}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
