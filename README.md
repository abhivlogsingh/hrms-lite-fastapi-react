HRMS Lite – FastAPI + React

#Project Overview

HRMS Lite ek simple Human Resource Management System (HRMS) hai jo employees aur unki attendance ko manage karta hai.
Is project ka aim hai:

1. Employees ko add, list aur delete karna
2. Attendance record manage karna
3. Frontend (React) aur Backend (FastAPI) ke beech REST API communication
4. MongoDB database ke saath data persist karna
5. Frontend React par bana hai aur Backend FastAPI par, jise RESTful APIs ke through connect kiya gaya hai.

Tech Stack Used

🔹 Frontend

React (Vite)
Axios (API calls ke liye)
CSS / Tailwind (UI ke liye)

🔹 Backend

FastAPI (Python)
Uvicorn (ASGI server)
Pydantic (data validation)
PyMongo (MongoDB connection)

🔹 Database

MongoDB (NoSQL Database)




##
##


Backend Setup (FastAPI)

🔹 Go to backend folder
cd backend

🔹 Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows

🔹 Install dependencies
pip install -r requirements.txt

🔹 Run backend server
uvicorn app.main:app --reload


🔹 Backend will start at:
http://127.0.0.1:8000



##

Frontend Setup (React)


🔹 Go to frontend folder
cd frontend

🔹 Install dependencies
npm install

🔹 Create .env file in frontend folder
VITE_API_BASE_URL=http://127.0.0.1:8000

🔹 Run frontend server
npm run dev


Frontend will start at:
http://localhost:5173