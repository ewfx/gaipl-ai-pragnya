import os
import json
from collections import deque
from pathlib import Path
from typing import Generator, Any
from fastapi import FastAPI, HTTPException, Request, Response, Cookie
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import openai
import uuid

from contextlib import asynccontextmanager

from dotenv import load_dotenv
from . import ai_lib

load_dotenv()

class MessageRequest(BaseModel):
    message: str

# Set your OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise Exception("Please set your OpenAI API key in the OPENAI_API_KEY environment variable.")

GPT_MODEL = "gpt-4o-mini" # Change to "gpt-4" if available and desired.


def lifespan(app: FastAPI):
    kb_path = Path("../payloads")
    print(f"🚀 Loading KB documents from : {kb_path}")

    loaded = 0
    for file_path in kb_path.glob("knowledge_base*.json"):
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
            if text.strip():
                embedding = ai_lib.get_embedding(text)
                ai_lib.vector_store.append({"content": text, "embedding": embedding})
            loaded += 1
    print(f"✅ Loaded {loaded} documents into vector store.")
    yield
    print("Exiting lifespan events")

app = FastAPI(
    title="AI-Connect",
    version="0.1.0",
    description="This services is responsible for"
    " building Vector Databases that establish the a specific Context."
    " This Context, coupled with the user queries are combined and fed"
    " into the LLM to generate answers",
    lifespan=lifespan
)

# Globals
# Example: simple conversation memory
# Global in-memory chat history (for all users for now — can be made per-session)
conversation_history = deque(maxlen=20)  # keep last 20 messages

# In-memory session store (session_id: [chat_history])
session_memory = {}

SESSION_COOKIE_NAME = "chat_session_id"
MAX_HISTORY = 20

@app.post("/ai-connect/incident/{incident_id}", tags=["AI Connect"])
def add_incident_context(incident_id: str):
    """
    Fetch incident by ID, get context from vector DB, and generate a summary.
    """
    with open("../payloads/incidents.json", "r") as _in:
        content = json.load(_in)
        incident = [
            inc for inc in content["incidents"] if inc["incident_id"] == incident_id
        ]
        incident_text = json.dumps(incident, indent=2)
        try:
            context = ai_lib.retrieve_context(incident_text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving vector context: {e}")

    try:
        prompt = [
            {"role": "system", "content": "You are an incident summarizer."},
            {"role": "system", "content": f"Relevant context from previous documents:\n{'\n'.join(context)}"},
            {"role": "user", "content": f"Given this incident data, generate a short summary:\n{incident_text}"}
        ]

        completion = openai.chat.completions.create(
            model=GPT_MODEL,
            messages=prompt,
            temperature=0.5
        )
        summary = completion.choices[0].message.content.strip()
        return {"incident_id": incident_id, "summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing: {e}")


@app.post("/ai-connect/message", 
          summary="Send Message", 
          description="Send a query message and get an answer based on the document context.",
          tags=["AI Connect"])
async def process_message(
    request: Request,
    response: Response,
    message_req: MessageRequest,
    chat_session_id: str = Cookie(default=None)
):
    # Step 1: Assign session ID
    if not chat_session_id:
        chat_session_id = str(uuid.uuid4())
        response.set_cookie(key=SESSION_COOKIE_NAME, value=chat_session_id)

    # Step 2: Create session history if new
    if chat_session_id not in session_memory:
        session_memory[chat_session_id] = deque(maxlen=MAX_HISTORY)

    conversation_history = session_memory[chat_session_id]
    query = message_req.message.strip()

    # Step 3: Check for "clear"
    if query.lower() in ["clear", "reset", "start over"]:
        conversation_history.clear()
        return {"answer": "Memory cleared for your session!"}

    # Step 4: Retrieve context from documents
    try:
        context = ai_lib.retrieve_context(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving context: {e}")

    context_str = "\n".join(context) if context else "No document context available."

    # Step 5: Build message list for OpenAI
    # Ramu to edit this section to tweak the answers!!
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Use the document context and previous conversation to answer the user."},
        {"role": "system", "content": f"Document context:\n{context_str}"}
    ]
    messages.extend(conversation_history)
    messages.append({"role": "user", "content": query})

    # Step 6: Call OpenAI
    try:
        response_openai = openai.chat.completions.create(
            model=GPT_MODEL,
            messages=messages,
            temperature=0.7
        )
        answer = response_openai.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling OpenAI ChatCompletion: {e}")

    # Step 7: Store history
    conversation_history.append({"role": "user", "content": query})
    conversation_history.append({"role": "assistant", "content": answer})

    return {"answer": answer}


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("./docs")


# @app.get("/")
# def home():
#     return {"message": "AI-Pragnya is ready!"}
