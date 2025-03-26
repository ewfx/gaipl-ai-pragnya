from fastapi import APIRouter
import json


router = APIRouter()

@router.get("/conf-items/", tags=["CI Management DB"])
def get_configuation_items() -> dict:
    with open("../payloads/configuration_item.json", "r") as _in:
        return json.load(_in)


@router.get("/dependency-map/", tags=["CI Management DB"])
def get_dependency_map() -> dict:
    with open("../payloads/ci_relationship.json", "r") as _in:
        return json.load(_in)

# Run the API using: uvicorn filename:app --reload
