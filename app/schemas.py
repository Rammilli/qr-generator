from pydantic import BaseModel
from typing import Optional


class QRRequest(BaseModel):

    data: str
    type: Optional[str] = "link"

    fill_color: Optional[str] = "black"
    back_color: Optional[str] = "white"

    logo: Optional[str] = None
    frame: Optional[str] = None

    logo_size: Optional[int] = 40
    qr_size: Optional[int] = 300