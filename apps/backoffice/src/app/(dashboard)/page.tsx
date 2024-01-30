/* eslint-disable jsx-a11y/alt-text */
import CommentListCard from "@/components/Cards/CommentListCard";
import FilterCard from "@/components/Cards/FilterCard";
import LessonChart from "@/components/Charts/LessonChart ";
import PerformanceChart from "@/components/Charts/PerformanceChart";
import { Col } from "react-bootstrap";

export default function Page() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Col style={{ marginTop: "26px" }}>
        <div className="d-flex" style={{ marginBottom: "24px" }}>
          <FilterCard label={"Filter"} src={"./assets/svg/filter-icon.svg"} />
          <FilterCard label={"Today"} src={"./assets/svg/calendar-icon.svg"} />
        </div>
        <div style={{ marginBottom: "36px" }} className="d-flex">
          <div className="p-3 shadow border rounded" style={{ width: "40%" }}>
            <h5>Lesson</h5>
            <LessonChart />
          </div>
          <div
            className="p-3 shadow border rounded"
            style={{ width: "60%", marginLeft: "100px" }}
          >
            <h5>Performance</h5>
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
