import { useState } from "react"
import { useQR } from "../../../QRContext"

const FRAMES = [
  { id: null, type: "none", icon: <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" /> },
  { id: "scan", type: "label", icon: <path d="M4 2h16a2 2 0 012 2v13H2V4a2 2 0 012-2z M2 17h20v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" /> },
  { id: "rounded", type: "label", icon: <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" /> },
  { id: "badge", type: "label", icon: <rect x="2" y="2" width="20" height="16" rx="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" /> },
  { id: "border", type: "no_label", icon: <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="4" /> },
  { id: "shadow", type: "no_label", icon: <rect x="2" y="2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" /> }
]

const FONTS = ["Arial", "Courier New", "Georgia", "Impact", "Times New Roman", "Verdana"]

export default function FramesTab() {
    const { state, update } = useQR()
    const [tab, setTab] = useState("With Text") // "With Text" | "Without Text"

    const filteredFrames = FRAMES.filter(f => f.type === "none" || (tab === "With Text" ? f.type === "label" : f.type === "no_label"))

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Type selector */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                {["With Text", "Without Text"].map(v => (
                    <button
                        key={v}
                        onClick={() => {
                            setTab(v)
                            update({ frame: null }) // reset cross selection
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

            {/* Frames Grid Exact Match */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {filteredFrames.map((f, i) => (
                    <button
                        key={i}
                       onClick={() =>
                        update({
                           frame: f.id,
                           frameLabel: state.frameLabel || "SCAN ME",
                           frameColor: state.frameColor || state.fgColor
                         })
                        }
                        style={{
                            aspectRatio: "1/1",
                            border: state.frame === f.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                            background: state.frame === f.id ? "#eff6ff" : "#fff",
                            color: state.frame === f.id ? "#2563eb" : "#94a3b8",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24">
                            {f.icon}
                        </svg>
                    </button>
                ))}
            </div>

            {/* Customization active only if frame is selected */}
            {state.frame && tab === "With Text" && (
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155", display: "block", marginBottom: "8px" }}>
                            Label Text
                        </label>
                        <input
                            type="text"
                            value={state.frameLabel}
                            onChange={(e) => update({ frameLabel: e.target.value })}
                            maxLength={20}
                            className="input-light"
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155", display: "block", marginBottom: "8px" }}>
                                Font
                            </label>
                            <select
                                value={state.frameLabelFont}
                                onChange={(e) => update({ frameLabelFont: e.target.value })}
                                className="input-light"
                                style={{ cursor: "pointer", appearance: "auto" }}
                            >
                                {FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155", display: "block", marginBottom: "8px" }}>
                                Frame Color
                            </label>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                    type="color"
                                    value={state.frameColor || state.fgColor}
                                    onChange={(e) => update({ frameColor: e.target.value })}
                                    style={{
                                        width: "38px", height: "38px", border: "none", padding: 0,
                                        borderRadius: "8px", cursor: "pointer"
                                    }}
                                />
                                <input
                                    type="text"
                                    value={state.frameColor || state.fgColor}
                                    onChange={(e) => update({ frameColor: e.target.value })}
                                    className="input-light"
                                    style={{ flex: 1, padding: "8px 10px", textTransform: "uppercase" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
