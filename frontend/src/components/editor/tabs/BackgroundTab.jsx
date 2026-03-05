import { useRef, useState } from "react"
import { useQR } from "../../../QRContext"

const BG_PALETTE = [
    "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8",
    "#fef2f2", "#fff7ed", "#fefce8", "#f0fdf4", "#ecfeff", "#eff6ff"
]

export default function BackgroundTab() {
    const { state, update } = useQR()
    const inputRef = useRef(null)
    const [tab, setTab] = useState("Color") // "Color" | "Image"

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (ev) => update({ bgImage: ev.target.result })
        reader.readAsDataURL(file)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Type selector */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                {["Color", "Image"].map(v => (
                    <button
                        key={v}
                        onClick={() => {
                            setTab(v)
                            if (v === "Color") update({ bgImage: null })
                        }}
                        style={{
                            flex: 1,
                            padding: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            background: tab === v ? "#fff" : "transparent",
                            color: tab === v ? "#2563eb" : "#475569",
                            border: "none",
                            boxShadow: tab === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                            cursor: "pointer"
                        }}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* Content Based on Tab */}
            {tab === "Color" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                            Background Color
                        </label>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                                type="color"
                                value={state.bgColor}
                                onChange={(e) => update({ bgColor: e.target.value })}
                                style={{
                                    width: "48px", height: "48px", border: "none", padding: 0,
                                    borderRadius: "10px", cursor: "pointer", overflow: "hidden", outline: "none"
                                }}
                            />
                            <input
                                type="text"
                                value={state.bgColor}
                                onChange={(e) => update({ bgColor: e.target.value })}
                                className="input-light"
                                style={{ flex: 1, padding: "12px 14px", textTransform: "uppercase" }}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Selection</label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                            {BG_PALETTE.map(c => (
                                <button
                                    key={c}
                                    onClick={() => update({ bgColor: c })}
                                    title={c}
                                    style={{
                                        background: c,
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "6px",
                                        aspectRatio: "1/1",
                                        cursor: "pointer",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {state.bgImage && (
                        <div style={{ position: "relative", width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                            <img src={state.bgImage} alt="bg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button
                                onClick={() => update({ bgImage: null })}
                                style={{
                                    position: "absolute", top: "8px", right: "8px",
                                    background: "#fff", border: "none", borderRadius: "50%",
                                    width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", fontSize: "14px"
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleUpload}
                        style={{ display: "none" }}
                    />
                    <button
                        onClick={() => inputRef.current?.click()}
                        style={{
                            width: "100%",
                            padding: "16px",
                            background: "#f8fafc",
                            border: "2px dashed #cbd5e1",
                            borderRadius: "8px",
                            color: "#475569",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "border 0.2s"
                        }}
                    >
                        {state.bgImage ? "Replace Background Image" : "+ Upload Background"}
                    </button>
                    <p style={{ fontSize: "12px", color: "#64748b", textAlign: "center", margin: 0 }}>
                        Image will be placed behind the QR code.
                    </p>
                </div>
            )}
        </div>
    )
}
