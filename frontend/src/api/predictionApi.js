import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

/** POST student metrics and return predicted score + category */
export const predictGrade = async (studentData) => {
  const { data } = await api.post("/api/predict", studentData);
  return data;
};
