from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from fastapi.middleware.cors import CORSMiddleware

from .routers import incidents, kb, cmdb, telemetry





api = FastAPI(title="Integrated Platform Management Services API", 
              description="This API provides a Unified Interface to multiple services"
              " such as Monitoring and Metrics, CMDB, ServiceNow, and most importantly "
              "the GenAI learning and prediction services.",
              version="0.1.0",
              authors="Team Pragnya")

api.include_router(incidents.router)
api.include_router(kb.router)
api.include_router(cmdb.router)
api.include_router(telemetry.router)

# ✅ Configure CORS policy
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@api.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("./docs")

