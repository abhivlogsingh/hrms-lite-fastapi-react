from fastapi import FastAPI
from app.routes import employee, attendance

app = FastAPI(title="HRMS Lite API")


# root route
@app.get("/")
def read_root():
    return {"message": "FastAPI HRMS Server is running successfully 🚀"}


# include route files
app.include_router(employee.router)
app.include_router(attendance.router)
