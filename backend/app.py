"""
Flask REST API for student grade prediction.
Endpoints:
  GET  /api/health
  POST /api/predict
"""
import os
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join("models", "grade_model.joblib")
FEATURE_KEYS = [
    "attendance",
    "assignment",
    "quiz",
    "mid_exam",
    "final_exam",
    "study_hours",
]

model = None


def load_model():
    global model
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"Model not found at {MODEL_PATH}. Run: python train_model.py"
        )
    model = joblib.load(MODEL_PATH)


def get_performance_category(score: float) -> str:
    """Map predicted score to performance label."""
    if score >= 85:
        return "Excellent"
    if score >= 75:
        return "Good"
    if score >= 60:
        return "Average"
    return "Poor"


def validate_payload(data: dict):
    errors = {}
    for key in FEATURE_KEYS:
        if key not in data:
            errors[key] = "This field is required."
            continue
        try:
            value = float(data[key])
        except (TypeError, ValueError):
            errors[key] = "Must be a valid number."
            continue

        if key == "study_hours":
            if value < 0 or value > 24:
                errors[key] = "Study hours must be between 0 and 24."
        else:
            if value < 0 or value > 100:
                errors[key] = "Score must be between 0 and 100."

    return errors


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    errors = validate_payload(data)
    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    features = [[float(data[k]) for k in FEATURE_KEYS]]
    prediction = float(model.predict(features)[0])
    prediction = round(max(0, min(100, prediction)), 2)

    category = get_performance_category(prediction)

    return jsonify({
        "success": True,
        "predicted_score": prediction,
        "performance_category": category,
        "inputs": {k: float(data[k]) for k in FEATURE_KEYS},
    })


if __name__ == "__main__":
    load_model()
    app.run(debug=True, host="0.0.0.0", port=5000)
