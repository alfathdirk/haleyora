"use client ";

import { Col, Row, Image, Container } from "react-bootstrap";
import HeaderProfileNav from "../Dashboard/Header/HeaderProfileNav";

type Props = {
  title: string;
  date: string;
  author: string;
};
export default function CommentListCard(props: Props) {
  const { title, date, author } = props;

  return (
    <>
      <div
        className="d-flex justify-content-between border border-2 rounded"
        style={{
          marginBottom: "12px",
          paddingBottom: "10px",
          paddingTop: "10px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <div className="d-flex" style={{ paddingTop: "12px" }}>
          <Image
            src="./assets/svg/idea.svg"
            style={{
              width: "20px",
              marginRight: "16px",
              paddingBottom: "12px",
            }}
            alt=""
          />
          <div>
            <span className="fw-bold">{title}</span>
            <div>
              <div className="d-flex">
                <p style={{ marginRight: "4px" }}>{date} by </p>
                <p className="fw-bold">{author}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center ">
          <p
            className="fw-semibold"
            style={{
              color: "#4BA665",
              backgroundColor: "#E8F2EB",
              paddingLeft: "60px",
              paddingRight: "60px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "50px",
              marginTop: "12px",
              cursor: "pointer",
            }}
          >
            View
          </p>
          <div style={{ marginLeft: "40px", marginRight: "40px" }}>
            <HeaderProfileNav />
          </div>
          <Image
            src="./assets/svg/Comments.svg"
            style={{
              width: "20px",
              marginRight: "10px",
              paddingBottom: "12px",
              marginTop: "16px",
            }}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
