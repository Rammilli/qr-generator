import sys
import os

# Critical: add project root to Python path so `app.*` imports resolve on Vercel
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vercel passes the FULL path — /api/generate → must match /api prefix + /generate
app.include_router(router, prefix="/api")

@app.get("/api")
def root():
    return {"status": "API running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}