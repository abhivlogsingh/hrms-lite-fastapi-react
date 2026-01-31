from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employee, attendance
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="HRMS Lite API")

origins = os.getenv("CORS_ORIGINS", "")
origins_list = [o.strip() for o in origins.split(",") if o]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI HRMS Server is running 🚀"}

app.include_router(employee.router)
app.include_router(attendance.router)
