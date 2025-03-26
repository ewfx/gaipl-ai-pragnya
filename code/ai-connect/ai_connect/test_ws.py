import asyncio
import websockets

async def test_ws():
    """
    Test function to interact with a WebSocket server.
    
    Connects to the WebSocket server, sends user messages, and receives responses.
    Type 'bye' to disconnect.
    """
    uri = "ws://127.0.0.1:9000/ws/karthik"
    print("Connecting to AI-Pragnya...")
    
    async with websockets.connect(uri) as websocket:
        print("Connected!")
        print("Enter 'bye' to quit.")
        
        while True:
            user_input = input("$> ")
            if user_input.lower() == 'bye':
                break
            await websocket.send(user_input)
            response = await websocket.recv()
            print(" ", response)

# Run the WebSocket test
asyncio.run(test_ws())
