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
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageColor
import base64
import io


ERROR_CORRECTION_MAP = {
    "L": qrcode.constants.ERROR_CORRECT_L,
    "M": qrcode.constants.ERROR_CORRECT_M,
    "Q": qrcode.constants.ERROR_CORRECT_Q,
    "H": qrcode.constants.ERROR_CORRECT_H,
}

PATTERN_MAP = {
    "squares": SquareModuleDrawer(),
    "dots": CircleModuleDrawer(),
    "rounded": RoundedModuleDrawer(),
    "diamond": GappedSquareModuleDrawer(),
    "star": VerticalBarsDrawer(),
    "fluid": HorizontalBarsDrawer(),
}


def _to_rgba(color_str: str, alpha: int = 255) -> tuple:
    try:
        rgb = ImageColor.getrgb(color_str)
        return rgb[:3] + (alpha,) if len(rgb) == 3 else rgb
    except Exception:
        return (0, 0, 0, alpha)


def _apply_gradient(img: Image.Image, fg_start: str, fg_end: str, direction: str = "horizontal") -> Image.Image:
    size = img.width
    start_rgb = _to_rgba(fg_start)[:3]
    end_rgb = _to_rgba(fg_end)[:3]

    rgba = img.convert("RGBA")
    pixels = rgba.load()

    for y in range(size):
        for x in range(size):
            r, g, b, a = pixels[x, y]

            if r + g + b < 384:
                if direction == "vertical":
                    t = y / max(size - 1, 1)
                elif direction == "diagonal":
                    t = (x + y) / max((size - 1) * 2, 1)
                else:
                    t = x / max(size - 1, 1)

                nr = int(start_rgb[0] + (end_rgb[0] - start_rgb[0]) * t)
                ng = int(start_rgb[1] + (end_rgb[1] - start_rgb[1]) * t)
                nb = int(start_rgb[2] + (end_rgb[2] - start_rgb[2]) * t)

                pixels[x, y] = (nr, ng, nb, a)

    return rgba


def generate_qr_svg(
    data,
    fill_color="#000000",
    back_color="#ffffff",
    gradient_color=None,
    gradient_direction="horizontal",
    logo_base64=None,
    frame=None,
    frame_label="SCAN ME",
    frame_label_font="Arial",
    frame_label_color="#000000",
    frame_color=None,
    logo_size=25,
    qr_size=300,
    pattern="squares",
    error_correction="H",
    quiet_zone=4,
):
    ec = ERROR_CORRECTION_MAP.get(error_correction, qrcode.constants.ERROR_CORRECT_H)
    drawer = PATTERN_MAP.get(pattern, SquareModuleDrawer())
    fg_rgba = _to_rgba(fill_color)
    bg_rgba = _to_rgba(back_color)

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
            color_mask=SolidFillColorMask(
                back_color=bg_rgba[:3],
                front_color=fg_rgba[:3],
            ),
        ).convert("RGBA")
    except Exception as e:
        print("StyledPilImage error:", e)
        img = qr.make_image(fill_color=fill_color, back_color=back_color).convert("RGBA")

    img = img.resize((qr_size, qr_size), Image.LANCZOS)

    if gradient_color:
        img = _apply_gradient(img, fill_color, gradient_color, gradient_direction)

    # ── Logo overlay ─────────────────────────────────────
    if logo_base64:
        try:
            if "," in logo_base64:
                logo_base64 = logo_base64.split(",")[1]

            logo_data = base64.b64decode(logo_base64)
            logo = Image.open(io.BytesIO(logo_data)).convert("RGBA")

            qr_w, qr_h = img.size

            logo_size = max(12, min(logo_size, 20))
            logo_pixel = int((logo_size / 100) * qr_w)

            logo.thumbnail((logo_pixel, logo_pixel), Image.LANCZOS)

            padding = 8
            bg = Image.new(
                "RGBA",
                (logo.width + padding * 2, logo.height + padding * 2),
                (255, 255, 255, 255)
            )

            bg_pos = (
                (bg.width - logo.width) // 2,
                (bg.height - logo.height) // 2
            )

            bg.paste(logo, bg_pos, logo)

            pos = (
                (qr_w - bg.width) // 2,
                (qr_h - bg.height) // 2
            )

            img.paste(bg, pos, bg)

        except Exception as e:
            print("Logo error:", e)

    # ── PNG export ─────────────────────────────────────
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    png_base64 = base64.b64encode(buffer.getvalue()).decode()

    label_txt = frame_label or "SCAN ME"
    lc = frame_label_color or "#000000"
    font = frame_label_font or "Arial"
    fc = frame_color or "#222222"

    if frame == "scan":
        w, h = qr_size + 40, qr_size + 80
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect x="10" y="40" width="{qr_size+20}" height="{qr_size+20}" rx="20" fill="{back_color}" stroke="{fc}" stroke-width="3"/>
  <text x="50%" y="28" font-size="20" text-anchor="middle" font-family="{font}" fill="{lc}" font-weight="bold">{label_txt}</text>
  <image href="data:image/png;base64,{png_base64}" x="20" y="50" width="{qr_size}" height="{qr_size}"/>
</svg>"""

    elif frame == "badge":
        w, h = qr_size + 20, qr_size + 50
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <rect x="0" y="0" width="{w}" height="{qr_size+20}" rx="10" fill="{back_color}" stroke="{fc}" stroke-width="2"/>
  <image href="data:image/png;base64,{png_base64}" x="10" y="10" width="{qr_size}" height="{qr_size}"/>
  <rect x="0" y="{qr_size+18}" width="{w}" height="32" rx="6" fill="{fc}"/>
  <text x="50%" y="{qr_size+39}" font-size="14" text-anchor="middle" font-family="{font}" fill="white" font-weight="bold">{label_txt}</text>
</svg>"""

    else:
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {qr_size} {qr_size}" width="{qr_size}" height="{qr_size}">
  <image href="data:image/png;base64,{png_base64}" width="{qr_size}" height="{qr_size}"/>
</svg>"""

    return svg