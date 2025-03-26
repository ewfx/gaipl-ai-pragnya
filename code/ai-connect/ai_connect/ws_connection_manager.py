from fastapi import WebSocket, WebSocketDisconnect
from typing import List

class ConnectionManager:
    """
    Manages active WebSocket connections.
    
    Attributes:
        active_connections (List[WebSocket]): List of currently connected WebSocket clients.
    """

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        """
        Accepts and adds a new WebSocket connection.

        Args:
            websocket (WebSocket): The WebSocket connection to be added.
        """
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        """
        Removes a WebSocket connection from the active list.

        Args:
            websocket (WebSocket): The WebSocket connection to be removed.
        """
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        """
        Sends a message to all connected WebSocket clients.

        Args:
            message (str): The message to broadcast.
        """
        for connection in self.active_connections:
            await connection.send_text(message)
