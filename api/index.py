import sys
import os

# Make project root importable (for `app.*` modules)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router   # router has: POST /generate, GET /templates

# ── Vercel-specific app ────────────────────────────────────────────────────
# Vercel passes the FULL request path to this ASGI handler,
# so /api/generate arrives as /api/generate — router must be prefixed with /api.
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# All routes available at /api/generate, /api/templates, etc.
app.include_router(router, prefix="/api")

@app.get("/api")
def root():
    return {"status": "API running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}

# Vercel looks for this symbol
handler = app