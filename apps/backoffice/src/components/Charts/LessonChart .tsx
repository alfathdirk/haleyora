"use client";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LessonChart = () => {
  const data = {
    datasets: [
      {
        data: [32, 25, 25, 18],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#238899"],
      },
    ],
    labels: ["Completed", "Exam", "Quiz", "On Going"],
  };

  return (
    <div>
      <Chart type="pie" data={data} />
    </div>
  );
};

export default LessonChart;
