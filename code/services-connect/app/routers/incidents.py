from fastapi import APIRouter
import json


router = APIRouter()

@router.get("/incidents/", tags=["Incidents"])
def get_incidents() -> dict:
    with open("../payloads/incidents.json", "r") as _in:
        return json.load(_in)

# Run the API using: uvicorn filename:app --reload
