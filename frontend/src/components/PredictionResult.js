import React from "react";
import { categoryStyles } from "../utils/validation";

const PredictionResult = ({ result }) => {
  if (!result) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6">
        <p className="text-center text-slate-500">
          Fill in the form and click predict to see your estimated final score.
        </p>
      </div>
    );
  }

  const { predicted_score, performance_category } = result;
  const badgeClass =
    categoryStyles[performance_category] || categoryStyles.Average;

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
      <p className="text-sm uppercase tracking-wider text-slate-400">
        Predicted Final Score
      </p>
      <p className="mt-2 text-5xl font-bold text-white">{predicted_score}</p>

      <span
        className={`mt-4 inline-block rounded-full border px-4 py-1 text-sm font-medium ${badgeClass}`}
      >
        {performance_category}
      </span>

      <p className="mt-4 text-sm text-slate-400">
        Based on attendance, assignments, quizzes, exams, and study habits.
      </p>
    </div>
  );
};

export default PredictionResult;
