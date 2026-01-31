from fastapi import APIRouter, HTTPException
from app.database import attendance_collection, employees_collection
from app.schemas.attendance import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/")
def mark_attendance(att: AttendanceCreate):
    # 1. check if employee exists
    emp = employees_collection.find_one({"employee_id": att.employee_id})
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 2. convert date to string for MongoDB
    attendance_data = att.dict()
    attendance_data["date"] = attendance_data["date"].isoformat()

    # 3. check duplicate attendance for same employee & date
    existing = attendance_collection.find_one({
        "employee_id": attendance_data["employee_id"],
        "date": attendance_data["date"]
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee on this date"
        )

    # 4. insert into MongoDB
    attendance_collection.insert_one(attendance_data)

    return {"message": "Attendance marked successfully"}


@router.get("/")
def get_attendance():
    records = list(attendance_collection.find({}, {"_id": 0}))

    result = []
    for rec in records:
        emp = employees_collection.find_one(
            {"employee_id": rec["employee_id"]},
            {"_id": 0, "full_name": 1}
        )

        rec["full_name"] = emp["full_name"] if emp else None
        result.append(rec)

    return result


@router.get("/{employee_id}")
def get_attendance_by_employee(employee_id: str):
    records = list(
        attendance_collection.find(
            {"employee_id": employee_id},
            {"_id": 0}
        )
    )

    emp = employees_collection.find_one(
        {"employee_id": employee_id},
        {"_id": 0, "full_name": 1}
    )

    full_name = emp["full_name"] if emp else None

    for rec in records:
        rec["full_name"] = full_name

    return records
