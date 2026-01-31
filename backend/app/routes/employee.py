from fastapi import APIRouter, HTTPException
from app.database import employees_collection
from app.schemas.employee import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/")
def add_employee(emp: EmployeeCreate):
    # check unique employee_id or email
    existing = employees_collection.find_one({
        "$or": [
            {"employee_id": emp.employee_id},
            {"email": emp.email}
        ]
    })

    if existing:
        raise HTTPException(status_code=400, detail="Employee ID or Email already exists")

    employees_collection.insert_one(emp.dict())
    return {"message": "Employee added successfully"}


@router.get("/")
def get_employees():
    employees = list(employees_collection.find({}, {"_id": 0}))
    return employees


@router.delete("/{employee_id}")
def delete_employee(employee_id: str):
    result = employees_collection.delete_one({"employee_id": employee_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted successfully"}
