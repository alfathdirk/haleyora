"use client";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LessonChart = () => {
  const data = {
    datasets: [
      {
        label: "Performance",
        data: [32, 25, 25, 18],
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
        fill: false,
      },
      {
        label: "Performance",
        data: [15, 35, 32, 18],
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Performance",
        data: [18, 25, 25, 32],
        borderColor: "#FFCE56",
        backgroundColor: "#FFCE56",
        fill: false,
      },
      {
        label: "Performance",
        data: [18, 25, 32, 25],
        borderColor: "#238899",
        backgroundColor: "#238899",
        fill: false,
      },
    ],
    labels: ["Completed", "Exam", "Quiz", "On Going"],
  };

  return (
    <div>
      <Chart type="line" data={data} />
    </div>
  );
};

export default LessonChart;
