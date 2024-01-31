"use client ";

import { Image } from "react-bootstrap";

type Props = {
  label: string;
  color: string;
};
export default function TagCard(props: Props) {
  const { color, label } = props;

  return (
    <>
      <div
        className="d-flex justify-content-center border border-2"
        style={{
          width: "150px",
          marginRight: "10px",
          cursor: "pointer",
          borderRadius: "15px",
          borderColor: `${color} !important`,
        }}
      >
        <div
          style={{
            color: color,
            backgroundColor: color,
            width: "34px",
            height: "34px",
            borderRadius: "50px",
            marginTop: "4px",
          }}
          className="d-flex justify-content-center"
        >
          <Image
            src="./assets/svg/tags-icon.svg"
            style={{ width: "17px" }}
            alt=""
          />
        </div>
        <p
          style={{
            marginTop: "6px",
            marginRight: "16px",
            marginLeft: "16px",
            height: "20px",
          }}
        >
          {label}
        </p>
      </div>
    </>
  );
}
