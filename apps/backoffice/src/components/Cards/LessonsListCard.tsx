/* eslint-disable jsx-a11y/alt-text */
"use client ";

import Image from "next/image";

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
      <div className="shadow border w-[full] rounded-xl">
        <Image src={pic} width={240} height={100} alt="image" />
        <div className="p-2 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[#878787] my-2">
            <div className="flex items-center gap-1">
              <Image
                src="./assets/svg/users.svg"
                width={12}
                height={4}
                alt="image"
              />
              <p className="text-xs font-semibold">{totalStudent}</p>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="./assets/svg/time.svg"
                width={12}
                height={4}
                alt="image"
              />
              <p className="text-xs font-semibold">{date}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold text-[#515151]">{tittle}</p>
          </div>
          <div className="d-flex justify-content-between ">
            <div className="d-flex items-center gap-1">
              <Image
                className="rounded-circle"
                src={avatar}
                width={25}
                height={25}
                alt="image"
              />
              <p className="text-xs text-[#878787] font-semibold">{author}</p>
            </div>
            <p>
              <Image
                className="rounded-circle"
                src="./assets/svg/love.svg"
                width={20}
                height={20}
                alt="image"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
