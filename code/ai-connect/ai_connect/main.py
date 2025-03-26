import os
import json
from collections import deque
from pathlib import Path
from typing import Generator, Any
from fastapi import FastAPI, HTTPException, Request, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware
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

GPT_MODEL = "gpt-4o-mini-2024-07-18" # Change to "gpt-4" if available and desired.


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
    lifespan=lifespan,
    contact={
        "name": "Team Pragnya",
        "email": "sachink108@gmail.com",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
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
def add_incident_context(incident_id: str,
                         request: Request,
                         response: Response,
                         chat_session_id: str = Cookie(default=None)):
    """
    Fetch incident by ID, get context from vector DB, and generate a summary.
    Also stores the incident in memory per session.
    """
    with open("../payloads/incidents.json", "r") as _in:
        content = json.load(_in)
        incident = [
            inc for inc in content["incidents"] if inc["incident_id"] == incident_id
        ]
        incident_text = json.dumps(incident, indent=2)

        print(request)
        
        chat_session_id = str(uuid.uuid4())
        response.set_cookie(key=SESSION_COOKIE_NAME, value=chat_session_id)        
        
        ai_lib.last_incident_memory[chat_session_id] = incident_text

        try:
            context = ai_lib.retrieve_context(incident_text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error retrieving vector context: {e}")

    try:
        prompt = [
            {"role": "system", "content": "You work on incident resolution, you have to provide all questions asked to you in a readable format. Also analyse the impact based on the given data."},
            {"role": "system", "content": f"Relevant context from previous documents:\n{'\n'.join(context)}"},
            {"role": "user", "content": f"Given this incident data, generate a short summary:\n{incident_text}"}
        ]

        completion = openai.chat.completions.create(
            model=GPT_MODEL,
            messages=prompt,
            temperature=0.5
        )
        summary = completion.choices[0].message.content.strip()
        return {"incident_id": incident_id, "summary": summary, "session_id": chat_session_id}
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
    query = message_req.message.strip()  
    print(chat_session_id, request.cookies.get("chat_session_id"))
    # chat_session_id =
    if not chat_session_id:
        print('no chat session id')
        chat_session_id = str(uuid.uuid4())
        response.set_cookie(key=SESSION_COOKIE_NAME, value=chat_session_id)

    # Step 2: Create session history if new
    if chat_session_id not in session_memory:
        session_memory[chat_session_id] = deque(maxlen=MAX_HISTORY)

    conversation_history = session_memory[chat_session_id]
    print(conversation_history)

    # Step 3: Check for "clear"
    if query.lower() in ["clear", "reset", "start over"]:
        conversation_history.clear()
        ai_lib.last_incident_memory.pop(chat_session_id, None)
        print('clearing')
        return {"answer": "Memory cleared."}

    # Step 4: Retrieve context from documents
    try:
        context = ai_lib.retrieve_context(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Context error: {e}")

    context_str = "\n".join(context) or "No relevant context found."
    incident_str = ai_lib.last_incident_memory.get(chat_session_id, "No incident loaded yet.")
    # Step 5: Build message list for OpenAI
    # Ramu to edit this section to tweak the answers!!
    
    messages = list(conversation_history)
    messages.extend([
        {"role": "system", "content": "You are a helpful assistant. Use the incident data, document context and previous conversation to answer the user's questions."},
        {"role": "system", "content": f"Document Context:\n{context_str}"},
        {"role": "system", "content": f"Last Incident:\n{incident_str}"},
        {"role": "user", "content": query},
        
    ])
    

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
