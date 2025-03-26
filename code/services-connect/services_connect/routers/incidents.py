from fastapi import APIRouter
import json

# ✅ Initialize API router for Incidents
router = APIRouter()

@router.get("/incidents/", tags=["Incidents"])
def get_incidents() -> dict:
    """
    Retrieves a list of all incidents from a JSON file.

    Returns:
        dict: A dictionary containing incident data.
    """
    with open("../payloads/incidents.json", "r") as _in:
        return json.load(_in)

@router.get("/incidents/{incident_id}/related", tags=["Incidents"])
def get_related_incidents(incident_id: str) -> dict:
    """
    Retrieves related incidents for a given incident ID from a JSON file.

    Args:
        incident_id (str): The unique identifier of the incident.

    Returns:
        dict: A dictionary containing related incident data.
    """
    with open("../payloads/relatedINC.json", "r") as _in:
        return json.load(_in)

# ✅ Run the API using: uvicorn filename:app --reload
