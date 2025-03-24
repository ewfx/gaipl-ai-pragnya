import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import openai
import os
import numpy as np
from dotenv import load_dotenv
from collections import deque
import uuid
from fastapi import FastAPI, Request, Response, Cookie
import glob
load_dotenv()


# Set your OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise Exception("Please set your OpenAI API key in the OPENAI_API_KEY environment variable.")

app = FastAPI(
    title="Document-Based Chat API",
    description="Upload documents to build context and then chat with a model that uses the document as context.",
    version="1.0.0"
)

# In-memory vector store: each item is a dict with keys "content" and "embedding"
vector_store = []

# Example: simple conversation memory
# Global in-memory chat history (for all users for now — can be made per-session)
conversation_history = deque(maxlen=20)  # keep last 20 messages

# In-memory session store (session_id: [chat_history])
session_memory = {}

SESSION_COOKIE_NAME = "chat_session_id"
MAX_HISTORY = 20

# --- Helper Functions ---

def get_embedding(text: str) -> np.ndarray:
    """
    Get the embedding of the provided text using OpenAI's text-embedding-ada-002 model.
    """
    try:
        response = openai.embeddings.create(
            input=text,
            model="text-embedding-ada-002"
        )
        embedding = response.data[0].embedding
        return np.array(embedding)
    except Exception as e:
        raise Exception(f"Error obtaining embedding: {e}")

def compute_cosine_similarity(query_embedding: np.ndarray, doc_embedding: np.ndarray) -> float:
    """
    Compute cosine similarity between two vectors.
    """
    if np.linalg.norm(query_embedding) == 0 or np.linalg.norm(doc_embedding) == 0:
        return 0.0
    return float(np.dot(query_embedding, doc_embedding) / (np.linalg.norm(query_embedding) * np.linalg.norm(doc_embedding)))

def retrieve_context(query: str, top_k: int = 3) -> List[str]:
    """
    Retrieve the top_k most relevant document contents based on cosine similarity.
    """
    if not vector_store:
        return []
    query_embedding = get_embedding(query)
    scored_items = [
        (compute_cosine_similarity(query_embedding, item["embedding"]), item["content"])
        for item in vector_store
    ]
    scored_items.sort(key=lambda x: x[0], reverse=True)
    return [content for score, content in scored_items[:top_k]]

# def openai_chat_completion(query: str, context: List[str]) -> str:
#     """
#     Call OpenAI's ChatCompletion API using the query and retrieved context.
#     """
#     context_str = "\n".join(context) if context else "No context available."
#     messages = [
#         {"role": "system", "content": "You are a helpful assistant. Use the provided context to answer the query."},
#         {"role": "system", "content": f"Context: {context_str}"},
#         {"role": "user", "content": query}
#     ]
#     try:
#         response = openai.chat.completions.create(
#             model="gpt-4o-mini",  # Change to "gpt-4" if available and desired.
#             messages=messages,
#             temperature=0.7,
#         )
#         answer = response.choices[0].message.content.strip()
#         return answer
#     except Exception as e:
#         raise Exception(f"Error calling OpenAI ChatCompletion: {e}")

# --- Request Models ---

class MessageRequest(BaseModel):
    message: str

# --- API Endpoints ---

@app.on_event("startup")
def load_documents_on_startup():
    folder_path = r"C:\Users\bbara\GenAI\Agents\FASTAPI\documents"  # <-- Ensure the path is correct and accessible
    print(f"🚀 Loading documents from: {folder_path}")

    txt_files = glob.glob(os.path.join(folder_path, "*.txt"))
    loaded = 0

    for file_path in txt_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
                if text.strip():
                    embedding = get_embedding(text)
                    vector_store.append({"content": text, "embedding": embedding})
                    loaded += 1
        except Exception as e:
            print(f"❌ Failed to load {file_path}: {e}")

    print(f"✅ Loaded {loaded} documents into vector store.")

@app.post("/api/upload", summary="Upload Document", description="Upload a document to be processed and stored in the vector store.")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a document file, compute its embedding via OpenAI, and store it in the in-memory vector store.
    """
    try:
        contents = await file.read()
        text = contents.decode("utf-8")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {e}")
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="Uploaded file is empty or contains only whitespace.")
    
    try:
        embedding = get_embedding(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    vector_store.append({
        "content": text,
        "embedding": embedding
    })
    
    return JSONResponse(status_code=200, content={"message": "Document uploaded and processed successfully."})

@app.post("/vector-db/incident/{incident_id}", tags=["Vector DB"])
def add_incident_context(incident_id: str):
    """
    Fetch incident by ID, get context from vector DB, and generate a summary.
    """
    try:
        with open("incidents.json", "r") as _in:
            content = json.load(_in)
            incident = next((inc for inc in content["incidents"] if str(inc["incident_id"]) == incident_id), None)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading incident file: {e}")

    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found.")

    incident_text = json.dumps(incident, indent=2)
    try:
        context = retrieve_context(incident_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving vector context: {e}")

    prompt = [
        {"role": "system", "content": "You are an incident summarizer."},
        {"role": "system", "content": f"Relevant context from previous documents:\n{'\n'.join(context)}"},
        {"role": "user", "content": f"Given this incident data, generate a short summary:\n{incident_text}"}
    ]

    try:
        completion = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=prompt,
            temperature=0.5
        )
        summary = completion.choices[0].message.content.strip()
        return {"incident_id": incident_id, "summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing: {e}")

@app.post("/api/message", summary="Send Message", description="Send a query message and get an answer based on the document context.")
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
        context = retrieve_context(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving context: {e}")

    context_str = "\n".join(context) if context else "No document context available."

    # Step 5: Build message list for OpenAI
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Use the document context and previous conversation to answer the user."},
        {"role": "system", "content": f"Document context:\n{context_str}"}
    ]
    messages.extend(conversation_history)
    messages.append({"role": "user", "content": query})

    # Step 6: Call OpenAI
    try:
        response_openai = openai.chat.completions.create(
            model="gpt-4o-mini",  # Change to "gpt-4" if available and desired.
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

@app.delete("/api/clear", summary="Clear Vector Store", description="Clear all stored documents from the vector store.")
async def clear_vector_store():
    """
    Clear the in-memory vector store.
    """
    vector_store.clear()
    return JSONResponse(status_code=200, content={"message": "Vector store cleared."})