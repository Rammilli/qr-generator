import { useQR } from "../../../QRContext"

// ── SVG mini previews for each frame style ──────────────────────────
const FrameIcon = ({ type, fg = "#6366f1", bg = "#1e1b4b" }) => {
    const qr = (
        <rect x="6" y="6" width="20" height="20" rx="2" fill={fg} opacity="0.85" />
    )
    switch (type) {
        case null:
            return (
                <svg viewBox="0 0 32 32" className="w-10 h-10">
                    <rect x="4" y="4" width="24" height="24" rx="3" fill={bg} />
                    <rect x="6" y="6" width="20" height="20" rx="2" fill={fg} opacity="0.85" />
                    <rect x="9" y="9" width="6" height="6" fill={bg} />
                    <rect x="17" y="9" width="6" height="6" fill={bg} />
                    <rect x="9" y="17" width="6" height="6" fill={bg} />
                </svg>
            )
        case "scan":
            return (
                <svg viewBox="0 0 32 32" className="w-10 h-10">
                    <rect x="2" y="6" width="28" height="22" rx="3" fill={bg} />
                    <rect x="4" y="8" width="24" height="18" rx="2" fill={fg} opacity="0.8" />
                    <rect x="6" y="10" width="8" height="8" fill={bg} />
                    <rect x="18" y="10" width="8" height="8" fill={bg} />
                    <rect x="6" y="20" width="8" height="4" fill={bg} />
                    <text x="16" y="5.5" textAnchor="middle" fontSize="4" fill={fg} fontWeight="bold">SCAN ME</text>
                </svg>
            )
        case "rounded":
            return (
                <svg viewBox="0 0 32 32" className="w-10 h-10">
                    <rect x="2" y="2" width="28" height="28" rx="10" fill={bg} />
                    <rect x="5" y="5" width="22" height="22" rx="6" fill={fg} opacity="0.8" />
                    <rect x="8" y="8" width="7" height="7" rx="2" fill={bg} />
                    <rect x="17" y="8" width="7" height="7" rx="2" fill={bg} />
                    <rect x="8" y="17" width="7" height="7" rx="2" fill={bg} />
                </svg>
            )
        case "shadow":
            return (
                <svg viewBox="0 0 32 32" className="w-10 h-10">
                    <rect x="5" y="5" width="24" height="24" rx="3" fill={fg} opacity="0.25" />
                    <rect x="3" y="3" width="24" height="24" rx="3" fill={bg} />
                    <rect x="5" y="5" width="20" height="20" rx="2" fill={fg} opacity="0.8" />
                    <rect x="8" y="8" width="6" height="6" fill={bg} />
                    <rect x="16" y="8" width="6" height="6" fill={bg} />
                    <rect x="8" y="16" width="6" height="6" fill={bg} />
                </svg>
            )
        case "border":
            return (
                <svg viewBox="0 0 32 32" className="w-10 h-10">
                    <rect x="1" y="1" width="30" height="30" rx="3" fill="none" stroke={fg} strokeWidth="2" />
                    <rect x="4" y="4" width="24" height="24" rx="2" fill={bg} />
                    <rect x="6" y="6" width="20" height="20" rx="1" fill={fg} opacity="0.8" />
                    <rect x="9" y="9" width="6" height="6" fill={bg} />
                    <rect x="17" y="9" width="6" height="6" fill={bg} />
                    <rect x="9" y="17" width="6" height="6" fill={bg} />
                </svg>
            )
        case "badge":
            return (
                <svg viewBox="0 0 32 36" className="w-10 h-10">
                    <rect x="2" y="2" width="28" height="28" rx="4" fill={bg} />
                    <rect x="4" y="4" width="24" height="24" rx="3" fill={fg} opacity="0.8" />
                    <rect x="7" y="7" width="7" height="7" fill={bg} />
                    <rect x="18" y="7" width="7" height="7" fill={bg} />
                    <rect x="7" y="18" width="7" height="7" fill={bg} />
                    <rect x="4" y="31" width="24" height="4" rx="2" fill={fg} />
                    <text x="16" y="34.5" textAnchor="middle" fontSize="3.5" fill="white" fontWeight="bold">FOLLOW US</text>
                </svg>
            )
        case "circle_label":
            return (
                <svg viewBox="0 0 32 36" className="w-10 h-10">
                    <circle cx="16" cy="16" r="16" fill={bg} />
                    <rect x="5" y="5" width="22" height="22" rx="3" fill={fg} opacity="0.8" />
                    <rect x="8" y="8" width="6" height="6" fill={bg} />
                    <rect x="18" y="8" width="6" height="6" fill={bg} />
                    <rect x="8" y="18" width="6" height="6" fill={bg} />
                    <text x="16" y="35" textAnchor="middle" fontSize="4" fill={fg} fontWeight="bold">SCAN</text>
                </svg>
            )
        case "phone":
            return (
                <svg viewBox="0 0 28 40" className="w-10 h-10">
                    <rect x="2" y="2" width="24" height="36" rx="5" fill={bg} />
                    <rect x="5" y="7" width="18" height="22" rx="2" fill={fg} opacity="0.8" />
                    <rect x="7" y="9" width="6" height="6" fill={bg} />
                    <rect x="15" y="9" width="6" height="6" fill={bg} />
                    <rect x="7" y="17" width="6" height="6" fill={bg} />
                    <circle cx="14" cy="34" r="2" fill={fg} opacity="0.5" />
                    <rect x="10" y="4" width="8" height="1.5" rx="1" fill={fg} opacity="0.3" />
                </svg>
            )
        case "tag":
            return (
                <svg viewBox="0 0 32 36" className="w-10 h-10">
                    <path d="M4 2 H28 Q30 2 30 4 V26 L16 34 L2 26 V4 Q2 2 4 2Z" fill={bg} />
                    <rect x="6" y="5" width="20" height="20" rx="2" fill={fg} opacity="0.8" />
                    <rect x="9" y="8" width="6" height="6" fill={bg} />
                    <rect x="17" y="8" width="6" height="6" fill={bg} />
                    <rect x="9" y="16" width="6" height="6" fill={bg} />
                </svg>
            )
        case "hexagon":
            return (
                <svg viewBox="0 0 32 36" className="w-10 h-10">
                    <path d="M16 1 L30 9 L30 25 L16 33 L2 25 L2 9 Z" fill={bg} />
                    <rect x="8" y="8" width="16" height="16" rx="3" fill={fg} opacity="0.8" />
                    <rect x="11" y="11" width="4" height="4" fill={bg} />
                    <rect x="17" y="11" width="4" height="4" fill={bg} />
                    <rect x="11" y="17" width="4" height="4" fill={bg} />
                </svg>
            )
        default:
            return <div className="w-10 h-10 rounded bg-white/10" />
    }
}

