"use client";

import { Button } from "@/components/ui/button";
import { Filter, ChevronDown } from "lucide-react";

export function FilterButton() {
  return (
    <Button variant="outline">
      <Filter className="w-4 h-4 mr-2" />
      Filter
      <ChevronDown className="w-4 h-4 ml-2" />
    </Button>
  );
}
