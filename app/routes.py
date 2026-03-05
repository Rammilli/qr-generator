from fastapi import APIRouter, HTTPException
from fastapi.responses import Response, JSONResponse
from app.schemas import QRRequest
from app.services.qr_service import generate_qr_svg

router = APIRouter()

TEMPLATES = [
    # ── Social ────────────────────────────────────────────────────────────
    {"id": "whatsapp",   "name": "WhatsApp",   "group": "Social",   "fgColor": "#128C7E", "bgColor": "#ffffff", "pattern": "dots",    "frame": "badge",   "label": "WhatsApp",   "frameLabelColor": "#128C7E", "gradientColor": None},
    {"id": "instagram",  "name": "Instagram",  "group": "Social",   "fgColor": "#833AB4", "bgColor": "#ffffff", "pattern": "rounded", "frame": "rounded", "label": "Follow Us",  "frameLabelColor": "#833AB4", "gradientColor": "#F77737"},
    {"id": "tiktok",     "name": "TikTok",     "group": "Social",   "fgColor": "#010101", "bgColor": "#ffffff", "pattern": "dots",    "frame": "badge",   "label": "Follow Me",  "frameLabelColor": "#010101", "gradientColor": None},
    {"id": "youtube",    "name": "YouTube",    "group": "Social",   "fgColor": "#FF0000", "bgColor": "#ffffff", "pattern": "squares", "frame": "badge",   "label": "Subscribe",  "frameLabelColor": "#FF0000", "gradientColor": None},
    {"id": "twitter",    "name": "X / Twitter","group": "Social",   "fgColor": "#000000", "bgColor": "#ffffff", "pattern": "rounded", "frame": "scan",    "label": "Follow Us",  "frameLabelColor": "#000000", "gradientColor": None},
    {"id": "linkedin",   "name": "LinkedIn",   "group": "Social",   "fgColor": "#0A66C2", "bgColor": "#ffffff", "pattern": "rounded", "frame": "border",  "label": "Connect",    "frameLabelColor": "#0A66C2", "gradientColor": None},
    {"id": "facebook",   "name": "Facebook",   "group": "Social",   "fgColor": "#1877F2", "bgColor": "#ffffff", "pattern": "dots",    "frame": "scan",    "label": "Like Us",    "frameLabelColor": "#1877F2", "gradientColor": None},
    {"id": "github",     "name": "GitHub",     "group": "Social",   "fgColor": "#181717", "bgColor": "#f6f8fa", "pattern": "squares", "frame": "shadow",  "label": "View Code",  "frameLabelColor": "#181717", "gradientColor": None},

    # ── Brand ─────────────────────────────────────────────────────────────
    {"id": "spotify",    "name": "Spotify",    "group": "Brand",    "fgColor": "#1DB954", "bgColor": "#191414", "pattern": "dots",    "frame": "rounded", "label": "Listen Now", "frameLabelColor": "#1DB954", "gradientColor": None},
    {"id": "netflix",    "name": "Netflix",    "group": "Brand",    "fgColor": "#E50914", "bgColor": "#141414", "pattern": "squares", "frame": "badge",   "label": "Watch Now",  "frameLabelColor": "#E50914", "gradientColor": None},
    {"id": "paypal",     "name": "PayPal",     "group": "Brand",    "fgColor": "#003087", "bgColor": "#ffffff", "pattern": "rounded", "frame": "border",  "label": "Pay Now",    "frameLabelColor": "#003087", "gradientColor": "#009CDE"},
    {"id": "amazon",     "name": "Amazon",     "group": "Brand",    "fgColor": "#FF9900", "bgColor": "#ffffff", "pattern": "squares", "frame": "badge",   "label": "Shop Now",   "frameLabelColor": "#FF9900", "gradientColor": None},

    # ── Business ──────────────────────────────────────────────────────────
    {"id": "wifi",       "name": "WiFi",       "group": "Business", "fgColor": "#0ea5e9", "bgColor": "#f0f9ff", "pattern": "dots",    "frame": "scan",    "label": "Connect",    "frameLabelColor": "#0ea5e9", "gradientColor": None},
    {"id": "download",   "name": "Download",   "group": "Business", "fgColor": "#7c3aed", "bgColor": "#faf5ff", "pattern": "rounded", "frame": "badge",   "label": "Download",   "frameLabelColor": "#7c3aed", "gradientColor": "#6366f1"},
    {"id": "menu",       "name": "Menu",       "group": "Business", "fgColor": "#b45309", "bgColor": "#fffbeb", "pattern": "dots",    "frame": "scan",    "label": "View Menu",  "frameLabelColor": "#b45309", "gradientColor": None},
    {"id": "payment",    "name": "Pay",        "group": "Business", "fgColor": "#059669", "bgColor": "#ecfdf5", "pattern": "squares", "frame": "badge",   "label": "Pay Now",    "frameLabelColor": "#059669", "gradientColor": None},
    {"id": "vcard",      "name": "Contact",    "group": "Business", "fgColor": "#1e293b", "bgColor": "#f8fafc", "pattern": "rounded", "frame": "border",  "label": "Contact Me", "frameLabelColor": "#1e293b", "gradientColor": None},
    {"id": "review",     "name": "Review",     "group": "Business", "fgColor": "#d97706", "bgColor": "#fffbeb", "pattern": "dots",    "frame": "badge",   "label": "Rate Us",    "frameLabelColor": "#d97706", "gradientColor": None},

    # ── Color Themes ──────────────────────────────────────────────────────
    {"id": "ocean",      "name": "Ocean",      "group": "Theme",    "fgColor": "#0369a1", "bgColor": "#f0f9ff", "pattern": "dots",    "frame": "rounded", "label": "SCAN ME",    "frameLabelColor": "#0369a1", "gradientColor": "#06b6d4"},
    {"id": "sunset",     "name": "Sunset",     "group": "Theme",    "fgColor": "#ea580c", "bgColor": "#fff7ed", "pattern": "dots",    "frame": "scan",    "label": "SCAN ME",    "frameLabelColor": "#ea580c", "gradientColor": "#f59e0b"},
    {"id": "midnight",   "name": "Midnight",   "group": "Theme",    "fgColor": "#818cf8", "bgColor": "#1e1b4b", "pattern": "dots",    "frame": None,      "label": "SCAN ME",    "frameLabelColor": "#818cf8", "gradientColor": "#06b6d4"},
    {"id": "neon",       "name": "Neon",       "group": "Theme",    "fgColor": "#00ff88", "bgColor": "#0a0a1a", "pattern": "dots",    "frame": None,      "label": "SCAN ME",    "frameLabelColor": "#00ff88", "gradientColor": "#00ccff"},
    {"id": "rose",       "name": "Rose",       "group": "Theme",    "fgColor": "#e11d48", "bgColor": "#fff1f2", "pattern": "rounded", "frame": "rounded", "label": "SCAN ME",    "frameLabelColor": "#e11d48", "gradientColor": None},
    {"id": "grape",      "name": "Grape",      "group": "Theme",    "fgColor": "#7c3aed", "bgColor": "#faf5ff", "pattern": "dots",    "frame": None,      "label": "SCAN ME",    "frameLabelColor": "#7c3aed", "gradientColor": "#ec4899"},
]


@router.get("/templates")
def get_templates():
    return JSONResponse(content=TEMPLATES)


@router.post("/generate")
def generate_qr(request: QRRequest):
    if not request.data:
        raise HTTPException(status_code=400, detail="Data cannot be empty")

    try:
        svg = generate_qr_svg(
            data=request.data,
            fill_color=request.fill_color,
            back_color=request.back_color,
            gradient_color=request.gradient_color,
            gradient_direction=request.gradient_direction,
            logo_base64=request.logo,
            frame=request.frame,
            frame_label=request.frame_label,
            frame_label_font=request.frame_label_font,
            frame_label_color=request.frame_label_color,
            frame_color=request.frame_color,
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