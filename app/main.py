from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(title="QRCraft API", version="1.0.0")

# CORS — allow all origins so Vercel frontend can reach Render backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# ── Health check — keeps Render free tier awake via UptimeRobot ────────────
@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}