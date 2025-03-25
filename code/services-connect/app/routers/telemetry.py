from fastapi import APIRouter
import json


router = APIRouter()

@router.get("/telemetry/", tags=["Telemetry"])
def get_telemetry() -> dict:
    with open("../payloads/telemetry.json", "r") as _in:
        return json.load(_in)

# Run the API using: uvicorn filename:app --reload
