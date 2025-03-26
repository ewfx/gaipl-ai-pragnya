from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .routers import incidents, kb, cmdb, telemetry

# ✅ Initialize FastAPI application
api = FastAPI(
    title="Integrated Platform Management - Services API",
    description=(
        "This API provides a Unified Interface to multiple services "
        "such as Monitoring and Metrics, CMDB, ServiceNow, and Telemetry."
    ),
    version="0.1.0",
    contact={
        "name": "Team Pragnya",
        "email": "sachink108@gmail.com",
    },
)

# ✅ Register API routers
api.include_router(incidents.router)  # Routes for incident management
api.include_router(kb.router)         # Routes for knowledge base management
api.include_router(cmdb.router)       # Routes for CMDB (Configuration Management Database)
api.include_router(telemetry.router)  # Routes for telemetry and monitoring

# ✅ Configure CORS policy
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (should be restricted in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@api.get("/", include_in_schema=False)
async def root():
    """
    Redirects the root URL ("/") to the API documentation.
    
    Returns:
        RedirectResponse: Redirects to the FastAPI Swagger UI (`/docs`).
    """
    return RedirectResponse("./docs")
