import qrcode
from PIL import Image
import base64
import io


def generate_qr_svg(
    data,
    fill_color="black",
    back_color="white",
    logo_base64=None,
    frame=None,
    logo_size=20,
    qr_size=300
):

    # ---------------------------
    # Generate QR Code
    # ---------------------------

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2
    )

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(
        fill_color=fill_color,
        back_color=back_color
    ).convert("RGBA")

    img = img.resize((qr_size, qr_size))

    # ---------------------------
    # Logo processing
    # ---------------------------

    if logo_base64:

        try:

            logo_data = base64.b64decode(
                logo_base64.split(",")[-1]
            )

            logo = Image.open(
                io.BytesIO(logo_data)
            ).convert("RGBA")

            qr_w, qr_h = img.size

            logo_pixel = int((logo_size / 100) * qr_w)

            logo = logo.resize(
                (logo_pixel, logo_pixel)
            )

            pos = (
                (qr_w - logo_pixel) // 2,
                (qr_h - logo_pixel) // 2
            )

            img.paste(
                logo,
                pos,
                mask=logo
            )

        except Exception as e:
            print("Logo error:", e)

    # ---------------------------
    # Convert QR to PNG Base64
    # ---------------------------

    buffer = io.BytesIO()
    img.save(buffer, format="PNG")

    png_base64 = base64.b64encode(
        buffer.getvalue()
    ).decode()

    # ---------------------------
    # Frames
    # ---------------------------

    if frame == "scan":

        svg = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+40}" height="{qr_size+80}">
        <rect x="10" y="40" width="{qr_size+20}" height="{qr_size+20}" rx="20" fill="white" stroke="black" stroke-width="4"/>
        <text x="50%" y="25" font-size="22" text-anchor="middle" font-family="Arial" fill="black">
        SCAN ME
        </text>
        <image href="data:image/png;base64,{png_base64}"
        x="20" y="50"
        width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    elif frame == "rounded":

        svg = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+30}" height="{qr_size+30}">
        <rect x="5" y="5" width="{qr_size+20}" height="{qr_size+20}" rx="30"
        fill="white" stroke="black" stroke-width="4"/>
        <image href="data:image/png;base64,{png_base64}"
        x="15" y="15"
        width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    elif frame == "shadow":

        svg = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+30}" height="{qr_size+30}">
        <rect x="15" y="15" width="{qr_size}" height="{qr_size}"
        fill="black" opacity="0.2"/>
        <image href="data:image/png;base64,{png_base64}"
        x="0" y="0"
        width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    else:

        svg = f"""
        <svg xmlns="http://www.w3.org/2000/svg"
        width="{qr_size}" height="{qr_size}">
        <image
        href="data:image/png;base64,{png_base64}"
        width="100%"
        height="100%" />
        </svg>
        """

    return svg