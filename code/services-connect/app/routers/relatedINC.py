from fastapi import APIRouter
import json


router = APIRouter()

@router.get("/relatedINC/", tags=["related-INC"])
def get_telemetry() -> dict:
    with open("../payloads/relatedINC.json", "r") as _in:
        return json.load(_in)

# Run the API using: uvicorn filename:app --reload
