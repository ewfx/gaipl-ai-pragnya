import openai
import numpy as np
from typing import List

# In-memory vector store: each item is a dictionary with "content" and "embedding"
vector_store = []
last_incident_memory = {}

def get_embedding(text: str) -> np.ndarray:
    """
    Generates an embedding for the given text using OpenAI's text-embedding-ada-002 model.

    Args:
        text (str): The input text for which the embedding is generated.

    Returns:
        np.ndarray: The numerical embedding representation of the input text.
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
    Computes the cosine similarity between two vector embeddings.

    Args:
        query_embedding (np.ndarray): The embedding of the query text.
        doc_embedding (np.ndarray): The embedding of a stored document.

    Returns:
        float: The cosine similarity score.
    """
    if np.linalg.norm(query_embedding) == 0 or np.linalg.norm(doc_embedding) == 0:
        return 0.0
    return float(np.dot(query_embedding, doc_embedding) / (np.linalg.norm(query_embedding) * np.linalg.norm(doc_embedding)))

def retrieve_context(query: str, top_k: int = 3) -> List[str]:
    """
    Retrieves the top_k most relevant document contents based on cosine similarity.

    Args:
        query (str): The input query to search relevant documents.
        top_k (int, optional): The number of top relevant documents to return. Defaults to 3.

    Returns:
        List[str]: A list of document contents ranked by relevance.
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
