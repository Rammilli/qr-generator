import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [fillColor, setFillColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#ffffff");
  const [frame, setFrame] = useState("square");
  const [logo, setLogo] = useState(null);
  const [qrSvg, setQrSvg] = useState("");
  const [logoSize, setLogoSize] = useState(40);
  const [qrSize, setQrSize] = useState(300);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

 const generateQR = async () => {
  const response = await fetch("https://qr-generator-api-e8mb.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        fill_color: fillColor,
        back_color: backColor,
        logo: logo,
        frame: frame,
        logo_size: logoSize,
        qr_size: qrSize,
      }),
    });

    const svg = await response.text();
    setQrSvg(svg);
  };

  // Download SVG
  const downloadSVG = () => {
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  // High Resolution PNG Download
  const downloadPNG = () => {
    const svgElement = document.querySelector("#qr-container svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      const scale = 3;

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e1e1e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <div
        style={{
          width: "950px",
          background: "#2a2a2a",
          borderRadius: "10px",
          display: "flex",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* LEFT PANEL */}

        <div
          style={{
            flex: 1,
            padding: "30px",
            borderRight: "1px solid #444",
          }}
        >
          <h2>QR Generator</h2>

          <div style={{ marginTop: "20px" }}>
            <label>Text / URL</label>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Fill Color</label>
            <br />
            <input
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Background Color</label>
            <br />
            <input
              type="color"
              value={backColor}
              onChange={(e) => setBackColor(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Frame Style</label>
            <select
              value={frame}
              onChange={(e) => setFrame(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                borderRadius: "6px",
              }}
            >
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="border">Border</option>
              <option value="shadow">Shadow</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Upload Logo</label>
            <br />
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Logo Size: {logoSize}</label>
            <input
              type="range"
              min="20"
              max="100"
              value={logoSize}
              onChange={(e) => setLogoSize(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>QR Size: {qrSize}</label>
            <input
              type="range"
              min="200"
              max="500"
              value={qrSize}
              onChange={(e) => setQrSize(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <button
            onClick={generateQR}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "12px",
              background: "#4CAF50",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Generate QR
          </button>
        </div>

        {/* RIGHT PANEL */}

        <div
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Preview</h3>

          <div
            id="qr-container"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              marginTop: "20px",
              minWidth: "220px",
              minHeight: "220px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {qrSvg ? (
              <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
            ) : (
              <span style={{ color: "#888" }}>QR will appear here</span>
            )}
          </div>

          {qrSvg && (
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={downloadSVG}
                style={{
                  padding: "10px 15px",
                }}
              >
                Download SVG
              </button>

              <button
                onClick={downloadPNG}
                style={{
                  padding: "10px 15px",
                }}
              >
                Download PNG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;