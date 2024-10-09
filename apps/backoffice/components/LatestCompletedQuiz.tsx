"use client";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Lightbulb, LightbulbIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { format } from "date-fns";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

const LatestCompletedQuiz = () => {
  const router = useRouter()
  const fetch = useDirectusFetch();

  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState<Array<any>>([]);

  async function fetchData() {
    try {
      const { data: res } = await fetch.get("items/employee_course", {
        params: {
          fields: [
            "id",
            "date_created",
            "date_updated",
            "course.title",
            "employee.id",
            "employee.full_name",
          ],
          limit: 3,
          filter: JSON.stringify({}),
          sort: "-date_created",
        },
      });

      setData(res?.data ?? []);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching:", error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (fetching) {
    return (
      <div className="flex flex-col gap-y-10">
        <div className="space-y-2">
          <Skeleton className="w-8/12 h-4" />
          <Skeleton className="w-6/12 h-4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-8/12 h-4" />
          <Skeleton className="w-6/12 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center px-12 py-5 border-2 rounded-3xl shadow-3xl"
          >
            <Lightbulb className="w-8 h-8 mr-4 text-yellow-600" />
            <div className="flex flex-col w-full">
              <h1 className="font-semibold">
                Selesai mengikuti pembelajaran {item?.course?.title ?? ""}
              </h1>
              <div className="mt-2 text-sm">
                {item?.date_created
                  ? format(new Date(item?.date_created), "dd MMM yyyy")
                  : ""}{" "}
                by{" "}
                <span className="font-bold">
                  {item?.employee?.full_name ?? ""}
                </span>
              </div>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="bg-[#4BA6651C] text-sm font-normal text-[#4BA665] w-56 rounded-3xl !py-5"
              onClick={() => router.push(`/employees/${item?.employee?.id}?name=${encodeURIComponent(item?.employee?.full_name)}`)}
            >
              Lihat Hasil Belajar
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default LatestCompletedQuiz;
