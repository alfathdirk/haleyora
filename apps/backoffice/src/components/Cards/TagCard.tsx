"use client ";

import Image from "next/image";

type Props = {
  label: string;
  color: string;
};
export default function TagCard(props: Props) {
  const { color, label } = props;

  return (
    <>
      <div
        className={`flex p-1 justify-center items-center border-2 cursor-pointer rounded-xl border-red-500`}
      >
        <div className="p-2 rounded-full bg-red-500">
          <Image
            src="./assets/svg/tags-icon.svg"
            width={17}
            height={17}
            alt=""
          />
        </div>
        <p className="mr-4 ml-2">{label}</p>
      </div>
    </>
  );
}
