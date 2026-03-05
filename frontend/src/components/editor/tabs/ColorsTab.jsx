import { useState } from "react"
import { useQR } from "../../../QRContext"

const PALETTE = [
    "#000000", "#ffffff", "#1877f2", "#1da1f2", "#e1306c", "#2563eb",
    "#10b981", "#ef4444", "#f59e0b", "#6366f1", "#8b5cf6", "#14b8a6"
]

export default function ColorsTab() {
    const { state, update } = useQR()
    const [view, setView] = useState("Single Color") // "Single Color" | "Gradient"

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* View Tabs */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                {["Single Color", "Gradient"].map(v => (
                    <button
                        key={v}
                        onClick={() => {
                            setView(v)
                            update({ gradient: v === "Gradient" })
                        }}
                        style={{
                            flex: 1,
                            padding: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            background: view === v ? "#fff" : "transparent",
                            color: view === v ? "#2563eb" : "#475569",
                            border: "none",
                            boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                            cursor: "pointer"
                        }}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* Colors Selection Grid Exact Match */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

                {/* Foreground Pickers */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                        Foreground Color
                    </label>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input
                            type="color"
                            value={state.fgColor}
                            onChange={(e) => update({ fgColor: e.target.value })}
                            style={{
                                width: "40px", height: "40px", border: "none", padding: 0,
                                borderRadius: "8px", cursor: "pointer", overflow: "hidden", outline: "none"
                            }}
                        />
                        <input
                            type="text"
                            value={state.fgColor}
                            onChange={(e) => update({ fgColor: e.target.value })}
                            className="input-light"
                            style={{ flex: 1, textTransform: "uppercase" }}
                        />
                    </div>
                </div>

                {/* Background Pickers */}
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
                                width: "40px", height: "40px", border: "none", padding: 0,
                                borderRadius: "8px", cursor: "pointer", overflow: "hidden", outline: "none"
                            }}
                        />
                        <input
                            type="text"
                            value={state.bgColor}
                            onChange={(e) => update({ bgColor: e.target.value })}
                            className="input-light"
                            style={{ flex: 1, textTransform: "uppercase" }}
                        />
                    </div>
                </div>

            </div>

            {/* Gradient Options (if active) */}
            {state.gradient && (
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                            Second Gradient Color
                        </label>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                                type="color"
                                value={state.gradientColor}
                                onChange={(e) => update({ gradientColor: e.target.value })}
                                style={{
                                    width: "40px", height: "40px", border: "none", padding: 0,
                                    borderRadius: "8px", cursor: "pointer", overflow: "hidden", outline: "none"
                                }}
                            />
                            <input
                                type="text"
                                value={state.gradientColor}
                                onChange={(e) => update({ gradientColor: e.target.value })}
                                className="input-light"
                                style={{ flex: 1, textTransform: "uppercase" }}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>Gradient Direction</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                            {["vertical", "horizontal", "diagonal"].map(dir => (
                                <button
                                    key={dir}
                                    onClick={() => update({ gradientDirection: dir })}
                                    style={{
                                        border: state.gradientDirection === dir ? "2px solid #2563eb" : "1px solid #cbd5e1",
                                        background: "#fff",
                                        padding: "8px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: state.gradientDirection === dir ? "#2563eb" : "#475569",
                                        cursor: "pointer",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {dir}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Palette */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Preset Colors</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                    {PALETTE.map(c => (
                        <button
                            key={c}
                            onClick={() => update({ fgColor: c })}
                            title={c}
                            style={{
                                background: c,
                                border: c === "#ffffff" ? "1px solid #e2e8f0" : "none",
                                borderRadius: "8px",
                                aspectRatio: "1/1",
                                cursor: "pointer",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
                            }}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
