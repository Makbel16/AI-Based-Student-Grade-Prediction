"""
Train Linear Regression model on student dataset and save with joblib.
Run once before starting the API: python train_model.py
"""
import os
import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

DATA_PATH = os.path.join("data", "student_data.csv")
MODEL_PATH = os.path.join("models", "grade_model.joblib")

FEATURE_COLUMNS = [
    "attendance",
    "assignment",
    "quiz",
    "mid_exam",
    "final_exam",
    "study_hours",
]
TARGET_COLUMN = "final_score"


def load_dataset(path: str) -> pd.DataFrame:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Dataset not found: {path}")
    return pd.read_csv(path)


def train_and_save():
    os.makedirs("models", exist_ok=True)

    df = load_dataset(DATA_PATH)
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)

    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")
    print(f"Test MAE: {mae:.2f}")
    print(f"Test R²: {r2:.4f}")


if __name__ == "__main__":
    train_and_save()
