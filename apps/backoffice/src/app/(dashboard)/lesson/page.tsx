import FilterCard from "@/components/Cards/FilterCard";
import LessonsListCard from "@/components/Cards/LessonsListCard";
import SearchCard from "@/components/Cards/SearchCard";
import TagCard from "@/components/Cards/TagCard";
import Pagination from "@/components/Pagination/Pagination";
import { Image } from "react-bootstrap";

export default function LessonPage() {
  const lessonsData = [
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
    {
      pic: "./assets/img/general/example-lessons-pic.png",
      totalStudent: "500 Student",
      date: "f2h 20m",
      tittle: "Electromagnetic Principles & Induction",
      avatar: "/assets/img/avatars/8.jpg",
      author: "Danaya",
    },
  ];

  return (
    <div>
      <h1>Lesson page</h1>
      <div style={{ marginTop: "26px" }}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ marginBottom: "24px" }}
        >
          <div className="d-flex">
            <TagCard label={"Popular"} color={"#F6C648"} />
            <TagCard label={"Popular"} color={"#15BE4F"} />
            <TagCard label={"Popular"} color={"#007DD8"} />
          </div>
          <div className="d-flex">
            <div
              style={{
                paddingRight: "24px",
                marginRight: "24px",
                borderRight: "1px solid #787486",
              }}
            >
              <SearchCard />
            </div>
            <Image
              src="./assets/svg/menu-blue.svg"
              style={{ width: "36px", marginRight: "24px" }}
              alt=""
            />
            <Image
              src="./assets/svg/menu.svg"
              style={{ width: "24px" }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "24px", paddingTop: "16px" }}>
        <div className="d-flex flex-wrap justify-content-between">
          {lessonsData.map((lesson, index) => (
            <div
              key={index}
              style={{ marginRight: "16px", marginBottom: "50px" }}
            >
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
        <Pagination meta={lessonsData} />
      </div>
    </div>
  );
}
