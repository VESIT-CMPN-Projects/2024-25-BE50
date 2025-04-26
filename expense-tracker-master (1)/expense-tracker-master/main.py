from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
import pickle

app = FastAPI()

# ✅ Load the saved model
MODEL_PATH = "expense_model.pkl"

try:
    with open(MODEL_PATH, "rb") as model_file:
        fitted_model = pickle.load(model_file)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    fitted_model = None

# ✅ Request Model
class PredictionRequest(BaseModel):
    goal_amount: float

# ✅ Response Model
class PredictionResponse(BaseModel):
    predicted_expenses: List[float]
    required_saving: float
    net_saving: List[float]

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        if fitted_model is None:
            raise HTTPException(status_code=500, detail="Model not loaded correctly.")

        # ✅ Forecast for 7 years (84 months)
        forecast_months = 7 * 12
        forecast = fitted_model.forecast(steps=forecast_months)

        # ✅ Generate predicted expenses
        predicted_expenses = pd.Series(
            forecast,
            index=pd.date_range(
                start=pd.Timestamp.today(),
                periods=forecast_months,
                freq='MS'
            )
        )

        # ✅ Fill NaN or infinite values with 0
        predicted_expenses = predicted_expenses.fillna(0).replace([np.inf, -np.inf], 0)

        # ✅ Financial calculations
        goal_amount = request.goal_amount
        required_monthly_saving = goal_amount / forecast_months
        monthly_saving_plan = predicted_expenses - required_monthly_saving
        monthly_saving_plan = monthly_saving_plan.fillna(0).replace([np.inf, -np.inf], 0)

        return PredictionResponse(
            predicted_expenses=predicted_expenses.round(0).tolist(),
            required_saving=round(required_monthly_saving, 0),
            net_saving=monthly_saving_plan.round(0).tolist()
        )
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        return {"error": f"Internal Server Error: {str(e)}"}
