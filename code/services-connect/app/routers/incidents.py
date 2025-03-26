from fastapi import APIRouter
import json


router = APIRouter()

@router.get("/incidents/", tags=["Incidents"])
def get_incidents() -> dict:
    with open("../payloads/incidents.json", "r") as _in:
        return json.load(_in)

@router.get("/incidents/{incident_id}/related", tags=["Incidents"])
def get_related_incidents(incident_id:str) -> dict:
    with open("../payloads/relatedINC.json", "r") as _in:
        return json.load(_in)

# Run the API using: uvicorn filename:app --reload
