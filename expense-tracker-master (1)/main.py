from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import pyodbc
from statsmodels.tsa.arima.model import ARIMA
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Database configuration
DB_CONFIG = {
    "server": "localhost",
    "database": "expense_tracker",
    "user": "anjala",
    "password": "Anjala@4500"
}

# Connect to database function
def get_db_connection():
    try:
        conn = pyodbc.connect(
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={DB_CONFIG['server']};"
            f"DATABASE={DB_CONFIG['database']};"
            f"UID={DB_CONFIG['user']};"
            f"PWD={DB_CONFIG['password']}"
        )
        return conn
    except Exception as e:
        logging.error(f"Database Connection Error: {e}")
        return None

# Request Model
class PredictionRequest(BaseModel):
    goal_amount: float  # User-defined savings goal

# Response Model
class PredictionResponse(BaseModel):
    predicted_expenses: List[float]
    required_saving: float
    net_saving: List[float]

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        conn = get_db_connection()
        if not conn:
            raise HTTPException(status_code=500, detail="Database connection failed.")

        # Fetch expenses
        query = "SELECT expense_date, expense_amount FROM dbo.expense WHERE income_expense = 'Expense';"
        df = pd.read_sql(query, conn)
        conn.close()

        if df.empty:
            raise HTTPException(status_code=404, detail="No expense data found.")

        # Process data
        df.rename(columns={'expense_date': 'Date', 'expense_amount': 'Amount'}, inplace=True)
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df.dropna(subset=['Date', 'Amount'], inplace=True)

        # Aggregate monthly expenses
        df['Month'] = df['Date'].dt.to_period('M')
        monthly_expenses = df.groupby('Month')['Amount'].sum()
        monthly_expenses.index = monthly_expenses.index.to_timestamp()

        if monthly_expenses.empty:
            raise HTTPException(status_code=404, detail="No valid monthly data for prediction.")

        # Train ARIMA model
        model = ARIMA(monthly_expenses, order=(1, 1, 1))  # Optimized ARIMA order
        fitted_model = model.fit()

        # Forecast for 3 years (36 months) instead of 7 years to reduce memory load
        forecast_months = 3 * 12
        forecast = fitted_model.forecast(steps=forecast_months)

        # Savings calculation
        goal_amount = request.goal_amount
        required_monthly_saving = goal_amount / forecast_months
        predicted_expenses = pd.Series(forecast, index=pd.date_range(
            start=monthly_expenses.index[-1] + pd.offsets.MonthBegin(1),
            periods=forecast_months,
            freq='MS'
        ))

        # Net savings
        monthly_saving_plan = predicted_expenses - required_monthly_saving

        return PredictionResponse(
            predicted_expenses=predicted_expenses.round(0).tolist(),
            required_saving=round(required_monthly_saving, 0),
            net_saving=monthly_saving_plan.round(0).tolist()
        )

    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


