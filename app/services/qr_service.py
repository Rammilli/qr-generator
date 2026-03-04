import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import (
    SquareModuleDrawer,
    GappedSquareModuleDrawer,
    CircleModuleDrawer,
    RoundedModuleDrawer,
    VerticalBarsDrawer,
    HorizontalBarsDrawer,
)
from PIL import Image, ImageFilter
import base64
import io


ERROR_CORRECTION_MAP = {
    "L": qrcode.constants.ERROR_CORRECT_L,
    "M": qrcode.constants.ERROR_CORRECT_M,
    "Q": qrcode.constants.ERROR_CORRECT_Q,
    "H": qrcode.constants.ERROR_CORRECT_H,
}

PATTERN_MAP = {
    "squares":  SquareModuleDrawer(),
    "dots":     CircleModuleDrawer(),
    "rounded":  RoundedModuleDrawer(),
    "diamond":  GappedSquareModuleDrawer(),
    "star":     VerticalBarsDrawer(),
    "fluid":    HorizontalBarsDrawer(),
}


def generate_qr_svg(
    data,
    fill_color="black",
    back_color="white",
    logo_base64=None,
    frame=None,
    frame_label="SCAN ME",
    frame_label_font="Arial",
    frame_label_color="#000000",
    logo_size=25,
    qr_size=300,
    pattern="squares",
    error_correction="H",
    quiet_zone=4,
):
    # ---------------------------
    # Error correction level
    # ---------------------------
    ec = ERROR_CORRECTION_MAP.get(error_correction, qrcode.constants.ERROR_CORRECT_H)

    # ---------------------------
    # Module drawer (pattern)
    # ---------------------------
    drawer = PATTERN_MAP.get(pattern, SquareModuleDrawer())

    # ---------------------------
    # Generate QR Code
    # ---------------------------
    qr = qrcode.QRCode(
        version=None,
        error_correction=ec,
        box_size=10,
        border=quiet_zone,
    )

    qr.add_data(data)
    qr.make(fit=True)

    try:
        img = qr.make_image(
            image_factory=StyledPilImage,
            module_drawer=drawer,
            fill_color=fill_color,
            back_color=back_color,
        ).convert("RGBA")
    except Exception:
        # Fallback to basic
        img = qr.make_image(
            fill_color=fill_color,
            back_color=back_color,
        ).convert("RGBA")

    img = img.resize((qr_size, qr_size), Image.LANCZOS)

    # ---------------------------
    # Logo overlay
    # ---------------------------
    if logo_base64:
        try:
            logo_data = base64.b64decode(logo_base64.split(",")[-1])
            logo = Image.open(io.BytesIO(logo_data)).convert("RGBA")

            qr_w, qr_h = img.size
            logo_pixel = int((logo_size / 100) * qr_w)
            logo = logo.resize((logo_pixel, logo_pixel), Image.LANCZOS)

            pos = (
                (qr_w - logo_pixel) // 2,
                (qr_h - logo_pixel) // 2,
            )
            img.paste(logo, pos, mask=logo)
        except Exception as e:
            print("Logo error:", e)

    # ---------------------------
    # Convert to PNG base64
    # ---------------------------
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    png_base64 = base64.b64encode(buffer.getvalue()).decode()

    # ---------------------------
    # Build SVG with frame
    # ---------------------------
    label_txt = frame_label or "SCAN ME"
    lc = frame_label_color or "#000000"
    font = frame_label_font or "Arial"

    if frame == "scan":
        w, h = qr_size + 40, qr_size + 80
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect x="10" y="40" width="{qr_size+20}" height="{qr_size+20}" rx="20" fill="white" stroke="#222" stroke-width="3"/>
  <text x="50%" y="28" font-size="20" text-anchor="middle" font-family="{font}" fill="{lc}" font-weight="bold">{label_txt}</text>
  <image href="data:image/png;base64,{png_base64}" x="20" y="50" width="{qr_size}" height="{qr_size}"/>
</svg>"""

    elif frame == "rounded":
        w, h = qr_size + 30, qr_size + 60
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect x="5" y="5" width="{qr_size+20}" height="{qr_size+20}" rx="30" fill="white" stroke="#222" stroke-width="3"/>
  <image href="data:image/png;base64,{png_base64}" x="15" y="15" width="{qr_size}" height="{qr_size}"/>
  <text x="50%" y="{qr_size+48}" font-size="16" text-anchor="middle" font-family="{font}" fill="{lc}">{label_txt}</text>
</svg>"""

    elif frame == "shadow":
        w = h = qr_size + 20
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect x="10" y="10" width="{qr_size}" height="{qr_size}" fill="black" opacity="0.15"/>
  <image href="data:image/png;base64,{png_base64}" x="0" y="0" width="{qr_size}" height="{qr_size}"/>
</svg>"""

    else:
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {qr_size} {qr_size}" width="{qr_size}" height="{qr_size}">
  <image href="data:image/png;base64,{png_base64}" width="{qr_size}" height="{qr_size}"/>
</svg>"""

    return svg
