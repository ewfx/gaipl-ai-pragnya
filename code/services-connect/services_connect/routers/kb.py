from fastapi import APIRouter
import json

# ✅ Initialize API router for Knowledge Base
router = APIRouter()

@router.get("/kb/", response_model=dict, tags=["Knowledge Base Articles"])
def get_kb_articles() -> dict:
    """
    Retrieves a list of knowledge base articles from a JSON file.

    Returns:
        dict: A dictionary containing knowledge base articles.
    """
    with open("../payloads/knowledge_base.json", "r") as _kb:
        return json.load(_kb)
