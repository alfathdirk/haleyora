"use client";

import FilterCard from "@/components/Cards/FilterCard";
import LessonsListCard from "@/components/Cards/LessonsListCard";
import SearchCard from "@/components/Cards/SearchCard";
import TagCard from "@/components/Cards/TagCard";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import { useState } from "react";

export default function LessonPage() {
  const lessonsData = [
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "/assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <p className="mb-6 font-semibold text-2xl">Lesson page</p>
      <div className="flex justify-between items-center mb-10 ">
        <div className="flex gap-3">
          <TagCard label={"Popular"} color={"#F6C648"} />
          <TagCard label={"Most Graduated"} color={"#15BE4F"} />
          <TagCard label={"Popular"} color={"#007DD8"} />
        </div>
        <div className="flex">
          <div className="pr-6 mr-6 border-r-2 border-[#787486]">
            <SearchCard onSearch={() => {}} />
          </div>
          <Image
            src="./assets/svg/menu-blue.svg"
            alt=""
            width={36}
            height={36}
            className="mr-6"
          />
          <Image src="./assets/svg/menu.svg" width={24} height={24} alt="" />
        </div>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-5 justify-content-between gap-8">
          {lessonsData.map((lesson, index) => (
            <div key={index}>
              <LessonsListCard
                pic={lesson.pic}
                totalStudent={lesson.totalStudent}
                date={lesson.date}
                tittle={lesson.tittle}
                avatar={lesson.avatar}
                author={lesson.author}
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
