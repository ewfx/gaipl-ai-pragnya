import json
from typing import Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from fastapi.responses import RedirectResponse

from .ws_connection_manager import ConnectionManager

app = FastAPI(
    title="AI-Connect",
    version="0.1.0",
    description="This services is responsible for "
    "building Vector Databases that establish the a specific Context."
    " This Context, coupled with the user queries are combined and fed"
    " into the LLM to generate answers",
)

# Global
manager = ConnectionManager()

# A dictionary of vector databases
# for each incident -
# - a database is created when the incident is loaded
# - the database used when answering questions from the user
# - the database is destroyed when the incident is closed
# -   or the user navigates to another incident?
# - the context is no longer required
vector_db: dict[int, Any] = {}


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("./docs")


@app.post("/vector-db/incident/{incident_id}", tags=["Vector DB"])
def init_context(incident_id: int) -> str:
    """This endpoint should be called when a new
    incident is selected by the service desk engineer
    The id of the incident is passed to this endpoint.
    This endpoint fetches the details of the incident from the
    services-connect API and initialiezes the vectorDB
    """
    # initialize the VectorDB object here
    with open("../payloads/incidents.json", "r") as _in:
        content = json.load(_in)
        incident = [
            inc for inc in content["incidents"] if inc["incident_id"] == incident_id
        ]
        # TODO: Barath use this incident

    return f"Vector DB for incident {incident_id} Initialized"

@app.put("/vector-db/incident/{incident_id}/kb/{kb_id}", tags=["Vector DB"])
def update_context(incident_id: int, kb_id: str) -> str:
    """This endpoint updates the Context (VectorDB) for the incident with the
    contents of the given KB article.
    This endpoint should be called when the incident is loaded and
    the KB article, for the incident, is determined.
    The KB article identified by the kb_id, will be fetched and
    """
    # find the KB article and update the context with it
    with open("../payloads/knowledge_base.json", "r") as _in:
        content = json.load(_in)
        kb = [kb for kb in content["knowledge_articles"] if kb["article_id"] == kb_id]
        # TODO: Barath use this KB article and update the Context
    
    return f"Vector DB for incident {incident_id} updated with KB article {kb_id}"

@app.delete("/vector-db/incident/{incident_id}", tags=["Vector DB"])
def delete_context(incident_id: int) -> str:
    """This endpoint deletes the context, i.e. the VectorDB
    associated with the given incident
    """
    # find the vdb from the vectorDB and delete it
    # TODO
    return f"Vector DB for incident {incident_id} deleted"

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = f"AI-Pragnya:  {data}"
            await manager.broadcast(message)  # Send message to all clients
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"AI-Pragnya: Client {client_id} left the chat.")


# @app.get("/")
# def home():
#     return {"message": "AI-Pragnya is ready!"}
