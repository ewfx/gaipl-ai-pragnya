from fastapi import APIRouter
import json

# ✅ Initialize API router for CMDB (Configuration Management Database)
router = APIRouter()

@router.get("/conf-items/", tags=["CI Management DB"])
def get_configuration_items() -> dict:
    """
    Retrieves a list of configuration items from a JSON file.

    Returns:
        dict: A dictionary containing configuration items.
    """
    with open("../payloads/configuration_item.json", "r") as _in:
        return json.load(_in)

@router.get("/dependency-map/", tags=["CI Management DB"])
def get_dependency_map() -> dict:
    """
    Retrieves a dependency map of configuration items from a JSON file.

    Returns:
        dict: A dictionary containing CI relationships.
    """
    with open("../payloads/ci_relationship.json", "r") as _in:
        return json.load(_in)

# ✅ Run the API using: uvicorn filename:app --reload
