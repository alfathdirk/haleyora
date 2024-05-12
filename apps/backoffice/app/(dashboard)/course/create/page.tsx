"use client";

import BreadCrumb from "@/components/breadcrumb";
import { CourseForm } from "@/components/forms/CourseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDirectusContext } from "@/hooks/useDirectusContext";
import { readItems } from "@directus/sdk";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { client } = useDirectusContext();
  const pageName = "Materi Pembelajaran";

  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const filters = {};

        const result = await client.request(
          readItems("activities", {
            fields: ["*"],
            filter: filters,
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

    fetchData();
  }, [client]);

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
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
