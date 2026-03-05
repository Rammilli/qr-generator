import { useQR } from "../../../QRContext"

export default function OptionsTab() {
    const { state, update } = useQR()

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Size Exact Mapping */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={{ fontSize: "14px", fontWeight: 700, color: "#334155" }}>
                        Quality / Size
                    </label>
                    <span style={{ fontSize: "12px", color: "#64748b", background: "#f1f5f9", padding: "4px 8px", borderRadius: "6px", fontWeight: 600 }}>
                        {state.qrSize}x{state.qrSize} px
                    </span>
                </div>
                <input
                    type="range"
                    min="200"
                    max="1000"
                    step="10"
                    value={state.qrSize}
                    onChange={e => update({ qrSize: Number(e.target.value) })}
                />
            </div>

            {/* Error Correction Level exact dropdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={{ fontSize: "14px", fontWeight: 700, color: "#334155" }}>
                        Error Correction
                    </label>
                </div>
                <select
                    value={state.errorCorrection}
                    onChange={(e) => update({ errorCorrection: e.target.value })}
                    className="input-light"
                    style={{ cursor: "pointer", appearance: "auto", padding: "12px" }}
                >
                    <option value="L">Low (7%) - Best for simple URLs</option>
                    <option value="M">Medium (15%) - Standard</option>
                    <option value="Q">Quarter (25%) - Good with logos</option>
                    <option value="H">High (30%) - Best with large logos</option>
                </select>
            </div>

            {/* Scanability Toggle Exact Checkbox */}
            <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 700, color: "#334155" }}>
                        Improve Scanability
                    </label>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>
                        Ensures high contrast on logo and edges
                    </span>
                </div>
                <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#2563eb" }}
                />
            </div>

        </div>
    )
}
