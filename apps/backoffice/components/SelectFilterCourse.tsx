"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Loader } from "./ui/loader";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";

type Course = { id: string; title: string };

type SelectFilterCourseProps = {
  selectedCourse: Course | null;
  onCourseChange?: (course: Course | null) => void;
  defaultValue?: string;
};

export default function SelectFilterCourse({
  selectedCourse,
  onCourseChange = () => {},
  defaultValue = "",
}: SelectFilterCourseProps) {
  const fetch = useDirectusFetch();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await fetch.get("items/course", {
        params: { fields: ["id", "title"] },
      });
      setCourses(res?.data ?? []);
    } catch {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCourses();
    }
  }, []);

  const handleValueChange = useCallback(
    (val: string) => {
      const course = courses.find((item) => item.id === val);
      onCourseChange(course ?? null);
    },
    [courses, onCourseChange],
  );

  const memoizedCourses = useMemo(
    () =>
      courses.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.title}
        </SelectItem>
      )),
    [courses],
  );

  return (
    <div>
      {error ? (
        <div className="flex flex-row items-center justify-between text-sm text-red-500 bg-red-50">
          <span>{error}</span>
          <button
            onClick={() => {
              fetchCourses();
            }}
            className="mt-2 text-blue-500 underline"
          >
            Retry
          </button>
        </div>
      ) : (
        <Select
          value={selectedCourse?.id ?? defaultValue}
          onValueChange={handleValueChange}
          disabled={loading}
        >
          <SelectTrigger>
            <div className="flex items-center justify-between w-full">
              <span>
                {loading
                  ? "Loading courses..."
                  : selectedCourse?.title || "Materi Pembelajaran"}
              </span>
              {loading && <Loader />}
            </div>
          </SelectTrigger>
          <SelectContent className="overflow-y-auto max-h-40">
            {memoizedCourses?.length > 0 && (
              <SelectItem value="">Semua</SelectItem>
            )}
            {memoizedCourses.length > 0 ? (
              memoizedCourses
            ) : (
              <SelectItem value="" disabled>
                No courses available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
