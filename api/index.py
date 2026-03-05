import sys
import os

# Ensure the project root is on the Python path so `app.*` imports resolve
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app  # noqa: E402 — re‑export the existing FastAPI app

# Vercel looks for a symbol named `handler` (or just the ASGI app)
handler = app