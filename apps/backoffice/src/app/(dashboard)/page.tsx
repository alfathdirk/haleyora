/* eslint-disable jsx-a11y/alt-text */
"use client";

import CommentListCard from "@/components/Cards/CommentListCard";
import FilterCard from "@/components/Cards/FilterCard";
import LessonChart from "@/components/Charts/LessonChart ";
import PerformanceChart from "@/components/Charts/PerformanceChart";
import { useState } from "react";
import { Col } from "react-bootstrap";

export default function Page() {
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string | null>(null);

  return (
    <div>
      <p className="text-2xl mb-4 font-semibold">Dashboard</p>
      <Col>
        <div className="flex gap-2 mb-6">
          <FilterCard
            label="Filter"
            src={"./assets/svg/filter-icon.svg"}
            options={statusOptions}
            onSelect={(status) => setOption(status)}
          />
          <FilterCard
            label="Filter"
            src={"./assets/svg/calendar-icon.svg"}
            options={statusOptions}
            onSelect={(status) => setOption(status)}
          />
        </div>
        <div className="d-flex mb-9">
          <div className="p-3 shadow border rounded w-[40%]">
            <p className="text-xl font-semibold">Lesson</p>
            <LessonChart data={[{ status: "ok", count: 2 }]} />
          </div>
          <div className="p-3 shadow border rounded w-[60%] ml-24">
            <p className="text-xl font-semibold">Performance</p>
            <PerformanceChart />
          </div>
        </div>
        <Col>
          <CommentListCard
            title={"Pass the electrical circuit lesson exam"}
            date={"10 December 2023"}
            author={" Budi Gunawan"}
          />
          <CommentListCard
            title={"Have completed the chapter 1 electricity quiz"}
            date={"10 December 2023"}
            author={" Budi Gunawan"}
          />
          <CommentListCard
            title={"Pass the electrical circuit lesson exam"}
            date={"10 December 2023"}
            author={" Budi Gunawan"}
          />
        </Col>
      </Col>
    </div>
  );
}
