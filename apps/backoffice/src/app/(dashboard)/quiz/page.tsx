import { Image } from "react-bootstrap";
import SearchCard from "@/components/Cards/SearchCard";
import QuestionCard from "@/components/Cards/QuestionCard";
import Pagination from "@/components/Pagination/Pagination";

export default function QuizPage() {
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
      <h2>Quiz page</h2>
      <div style={{ marginTop: "26px" }}>
        <div
          className="d-flex justify-content-between align-items-center "
          style={{ marginBottom: "24px" }}
        >
          <SearchCard />
          <div className="d-flex">
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
      <div style={{ paddingTop: "16px" }}>
        <div className="row">
          {lessonsData.map((lesson, index) => (
            <div
              key={index}
              className="col-md-6"
              style={{ marginBottom: "50px" }}
            >
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
        <Pagination meta={lessonsData} />
      </div>
    </div>
  );
}
