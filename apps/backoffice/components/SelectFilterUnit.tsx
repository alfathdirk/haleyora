"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useDirectusFetch } from "@/hooks/useDirectusFetch";
import { Loader } from "./ui/loader";

interface Unit {
  id: string;
  title: string;
}

interface SelectFilterUnitProps {
  selectedUnit: Unit | null;
  onUnitChange: (unit: Unit | null) => void;
}

export default function SelectFilterUnit({
  selectedUnit,
  onUnitChange,
}: SelectFilterUnitProps) {
  const fetch = useDirectusFetch();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  const fetchUnits = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res }: { data: { data: { id_region: string | null, name: string }[] } } =
        await fetch.get("items/unit_region", {
          params: { fields: ["*"] },
        });

      const filtered = res?.data
        ?.map((item) => ({
          id: item.id_region ?? "",
          title: item.name ?? "",
        }))

      setUnits(filtered);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch units. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUnits();
    }
  }, []);

  const handleValueChange = useCallback(
    (val: string) => {
      const course = units.find((item) => item.id === val);
      onUnitChange(course ?? null);
    },
    [units, onUnitChange],
  );

  const memoizedUnits = useMemo(
    () =>
      units.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.title}
        </SelectItem>
      )),
    [units],
  );

  return (
    <div>
      {error ? (
        <div className="flex flex-row items-center justify-between px-3 py-2 text-sm text-red-500 rounded-md bg-red-50">
          <p>{error}</p>
          <button
            onClick={() => {
              fetchUnits();
            }}
            className="underline ext-blue-500"
          >
            Retry
          </button>
        </div>
      ) : (
        <Select
          value={selectedUnit?.id ?? ""}
          onValueChange={handleValueChange}
          disabled={loading}
        >
          <SelectTrigger>
            <div className="flex items-center justify-between w-full">
              <span>
                {loading
                  ? "Loading units..."
                  : selectedUnit?.title || "Unit PLN"}
              </span>
              {loading && <Loader />}
            </div>
          </SelectTrigger>
          <SelectContent className="overflow-y-auto max-h-40">
            {memoizedUnits?.length > 0 && (
              <SelectItem value="">Semua</SelectItem>
            )}
            {memoizedUnits.length > 0 ? (
              memoizedUnits
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
