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

import BreadCrumb from "@/components/breadcrumb";
import { EmployeesTable } from "@/components/Tables/Employee/table";
import { Heading } from "@/components/ui/heading";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
      <BreadCrumb items={[{ title: "Materi Pembelajaran", link: "/lessons" }]} />

      <div className="flex items-start justify-between !mb-10">
        <Heading title={`Materi Pembelajaran`} description="Manage materi pembelajaran" />
      </div>

      <EmployeesTable />
    </div>
  );
}
