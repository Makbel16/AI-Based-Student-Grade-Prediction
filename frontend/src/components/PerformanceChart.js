import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ inputs, predictedScore }) => {
  if (!inputs) return null;

  const labels = [
    "Attendance",
    "Assignment",
    "Quiz",
    "Mid Exam",
    "Final Exam",
    "Study Hrs",
  ];

  const values = [
    inputs.attendance,
    inputs.assignment,
    inputs.quiz,
    inputs.mid_exam,
    inputs.final_exam,
    inputs.study_hours * 10,
  ];

  const barData = {
    labels,
    datasets: [
      {
        label: "Your Inputs",
        data: values,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderRadius: 8,
      },
      {
        label: "Predicted Score",
        data: labels.map(() => predictedScore),
        backgroundColor: "rgba(16, 185, 129, 0.4)",
        borderRadius: 8,
      },
    ],
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: "Performance Profile",
        data: values,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgb(99, 102, 241)",
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: "#cbd5e1" } } },
    scales: {
      y: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } },
      x: { ticks: { color: "#94a3b8" }, grid: { color: "#1e293b" } },
    },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-4 font-medium text-slate-300">Score Comparison</h3>
        <Bar data={barData} options={chartOptions} />
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-4 font-medium text-slate-300">Performance Radar</h3>
        <Radar
          data={radarData}
          options={{
            responsive: true,
            plugins: { legend: { labels: { color: "#cbd5e1" } } },
          }}
        />
      </div>
    </div>
  );
};

export default PerformanceChart;
