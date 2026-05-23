import React from "react";

const FIELDS = [
  { name: "attendance", label: "Attendance %", type: "number", max: 100 },
  { name: "assignment", label: "Assignment Score", type: "number", max: 100 },
  { name: "quiz", label: "Quiz Score", type: "number", max: 100 },
  { name: "mid_exam", label: "Mid Exam Score", type: "number", max: 100 },
  { name: "final_exam", label: "Final Exam Score", type: "number", max: 100 },
  { name: "study_hours", label: "Study Hours / Day", type: "number", max: 24 },
];

const StudentForm = ({ form, errors, loading, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
    >
      <h2 className="mb-6 text-xl font-semibold text-white">Student Details</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ name, label, type, max }) => (
          <div key={name}>
            <label className="mb-1 block text-sm text-slate-400">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={onChange}
              min="0"
              max={max}
              step={name === "study_hours" ? "0.5" : "1"}
              className={`w-full rounded-lg border bg-slate-950 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500 ${
                errors[name] ? "border-rose-500" : "border-slate-700"
              }`}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-rose-400">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict Final Score"}
      </button>
    </form>
  );
};

export default StudentForm;
