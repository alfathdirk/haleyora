"use client";

import { Badge } from "@/components/ui/badge";

interface LessonTagsProps {
  tags: string[];
}

export function LessonTags({ tags }: LessonTagsProps) {
  const displayTags = tags.slice(0, 2);
  const additionalTags = tags.length > 2 ? tags.length - 2 : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, index) => (
        <Badge
          key={index}
          variant="secondary"
          className={`px-2 py-1 rounded-full ${
            index === 0 ? "bg-[#F5F6F7] text-[#091E42]" : "bg-[#F7E8EF] text-[#6A1039]"
          }`}
        >
          {tag}
        </Badge>
      ))}
      {additionalTags > 0 && (
        <Badge variant="outline" className="px-2 py-1 bg-[#F5F6F7] text-[#091E42] rounded-full">
          +{additionalTags}
        </Badge>
      )}
    </div>
  );
}
