from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI()

# CORS — required for Render backend to accept Vercel frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Health check for Render keepalive (UptimeRobot pings this every 10 min)
@app.get("/health")
def health():
    return {"status": "ok"}