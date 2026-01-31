# MongoDB does not use SQLAlchemy models.
# This class is only for structure reference (optional).

class Attendance:
    def __init__(self, employee_id: str, date: str, status: str):
        self.employee_id = employee_id
        self.date = date
        self.status = status
