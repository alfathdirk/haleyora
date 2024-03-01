"use client";

import FilterCard from "@/components/Cards/FilterCard";
import LessonsListCard from "@/components/Cards/LessonsListCard";
import SearchCard from "@/components/Cards/SearchCard";
import TagCard from "@/components/Cards/TagCard";
import Pagination from "@/components/Pagination/Pagination";
import { DirectusContext } from "@/provider/Directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export interface CategoryData {
  id: string;
  name: string;
  image: string;
}
export interface CourseData {
  id: string;
  title: string;
  rating: string;
  level: {
    name: string;
  };
  image: {
    filename_disk: string;
    filename_download: string;
    uploaded_by: {
      first_name: string;
    };
  };
  status?: string;
}

export default function LessonPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { client } = useContext(DirectusContext);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("");
  const [dataCategory, setDataCategory] = useState<CategoryData[]>([]);
  const [dataCourse, setDataCourse] = useState<CourseData[]>([]);

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

  const getCategory = async () => {
    try {
      setLoading(true);
      const result = (await client.request(
        readItems("category", {
          fields: ["*"],
        })
      )) as unknown as CategoryData[];

      setLoading(false);
      setDataCategory(result);
      console.log("dataCategory:", dataCategory);
    } catch (error) {
      setLoading(false);
    }
  };

  const getCourse = async () => {
    try {
      setLoading(true);
      const result = (await client.request(
        readItems("course", {
          fields: ["*", "level.*", "category.*", "image.*.*"],
        })
      )) as unknown as CourseData[];

      setLoading(false);
      setDataCourse(result);
      console.log("dataCourse:", dataCourse);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    getCourse();
  }, []);
  return (
    <div>
      <p className="mb-6 font-semibold text-2xl">Lesson page</p>
      <div className="flex justify-between items-center mb-10 ">
        <div className="flex gap-3">
          {dataCategory.map((listCategory) => {
            return (
              <div key={listCategory.id}>
                <TagCard label={listCategory.name} color={"#F6C648"} />
              </div>
            );
          })}
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
          {dataCourse.map((listDataCourse) => {
            return (
              <div key={listDataCourse.id}>
                <LessonsListCard
                  id={listDataCourse.id}
                  pic={"/assets/img/general/example-lessons-pic.png"}
                  totalStudent={listDataCourse.rating}
                  date={listDataCourse.level.name}
                  tittle={listDataCourse.title}
                  avatar={"/assets/img/avatars/8.jpg"}
                  author={
                    listDataCourse?.image?.uploaded_by.first_name
                      ? listDataCourse.image.uploaded_by.first_name
                      : "Author"
                  }
                />
              </div>
            );
          })}
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
