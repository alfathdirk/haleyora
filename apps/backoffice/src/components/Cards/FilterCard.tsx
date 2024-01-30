"use client ";

import { Image } from "react-bootstrap";

type Props = {
  label: string;
  src: string;
};
export default function FilterCard(props: Props) {
  const { src, label } = props;

  return (
    <>
      <div
        className="d-flex  justify-content-center border border-2 rounded"
        style={{ width: "150px", marginRight: "10px", cursor: "pointer" }}
      >
        <Image src={src} style={{ width: "17px" }} alt="" />
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
        <Image
          src="./assets/svg/arrow-down.svg"
          style={{ width: "17px" }}
          alt=""
        />
      </div>
    </>
  );
}
