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

interface SelectFilterUnitProps {
  selectedUnit: string | null;
  onUnitChange: (unit: string | null) => void;
}

export default function SelectFilterUnit({
  selectedUnit,
  onUnitChange,
}: SelectFilterUnitProps) {
  const fetch = useDirectusFetch();
  const [units, setUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnits() {
      setLoading(true);
      try {
        const { data: res } = await fetch.get("items/employee", {
          params: {
            fields: ["unit_pln"],
            groupBy: "unit_pln",
          },
        });

        const filtered = res?.data
          .map((item: any) => item.unit_pln)
          .filter(Boolean);
        setUnits(filtered ?? []);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  return (
    <Select
      value={selectedUnit ?? ""}
      onValueChange={(value) => onUnitChange(value || null)}
      disabled={loading}
    >
      <SelectTrigger className="flex items-center justify-between">
        <span>{selectedUnit ? selectedUnit : "Unit PLN"}</span>
        {loading && (
          <span className="ml-2">
            <Loader />
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Semua</SelectItem>
        {units.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