const FRAMES = [
    { id: null, label: "None", color: "#6366f1", bg: "#1e1b4b" },
    { id: "scan", label: "Scan Label", color: "#0ea5e9", bg: "#0c4a6e" },
    { id: "rounded", label: "Rounded", color: "#8b5cf6", bg: "#2e1065" },
    { id: "shadow", label: "Shadow", color: "#64748b", bg: "#0f172a" },
    { id: "border", label: "Border", color: "#10b981", bg: "#052e16" },
    { id: "badge", label: "Follow Badge", color: "#f59e0b", bg: "#451a03" },
    { id: "circle_label", label: "Circle", color: "#ef4444", bg: "#450a0a" },
    { id: "phone", label: "Mobile", color: "#6366f1", bg: "#1e1b4b" },
    { id: "tag", label: "Tag", color: "#ec4899", bg: "#500724" },
    { id: "hexagon", label: "Hexagon", color: "#f97316", bg: "#431407" },
]

const FONTS = ["Arial", "Nunito", "Georgia", "Courier New", "Trebuchet MS", "Verdana", "Impact"]

export default function FramesTab() {
    const { state, update } = useQR()

    return (
        <div className="space-y-4">
            {/* Frame selector grid */}
            <div>
                <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">Frame Style</label>
                <div className="grid grid-cols-5 gap-2">
                    {FRAMES.map((f) => (
                        <button
                            key={String(f.id)}
                            type="button"
                            title={f.label}
                            onClick={() => update({ frame: f.id })}
                            className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border transition-all ${state.frame === f.id
                                    ? "border-primary bg-primary/10 shadow-glow"
                                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/5"
                                }`}
                        >
                            <FrameIcon type={f.id} fg={f.color} bg={f.bg} />
                            <span className={`text-[9px] font-medium text-center leading-tight ${state.frame === f.id ? "text-primary" : "text-white/40"}`}>
                                {f.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Frame customization — only when a frame is selected */}
            {state.frame && (
                <>
                    <div className="h-px bg-white/5" />

                    {/* Label text + color row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">Label Text</label>
                            <input
                                type="text"
                                value={state.frameLabel}
                                onChange={e => update({ frameLabel: e.target.value })}
                                maxLength={20}
                                placeholder="SCAN ME"
                                className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={state.frameLabelColor}
                                    onChange={e => update({ frameLabelColor: e.target.value })}
                                    className="w-9 h-9 rounded-lg cursor-pointer border border-white/10"
                                />
                                <span className="text-[10px] text-white/40 font-mono">{state.frameLabelColor}</span>
                            </div>
                        </div>
                    </div>

                    {/* Font */}
                    <div>
                        <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">Font</label>
                        <select
                            value={state.frameLabelFont}
                            onChange={e => update({ frameLabelFont: e.target.value })}
                            className="input-dark w-full rounded-lg px-3 py-2 text-sm"
                        >
                            {FONTS.map((f) => (
                                <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                            ))}
                        </select>
                    </div>

                    {/* Text size */}
                    <div>
                        <div className="flex justify-between mb-1.5">
                            <label className="text-[11px] text-white/40 uppercase tracking-wider">Text Size</label>
                            <span className="text-[11px] text-white/60 font-mono">{state.frameLabelSize}%</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="150"
                            value={state.frameLabelSize}
                            onChange={e => update({ frameLabelSize: Number(e.target.value) })}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
