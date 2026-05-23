import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import PredictionResult from "./components/PredictionResult";
import PerformanceChart from "./components/PerformanceChart";
import { predictGrade } from "./api/predictionApi";
import { validateForm } from "./utils/validation";

const initialForm = {
  attendance: "",
  assignment: "",
  quiz: "",
  mid_exam: "",
  final_exam: "",
  study_hours: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, Number(v)])
    );

    setLoading(true);
    try {
      const data = await predictGrade(payload);
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).join(", ")
        : err.response?.data?.message ||
          "Prediction failed. Is the Flask API running on port 5000?";
      setApiError(msg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            AI Student Grade Prediction
          </h1>
          <p className="mt-1 text-slate-400">
            Linear Regression · Flask · React
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {apiError && (
          <div className="mb-6 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-rose-300">
            {apiError}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <StudentForm
            form={form}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <PredictionResult result={result} />
        </div>

        {result?.inputs && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-slate-300">
              Performance Analysis
            </h2>
            <PerformanceChart
              inputs={result.inputs}
              predictedScore={result.predicted_score}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
