from pydantic import BaseModel
from typing import Optional


class QRRequest(BaseModel):
    data: str
    fill_color: str = "#000000"
    back_color: str = "#FFFFFF"
    frame: Optional[str] = "square"
    logo: Optional[str] = None
    logo_size: Optional[int] = 40
    qr_size: Optional[int] = 300