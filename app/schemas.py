from pydantic import BaseModel
from typing import Optional


class QRRequest(BaseModel):
    data: str
    type: Optional[str] = "link"

    fill_color: Optional[str] = "#000000"
    back_color: Optional[str] = "#ffffff"

    # Gradient
    gradient_color: Optional[str] = None
    gradient_direction: Optional[str] = "horizontal"   # horizontal | vertical | diagonal

    logo: Optional[str] = None
    logo_size: Optional[int] = 25

    frame: Optional[str] = None
    frame_label: Optional[str] = "SCAN ME"
    frame_label_font: Optional[str] = "Arial"
    frame_label_color: Optional[str] = "#000000"
    frame_color: Optional[str] = None                  # border / fill color of the frame

    pattern: Optional[str] = "squares"
    error_correction: Optional[str] = "H"
    quiet_zone: Optional[int] = 4
    qr_size: Optional[int] = 300

    output_format: Optional[str] = "PNG"