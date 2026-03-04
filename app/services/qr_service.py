import qrcode
from PIL import Image
import base64
import io


def generate_qr_svg(
    data,
    fill_color,
    back_color,
    logo_base64=None,
    frame=None,
    logo_size=40,
    qr_size=300
):

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(
        fill_color=fill_color,
        back_color=back_color
    ).convert("RGBA")

    img = img.resize((qr_size, qr_size))

    # Logo handling
    if logo_base64:
        try:
            logo_data = base64.b64decode(logo_base64.split(",")[-1])
            logo = Image.open(io.BytesIO(logo_data)).convert("RGBA")

            qr_width, qr_height = img.size

            logo_pixel_size = int((logo_size / 100) * qr_width)

            logo = logo.resize((logo_pixel_size, logo_pixel_size))

            position = (
                (qr_width - logo_pixel_size) // 2,
                (qr_height - logo_pixel_size) // 2
            )

            img.paste(logo, position, mask=logo)

        except Exception as e:
            print("Logo processing failed:", e)

    # Convert PNG to base64
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    png_base64 = base64.b64encode(buffer.getvalue()).decode()

    # Frame rendering
    if frame == "rounded":
        svg_output = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+20}" height="{qr_size+20}">
            <rect x="5" y="5" width="{qr_size+10}" height="{qr_size+10}" rx="40" ry="40"
                  fill="white" stroke="black" stroke-width="4"/>
            <image href="data:image/png;base64,{png_base64}"
                   x="10" y="10"
                   width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    elif frame == "border":
        svg_output = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+20}" height="{qr_size+20}">
            <rect x="5" y="5" width="{qr_size+10}" height="{qr_size+10}"
                  fill="white" stroke="black" stroke-width="8"/>
            <image href="data:image/png;base64,{png_base64}"
                   x="10" y="10"
                   width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    elif frame == "shadow":
        svg_output = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size+40}" height="{qr_size+40}">
            <rect x="15" y="15" width="{qr_size+10}" height="{qr_size+10}"
                  fill="black" opacity="0.2"/>
            <image href="data:image/png;base64,{png_base64}"
                   x="0" y="0"
                   width="{qr_size}" height="{qr_size}" />
        </svg>
        """

    else:
        svg_output = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{qr_size}" height="{qr_size}">
            <image href="data:image/png;base64,{png_base64}"
                   width="100%" height="100%" />
        </svg>
        """

    return svg_output