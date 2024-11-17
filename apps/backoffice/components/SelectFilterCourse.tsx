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
  selectedCourse: { id: string; title: string } | null;
  onCourseChange: (unit: { id: string; title: string } | null) => void;
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

  const handleValueChange = (val: string) => {
    const course = data.find(item => item?.id == val)
    onCourseChange(course ?? null)
  }

  return (
    <Select
      value={selectedCourse?.id ?? ""}
      onValueChange={handleValueChange}
      disabled={loading}
    >
      <SelectTrigger className="flex items-center justify-between">
        <span>
          {selectedCourse?.title ? selectedCourse?.title : "Materi Pembelajaran"}
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
          <SelectItem key={item?.id} value={item?.id}>
            {item?.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
