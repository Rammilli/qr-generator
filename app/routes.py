from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.schemas import QRRequest
from app.services.qr_service import generate_qr_svg

router = APIRouter()


@router.post("/generate")
def generate_qr(request: QRRequest):

    if not request.data:
        raise HTTPException(status_code=400, detail="Data cannot be empty")

    try:
        svg = generate_qr_svg(
            data=request.data,
            fill_color=request.fill_color,
            back_color=request.back_color,
            logo_base64=request.logo,
            frame=request.frame,
            logo_size=request.logo_size,
            qr_size=request.qr_size
        )

        return Response(
            content=svg,
            media_type="image/svg+xml"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))