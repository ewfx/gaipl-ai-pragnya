from fastapi import APIRouter
from typing import List


import json

router = APIRouter()


@router.get("/kb/", response_model=dict, tags=["Knowledge Base Articles"])
def get_kb_articles() -> dict:
    
    with open("../payloads/knowledge_base.json", "r") as _kb:
        return json.load(_kb)

