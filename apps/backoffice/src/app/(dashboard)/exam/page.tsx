"use client";

import Image from "next/image";
import SearchCard from "@/components/Cards/SearchCard";
import QuestionCard from "@/components/Cards/QuestionCard";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";

export default function ExamPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const lessonsData = [
    {
      tittle: "Electric Power Systems Overview",
      date: "12 / 03 / 2023",
      time: "09 : 00",
      numberOfQuestion: "10",
      scoreOfQuestion: "1",
      description:
        "Lorem ipsum aset amet consectedur im nascsa assadqw assacsc aidwqdjv asdewfas qwdass Lorem ipsum aset amet consectedur im nascsa assadqw assacsc aidwqdjv",
      questionBank: "Bank one",
      randomize: true,
      duration: "10 minutes",
    },
    {
      tittle: "Digital Electronics Basics",
      date: "12 / 03 / 2023",
      time: "09 : 00",
      numberOfQuestion: "10",
      scoreOfQuestion: "1",
      description:
        "Lorem ipsum aset amet consectedur im nascsa assadqw assacsc aidwqdjv asdewfas qwdass Lorem ipsum aset amet consectedur im nascsa assadqw assacsc aidwqdjv",
      questionBank: "Bank one",
      randomize: true,
      duration: "10 minutes",
    },
  ];
  return (
    <div>
      <p className="font-semibold text-2xl mb-6">Exam page</p>
      <div className="d-flex justify-content-between align-items-center mb-8">
        <SearchCard onSearch={() => {}} />
        <div className="flex gap-3">
          <Image
            src="./assets/svg/menu-blue.svg"
            width={36}
            height={36}
            alt=""
          />
          <Image src="./assets/svg/menu.svg" width={24} height={24} alt="" />
        </div>
      </div>
      <div>
        <div className="row">
          {lessonsData.map((lesson, index) => (
            <div key={index} className="col-md-6 mb-8">
              <QuestionCard
                tittle={lesson.tittle}
                date={lesson.date}
                time={lesson.time}
                duration={lesson.duration}
                numberOfQuestion={lesson.numberOfQuestion}
                scoreOfQuestion={lesson.scoreOfQuestion}
                description={lesson.description}
                questionBank={lesson.questionBank}
                randomize={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Pagination
          totalItems={10}
          itemsPerPage={2}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
