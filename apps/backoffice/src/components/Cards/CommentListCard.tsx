"use client ";

import HeaderProfileNav from "../Dashboard/Header/HeaderProfileNav";
import Image from "next/image";

type Props = {
  title: string;
  date: string;
  author: string;
};
export default function CommentListCard(props: Props) {
  const { title, date, author } = props;

  return (
    <>
      <div className="d-flex justify-content-between border-2 rounded mb-3 py-3 px-12">
        <div className="d-flex">
          <Image
            src="./assets/svg/idea.svg"
            alt=""
            width={20}
            height={20}
            className="mr-4"
          />
          <div>
            <span className="fw-bold">{title}</span>
            <div>
              <div className="d-flex">
                <p className="mr-1">{date} by </p>
                <p className="fw-bold">{author}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center ">
          <p className="text-[#4BA665] bg-[#EBF5EE] py-2 px-16 rounded-full font-semibold cursor-pointer">
            View
          </p>
          <div className="mx-6">
            <HeaderProfileNav />
          </div>
          <Image
            src="./assets/svg/Comments.svg"
            width={20}
            height={20}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
