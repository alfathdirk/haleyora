"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { Loader } from "./ui/loader";

interface SelectFilterCourseProps {
  selectedCourse: string | null;
  onCourseChange: (unit: string | null) => void;
}

export default function SelectFilterCourse({
  selectedCourse,
  onCourseChange,
}: SelectFilterCourseProps) {
  const fetch = useDirectusFetch();
  const [data, setData] = useState<Array<{ id: string; title: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnits() {
      setLoading(true);
      try {
        const { data: res } = await fetch.get("items/course", {
          params: {
            fields: ["id", "title"],
          },
        });

        setData(res?.data ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  return (
    <Select
      value={selectedCourse ?? ""}
      onValueChange={(value) => onCourseChange(value || null)}
      disabled={loading}
    >
      <SelectTrigger className="flex items-center justify-between">
        <span>
          {selectedCourse ? selectedCourse : "Materi Pembelajaran"}
        </span>
        {loading && (
          <span className="ml-2">
            <Loader />
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Semua</SelectItem>
        {data.map((item) => (
          <SelectItem key={item?.id} value={item?.title}>
            {item?.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
