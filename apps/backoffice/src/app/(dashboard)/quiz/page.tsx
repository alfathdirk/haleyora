"use client";

import Image from "next/image";
import SearchCard from "@/components/Cards/SearchCard";
import QuestionCard from "@/components/Cards/QuestionCard";
import Pagination from "@/components/Pagination/Pagination";
import { useContext, useEffect, useState } from "react";
import { DirectusContext } from "@/provider/Directus";
import { readItems } from "@directus/sdk";

export interface QuizData {
  id: string;
  randomize?: boolean;
  score_per_question: string;
  title: string;
  description: string;
  duration: string;
  user_created: { last_access: string };
  question_bank: string;
  course: [];
}

export default function QuizPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { client } = useContext(DirectusContext);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("");
  const [dataQuis, setDataQuis] = useState<QuizData[]>([]);
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

  const getQuis = async () => {
    try {
      setLoading(true);
      const result = (await client.request(
        readItems("quiz", {
          fields: ["*", "course.*", "user_created.*"],
        })
      )) as unknown as QuizData[];

      setLoading(false);
      setDataQuis(result);
      console.log("dataQuis:", dataQuis);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuis();
  }, []);

  return (
    <div>
      <p className="font-semibold text-2xl mb-6">Quiz page</p>
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
          {dataQuis.map((lesson, index) => (
            <div key={index} className="col-md-6 mb-8">
              <QuestionCard
                tittle={lesson.title}
                date={lesson.user_created.last_access}
                duration={lesson.duration}
                numberOfQuestion={lesson.score_per_question}
                scoreOfQuestion={lesson.score_per_question}
                description={lesson.description}
                questionBank={lesson.question_bank}
                randomize={lesson.randomize}
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
