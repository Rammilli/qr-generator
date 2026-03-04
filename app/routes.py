from fastapi import APIRouter, HTTPException
from fastapi.responses import Response, JSONResponse
from app.schemas import QRRequest
from app.services.qr_service import generate_qr_svg

router = APIRouter()

TEMPLATES = [
    {"id": "classic",  "name": "Classic",  "fgColor": "#000000", "bgColor": "#ffffff", "pattern": "squares", "frame": None,      "label": "SCAN ME"},
    {"id": "ocean",    "name": "Ocean",    "fgColor": "#0369a1", "bgColor": "#f0f9ff", "pattern": "dots",    "frame": "rounded", "label": "SCAN ME"},
    {"id": "forest",   "name": "Forest",   "fgColor": "#166534", "bgColor": "#f0fdf4", "pattern": "rounded", "frame": None,      "label": "SCAN ME"},
    {"id": "sunset",   "name": "Sunset",   "fgColor": "#9a3412", "bgColor": "#fff7ed", "pattern": "dots",    "frame": "scan",    "label": "SCAN ME"},
    {"id": "midnight", "name": "Midnight", "fgColor": "#e0e7ff", "bgColor": "#1e1b4b", "pattern": "squares", "frame": None,      "label": "SCAN ME"},
    {"id": "rose",     "name": "Rose",     "fgColor": "#881337", "bgColor": "#fff1f2", "pattern": "rounded", "frame": "rounded", "label": "SCAN ME"},
    {"id": "grape",    "name": "Grape",    "fgColor": "#581c87", "bgColor": "#faf5ff", "pattern": "dots",    "frame": None,      "label": "SCAN ME"},
    {"id": "slate",    "name": "Slate",    "fgColor": "#1e293b", "bgColor": "#f8fafc", "pattern": "squares", "frame": "scan",    "label": "SCAN ME"},
    {"id": "neon",     "name": "Neon",     "fgColor": "#00ff88", "bgColor": "#0a0a1a", "pattern": "dots",    "frame": None,      "label": "SCAN ME"},
]


@router.get("/templates")
def get_templates():
    return JSONResponse(content=TEMPLATES)


@router.post("/generate")
def generate_qr(request: QRRequest):
    if not request.data:
        raise HTTPException(status_code=400, detail="Data cannot be empty")

    try:
        qr_data = request.data

        if request.type == "vcard":
            qr_data = request.data  # already formatted by frontend

        svg = generate_qr_svg(
            data=qr_data,
            fill_color=request.fill_color,
            back_color=request.back_color,
            logo_base64=request.logo,
            frame=request.frame,
            frame_label=request.frame_label,
            frame_label_font=request.frame_label_font,
            frame_label_color=request.frame_label_color,
            logo_size=request.logo_size,
            qr_size=request.qr_size,
            pattern=request.pattern,
            error_correction=request.error_correction,
            quiet_zone=request.quiet_zone,
        )

        return Response(content=svg, media_type="image/svg+xml")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/download")
def download_qr(request: QRRequest):
    """Alias for /generate used for explicit download actions."""
    return generate_qr(request)