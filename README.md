# AI-Based-Student-Grade-Prediction

AI-based Student Grade Prediction System.

---

## About

This project predicts a student's final score using a **Scikit-learn Linear Regression** model served via a **Flask REST API**, with a **React** + **Tailwind CSS** frontend.

Full-stack application that predicts a student's final score using **Scikit-learn Linear Regression**, a **Flask REST API**, and a **React** frontend with Tailwind CSS.

## Project structure

```
AI-based Student Grade Prediction System/
├── backend/
│   ├── app.py                 # Flask REST API
│   ├── train_model.py         # Train & save model with joblib
│   ├── requirements.txt
│   ├── data/
│   │   └── student_data.csv   # Training dataset
│   └── models/
│       └── grade_model.joblib # Generated after training
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── api/predictionApi.js
│   │   ├── components/
│   │   └── utils/validation.js
│   └── package.json
└── README.md
```

## Prerequisites

- Python 3.10+
- Node.js 18+

## Backend setup

```bash
cd backend
py -3 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python train_model.py
python app.py
```

> On Windows, use `py -3` if the `python` command is not on your PATH.

API runs at **http://localhost:5000**

## Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

App runs at **http://localhost:3000**

## API endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/health`  | Health check             |
| POST   | `/api/predict` | Predict final score      |

### Example request

```json
POST /api/predict
{
  "attendance": 85,
  "assignment": 78,
  "quiz": 80,
  "mid_exam": 75,
  "final_exam": 82,
  "study_hours": 3.5
}
```

### Example response

```json
{
  "success": true,
  "predicted_score": 79.45,
  "performance_category": "Good",
  "inputs": { ... }
}
```

## Performance categories

| Category  | Score range |
|-----------|-------------|
| Excellent | ≥ 85        |
| Good      | 75 – 84.99  |
| Average   | 60 – 74.99  |
| Poor      | < 60        |

## Tech stack

- **Frontend:** React, Tailwind CSS, Axios, Chart.js
- **Backend:** Flask, Flask-CORS, joblib
- **ML:** Scikit-learn Linear Regression
