import { useState } from "react"
import { useQR } from "../../../QRContext"

const PATTERNS = [
    { id: "squares", cells: <><rect x="2" y="2" width="8" height="8" /><rect x="14" y="2" width="8" height="8" /><rect x="2" y="14" width="8" height="8" /></> },
    { id: "dots", cells: <><circle cx="6" cy="6" r="4" /><circle cx="18" cy="6" r="4" /><circle cx="6" cy="18" r="4" /></> },
    { id: "rounded", cells: <><rect x="2" y="2" width="8" height="8" rx="3" /><rect x="14" y="2" width="8" height="8" rx="3" /><rect x="2" y="14" width="8" height="8" rx="3" /></> },
    { id: "diamonds", cells: <><polygon points="6,2 10,6 6,10 2,6" /><polygon points="18,2 22,6 18,10 14,6" /><polygon points="6,14 10,18 6,22 2,18" /></> }
]

export default function PatternsTab() {
    const { state, update } = useQR()
    const [tab, setTab] = useState("Design") // "Design" | "Eyes Frame" | "Eyes In"

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Standard three-way tab exact UI match */}
            <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                {["Design", "Eyes Frame", "Eyes In"].map(v => (
                    <button
                        key={v}
                        onClick={() => setTab(v)}
                        style={{
                            flex: 1,
                            padding: "8px 0",
                            fontSize: "12px",
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

            {/* Pattern Grid Exact Density Match */}
            {tab === "Design" && (
                <div>
                    <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                        Select Body Pattern
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {PATTERNS.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => update({ pattern: p.id })}
                                style={{
                                    aspectRatio: "1/1",
                                    border: state.pattern === p.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                    background: state.pattern === p.id ? "#eff6ff" : "#fff",
                                    color: state.pattern === p.id ? "#2563eb" : "#cbd5e1",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.15s"
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    {p.cells}
                                </svg>
                            </button>
                        ))}
                    </div>
                    <p style={{ marginTop: "12px", fontSize: "12px", color: "#64748b" }}>Other eye styling not currently bound to API schema. Reverting to base layout.</p>
                </div>
            )}

            {tab !== "Design" && (
                <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "13px", border: "1px dashed #cbd5e1", borderRadius: "8px" }}>
                    Eye pattern segregation requires API schema update. Currently mapped to global pattern.
                </div>
            )}

        </div>
    )
}
