import asyncio
import websockets

async def test_ws():
    uri = "ws://127.0.0.1:9000/ws/karthik"
    print("Connecting to AI-Pragnya")
    
    async with websockets.connect(uri) as websocket:
        print("Connected...!")
        print("Enter 'bye' to quit.")
        
        while True:
            user_input = input("$> ")
            if user_input == 'bye':
                break
            await websocket.send(user_input)
            response = await websocket.recv()
            print(" ", response)

asyncio.run(test_ws())
