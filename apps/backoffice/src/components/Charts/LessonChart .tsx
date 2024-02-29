"use client";

import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

interface Props {
  data: {
    status: string;
    count: number;
  }[];
}

const LessonChart = ({ data: d }: Props) => {
  const data = {
    datasets: [
      {
        data: d.map((item) => item.count),
        backgroundColor: ["#D32C20", "#39B4F3", "#625ED7", "#218191"],
      },
    ],
    labels: d.map((item) => item.status),
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "right",
        display: true,
        labels: {
          boxWidth: 15,
          boxHeight: 15,
        },
      },
    },
    aspectRatio: 2,
    responsive: true,
  };

  return (
    <div className="p-6">
      <Chart type="pie" data={data} options={options} />
    </div>
  );
};

export default LessonChart;
