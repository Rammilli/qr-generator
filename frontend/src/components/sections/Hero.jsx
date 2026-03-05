import QREditor from "../editor/QREditor"
import QRPreview from "../editor/QRPreview"

export default function Hero() {
    return (
        <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "32px 16px" }}>
            {/* Page title */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#111827", margin: 0 }}>
                    QR Code Generator
                </h1>
                <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
                    Create free QR codes — no sign-up required
                </p>
            </div>

            {/* Main white card */}
            <div
                style={{
                    maxWidth: "960px",
                    margin: "0 auto",
                    background: "#fff",
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                    overflow: "hidden",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {/* Left: editor */}
                <div style={{ flex: "1 1 520px", padding: "24px", borderRight: "1px solid #e5e7eb", minWidth: "300px" }}>
                    <QREditor />
                </div>

                {/* Right: preview */}
                <div style={{ flex: "0 0 280px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <QRPreview />
                </div>
            </div>

            {/* Footer note */}
            <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "16px" }}>
                Free to use · No watermarks · High resolution downloads
            </p>
        </div>
    )
}
