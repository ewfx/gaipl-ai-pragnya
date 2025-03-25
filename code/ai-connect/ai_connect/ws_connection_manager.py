from fastapi import WebSocket, WebSocketDisconnect
from typing import List


# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


    


# TODO: To use websockets enable this section
# from fastapi import WebSocket, WebSocketDisconnect
# from .ws_connection_manager import ConnectionManager
# manager = ConnectionManager()
# @app.websocket("/ws/{client_id}")
# async def websocket_endpoint(websocket: WebSocket, client_id: str):
#     await manager.connect(websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             message = f"AI-Pragnya:  {data}"
#             await manager.broadcast(message)  # Send message to all clients
#     except WebSocketDisconnect:
#         manager.disconnect(websocket)
#         await manager.broadcast(f"AI-Pragnya: Client {client_id} left the chat.")

