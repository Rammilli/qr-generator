import { useQR } from "../../../QRContext"

// ── Pattern block previews — full density representation ─────────────────────
const PATTERNS = [
    {
        id: "squares",
        label: "Square",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                    <rect key={`${row}-${col}`} x={col*12+1} y={row*12+1} width="10" height="10" rx="0" />
                )))}
            </svg>
        )
    },
    {
        id: "dots",
        label: "Dots",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                    <circle key={`${row}-${col}`} cx={col*12+6} cy={row*12+6} r="5" />
                )))}
            </svg>
        )
    },
    {
        id: "rounded",
        label: "Rounded",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                    <rect key={`${row}-${col}`} x={col*12+1} y={row*12+1} width="10" height="10" rx="3.5" />
                )))}
            </svg>
        )
    },
    {
        id: "diamond",
        label: "Diamond",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => {
                    const cx = col*12+6, cy = row*12+6
                    return <rect key={`${row}-${col}`} x={cx-4} y={cy-4} width="8" height="8" rx="0" transform={`rotate(45 ${cx} ${cy})`} />
                }))}
            </svg>
        )
    },
    {
        id: "star",
        label: "Vertical",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                    <rect key={`${row}-${col}`} x={col*12+3} y={row*12+1} width="6" height="10" rx="1.5" />
                )))}
            </svg>
        )
    },
    {
        id: "fluid",
        label: "Horizontal",
        preview: (color) => (
            <svg width="48" height="48" viewBox="0 0 48 48" fill={color}>
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                    <rect key={`${row}-${col}`} x={col*12+1} y={row*12+3} width="10" height="6" rx="1.5" />
                )))}
            </svg>
        )
    },
]


export default function PatternsTab() {
    const { state, update } = useQR()

    const activeColor = state.fgColor || "#2563eb"
    const previewColor = (isActive) => isActive ? "#2563eb" : "#94a3b8"

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* ── Body Pattern ── */}
            <div>
                <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" }}>
                    Module Style
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {PATTERNS.map(p => {
                        const isActive = state.pattern === p.id
                        return (
                            <button
                                key={p.id}
                                onClick={() => update({ pattern: p.id })}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "12px 8px",
                                    border: isActive ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                    background: isActive ? "#eff6ff" : "#fff",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    transition: "all 0.15s",
                                }}
                            >
                                {p.preview(previewColor(isActive))}
                                <span style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: isActive ? "#2563eb" : "#64748b",
                                    letterSpacing: "0.02em"
                                }}>
                                    {p.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>



        </div>
    )
}
