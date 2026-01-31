from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

client = MongoClient(MONGODB_URL)
db = client["hrms_db"]

employees_collection = db["employees"]
attendance_collection = db["attendance"]
