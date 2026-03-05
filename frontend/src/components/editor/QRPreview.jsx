import { useQR } from "../../QRContext"

export default function QRPreview() {
    const { state, downloadQR } = useQR()
    // Explicitly check for valid SVG wrapper payload
    const hasQR = typeof state.qrSvg === 'string' && state.qrSvg.length > 50 && state.qrSvg.includes('<svg')

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "sticky",
            top: "24px" // Keep in viewport
        }}>

            {/* QR Box Container Exactly Like Reference */}
            <div style={{
                width: "100%",
                maxWidth: "320px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                position: "relative"
            }}>

                {/* QR Canvas / Placeholder */}
                <div style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: hasQR ? "transparent" : "#f8fafc",
                    border: hasQR ? "none" : "2px dashed #cbd5e1",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden"
                }}>

                    {/* Loading Overlay */}
                    {state.loading && (
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255,255,255,0.85)",
                            zIndex: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <svg style={{ animation: "spin 0.8s linear infinite" }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    )}

                    {/* Actual Rendered QR Code using inline HTML (fixes blank preview) */}
                    {hasQR ? (
                        <div
                            className="qr-inline-box"
                            dangerouslySetInnerHTML={{ __html: state.qrSvg }}
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        />
                    ) : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: "0 auto 8px" }}>
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <path d="M14 14h2m2 0h2M14 17v2m4-2v2" />
                            </svg>
                            <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Enter content<br />to generate QR</span>
                        </div>
                    )}
                </div>

                {/* Status Indicator */}
                <div style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: state.error ? "#ef4444" : (hasQR ? "#10b981" : "#64748b")
                }}>
                    <span style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: state.loading ? "#f59e0b" : state.error ? "#ef4444" : hasQR ? "#10b981" : "#cbd5e1"
                    }} />
                    {state.loading ? "Generating..." : state.error ? "Generation Failed" : hasQR ? "QR Code Ready" : "Waiting for Input"}
                </div>

                {/* Error Banner */}
                {state.error && (
                    <div style={{ marginTop: "12px", padding: "8px 12px", background: "#fef2f2", color: "#b91c1c", fontSize: "11px", borderRadius: "6px", width: "100%", textAlign: "center", wordBreak: "break-word" }}>
                        {state.error}
                    </div>
                )}

                {/* Generate / Action Area */}
                <div style={{ width: "100%", marginTop: "20px" }}>
                    <button
                        onClick={downloadQR}
                        disabled={!hasQR || state.loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: (!hasQR || state.loading) ? "#94a3b8" : "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 700,
                            cursor: (!hasQR || state.loading) ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            boxShadow: (!hasQR || state.loading) ? "none" : "0 4px 12px rgba(37,99,235,0.2)"
                        }}
                    >
                        ↓ Download PNG
                    </button>

                    <button
                        onClick={() => downloadQR("svg")}
                        disabled={!hasQR || state.loading}
                        style={{
                            width: "100%",
                            marginTop: "8px",
                            padding: "10px",
                            background: "#ffffff",
                            color: (!hasQR || state.loading) ? "#94a3b8" : "#334155",
                            border: `1px solid ${(!hasQR || state.loading) ? "#e2e8f0" : "#cbd5e1"}`,
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: (!hasQR || state.loading) ? "not-allowed" : "pointer"
                        }}
                    >
                        Download SVG
                    </button>
                </div>

            </div>

            {/* Perks Text */}
            <div style={{ marginTop: "16px", fontSize: "12px", color: "#94a3b8", display: "flex", gap: "12px" }}>
                <span>✓ High Quality</span>
                <span>✓ No Expiry</span>
                <span>✓ Commercial Use</span>
            </div>

        </div>
    )
}