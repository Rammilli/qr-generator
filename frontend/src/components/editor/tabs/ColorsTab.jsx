import { useState } from "react"
import { useQR } from "../../../QRContext"

function ColorRow({ label, colorKey }) {
    const { state, update } = useQR()
    const [hex, setHex] = useState(state[colorKey])

    const handleHexChange = (v) => {
        setHex(v)
        if (/^#[0-9A-Fa-f]{6}$/.test(v)) update({ [colorKey]: v })
    }

    const handleColorChange = (v) => {
        setHex(v)
        update({ [colorKey]: v })
    }

    return (
        <div>
            <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">{label}</label>
            <div className="flex items-center gap-2.5">
                <div className="relative">
                    <input
                        type="color"
                        value={state[colorKey]}
                        onChange={e => handleColorChange(e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer border border-white/10"
                    />
                </div>
                <input
                    type="text"
                    value={hex}
                    onChange={e => handleHexChange(e.target.value)}
                    maxLength={7}
                    className="input-dark flex-1 rounded-lg px-3 py-2 text-sm font-mono uppercase"
                />
            </div>
        </div>
    )
}

const PRESET_COLORS = [
    "#000000", "#ffffff", "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#0ea5e9",
]

export default function ColorsTab() {
    const { state, update } = useQR()

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <ColorRow label="Foreground Color" colorKey="fgColor" />
                <ColorRow label="Background Color" colorKey="bgColor" />
            </div>

            {/* Preset palette */}
            <div>
                <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">Quick Colors</label>
                <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => update({ fgColor: c })}
                            title={c}
                            className="w-7 h-7 rounded-lg border-2 transition-all hover:scale-110"
                            style={{
                                background: c,
                                borderColor: state.fgColor === c ? "#6366f1" : "rgba(255,255,255,0.1)",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Gradient Toggle */}
            <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-white/70">Enable Gradient</span>
                <div
                    onClick={() => update({ gradient: !state.gradient })}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${state.gradient ? "bg-primary" : "bg-white/10"}`}
                >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${state.gradient ? "left-5" : "left-0.5"}`} />
                </div>
            </label>

            {state.gradient && (
                <ColorRow label="Gradient Color" colorKey="gradientColor" />
            )}
        </div>
    )
}
