/* eslint-disable jsx-a11y/alt-text */
"use client ";

import { Button, Form } from "react-bootstrap";
import Image from "next/image";

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
      <div className=" justify-content-center border-2 p-3 bg-white rounded-xl">
        <p className="text-xl font-semibold">{tittle}</p>
        <div className="flex my-3 gap-6 pb-3 border-b-2">
          <div className="flex gap-1 items-center">
            <Image
              src="./assets/svg/date-black.svg"
              width={14}
              height={14}
              alt="date"
            />
            <p>{date}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="./assets/svg/time-black.svg"
              width={14}
              height={14}
              alt="time"
            />
            <p>{time}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 w-[50%]">
            <p className="font-semibold">
              Duration<span className="text-gray-500">(Minutes)</span>
            </p>
            <p className="p-3 rounded bg-[#F5F6F7] mr-3">{duration}</p>
            <p className="font-semibold">Number of Question</p>
            <p className="p-3 rounded bg-[#F5F6F7] mr-3">{numberOfQuestion}</p>
            <p className="font-semibold">Score of Question</p>
            <p className="p-3 rounded bg-[#F5F6F7] mr-3">{scoreOfQuestion}</p>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <p className="font-semibold">Description</p>
            <p className="p-3 rounded bg-[#F5F6F7]">{description}</p>
            <p className="font-semibold">Question Bank Used</p>
            <p className="p-3 rounded bg-[#F5F6F7]">{questionBank}</p>
            <div className="d-flex">
              <Form.Check type="checkbox" checked />
              <p className="pl-2">Randomize Questions</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="py-2 text-white w-full bg-black rounded-md"
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
          </button>
        </div>
      </div>
    </>
  );
}
