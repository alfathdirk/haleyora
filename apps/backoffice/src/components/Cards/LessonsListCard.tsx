/* eslint-disable jsx-a11y/alt-text */
"use client ";

import { Image } from "react-bootstrap";

type Props = {
  pic: string;
  totalStudent: string;
  date: string;
  tittle: string;
  avatar: string;
  author: string;
};
export default function LessonsListCard(props: Props) {
  const { pic, author, avatar, date, tittle, totalStudent } = props;

  return (
    <>
      <div
        className="shadow border"
        style={{ width: "220px", borderRadius: "30px" }}
      >
        <Image src={pic} style={{ width: "100%" }} />
        <div className="p-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex " style={{ color: "#878787" }}>
              <Image
                src="./assets/svg/users.svg"
                width="12px"
                style={{ marginBottom: "15px", marginRight: "6px" }}
              />
              <p style={{ fontSize: "12px" }}>{totalStudent}</p>
            </div>
            <div className="d-flex " style={{ color: "#878787" }}>
              <Image
                src="./assets/svg/time.svg"
                width="12px"
                style={{ marginBottom: "15px", marginRight: "6px" }}
              />
              <p style={{ fontSize: "12px" }}>{date}</p>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{tittle}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Image
                className="rounded-circle"
                src={avatar}
                width="32px"
                height="32px"
                style={{ marginRight: "6px" }}
              />
              <p>{author}</p>
            </div>
            <p>
              <Image
                className="rounded-circle"
                src="/assets/svg/love.svg"
                width="30px"
                height="30px"
                style={{ marginRight: "6px" }}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
