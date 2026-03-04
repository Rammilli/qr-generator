from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.schemas import QRRequest
from app.services.qr_service import generate_qr_svg

router = APIRouter()


@router.post("/generate")
def generate_qr(request: QRRequest):

    # Validate input
    if not request.data:
        raise HTTPException(
            status_code=400,
            detail="Data cannot be empty"
        )

    try:

        # -------------------------
        # Handle different QR types
        # -------------------------

        qr_data = request.data

        if request.type == "text":
            qr_data = request.data

        elif request.type == "link":
            qr_data = request.data

        elif request.type == "vcard":

            qr_data = f"""
BEGIN:VCARD
VERSION:3.0
FN:{request.data}
END:VCARD
"""

        elif request.type == "pdf":
            qr_data = request.data


        # -------------------------
        # Generate QR
        # -------------------------

        svg = generate_qr_svg(
            data=qr_data,
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
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )