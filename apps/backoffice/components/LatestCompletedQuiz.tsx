"use client";

import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Lightbulb, LightbulbIcon } from "lucide-react";
import { useState } from "react";

const LatestCompletedQuiz = () => {
  const [data, setData] = useState([0,1,2]);

  return (
    <div className="space-y-4">
      {data?.map((item, index) => {
        return (
          <div key={index} className="flex items-center px-12 py-5 border-2 rounded-3xl shadow-3xl">
            <Lightbulb className="w-8 h-8 mr-4 text-yellow-600" />
            <div className="flex flex-col w-full">
              <h1 className="font-semibold">
                Selesai mengikuti pembelajaran Pengukuran tahanan
                Isolasi/Isolator PMT
              </h1>
              <div className="mt-2 text-sm">
                10 December 2023 by{" "}
                <span className="font-bold">Budi Gunawan</span>
              </div>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="bg-[#4BA6651C] text-lg font-normal text-[#4BA665] w-56 rounded-3xl !py-5"
            >
              Lihat Hasil Belajar
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default LatestCompletedQuiz;
