import openai
import numpy as np
from typing import List


# In-memory vector store: each item is a dict with keys "content" and "embedding"
vector_store = []
last_incident_memory = {}

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
