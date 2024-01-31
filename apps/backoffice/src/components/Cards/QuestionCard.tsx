/* eslint-disable jsx-a11y/alt-text */
"use client ";

import { Button, Form, Image, Spinner } from "react-bootstrap";

type Props = {
  tittle: string;
  date: string;
  time: string;
  duration: string;
  numberOfQuestion: string;
  scoreOfQuestion: string;
  description: string;
  questionBank: string;
  randomize: boolean;
};
export default function QuestionCard(props: Props) {
  const {
    date,
    description,
    duration,
    numberOfQuestion,
    questionBank,
    randomize,
    scoreOfQuestion,
    time,
    tittle,
  } = props;

  return (
    <>
      <div
        className=" justify-content-center border border-2 p-3"
        style={{ borderRadius: "20px", backgroundColor: "white" }}
      >
        <h4 style={{ fontWeight: "bold" }}>{tittle}</h4>
        <div
          className="d-flex align-items-center"
          style={{ borderBottom: "2px solid #D9DBE9" }}
        >
          <Image
            src="./assets/svg/date-black.svg"
            style={{ marginRight: "6px" }}
          />
          <p style={{ paddingTop: "14px", marginRight: "24px" }}>{date}</p>
          <Image
            src="./assets/svg/time-black.svg"
            style={{ marginRight: "6px" }}
          />
          <p style={{ paddingTop: "14px", marginRight: "6px" }}>{time}</p>
        </div>
        <div className="row" style={{ marginTop: "12px" }}>
          <div className="col-md-6">
            <p style={{ fontWeight: "bold" }}>Duration(Minutes)</p>
            <p
              className="p-3 rounded"
              style={{ backgroundColor: "#F5F6F7", marginTop: "-12px" }}
            >
              {duration}
            </p>
            <p style={{ fontWeight: "bold" }}>Number of Question</p>
            <p
              className="p-3 rounded"
              style={{ backgroundColor: "#F5F6F7", marginTop: "-12px" }}
            >
              {numberOfQuestion}
            </p>
            <p style={{ fontWeight: "bold" }}>Score of Question</p>
            <p
              className="p-3 rounded"
              style={{ backgroundColor: "#F5F6F7", marginTop: "-12px" }}
            >
              {scoreOfQuestion}
            </p>
          </div>
          <div className="col-md-6">
            <p style={{ fontWeight: "bold" }}>Description</p>
            <p
              className="p-3 rounded"
              style={{ backgroundColor: "#F5F6F7", marginTop: "-12px" }}
            >
              {description}
            </p>
            <p style={{ fontWeight: "bold" }}>Question Bank Used</p>
            <p
              className="p-3 rounded"
              style={{ backgroundColor: "#F5F6F7", marginTop: "-12px" }}
            >
              {questionBank}
            </p>
            <div className="d-flex">
              <Form.Check type="checkbox" checked />
              <p style={{ marginLeft: "10px" }}>Randomize Questions</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "12px", marginBottom: "12px" }}>
          <Button
            className="px-4 py-2 w-100"
            variant="dark"
            type="submit"
            // disabled={submitting}
          >
            {/* {submitting ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "log in"
            )} */}
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
