import { useQR } from "../../../QRContext"

const ERROR_LEVELS = [
    { id: "L", label: "L", desc: "Low (7%)" },
    { id: "M", label: "M", desc: "Medium (15%)" },
    { id: "Q", label: "Q", desc: "Quartile (25%)" },
    { id: "H", label: "H", desc: "High (30%) ★" },
]

const FORMATS = ["PNG", "SVG", "PDF", "EPS"]

export default function OptionsTab() {
    const { state, update } = useQR()

    return (
        <div className="space-y-4">
            {/* Error Correction */}
            <div>
                <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">Error Correction Level</label>
                <div className="grid grid-cols-4 gap-1.5">
                    {ERROR_LEVELS.map((lvl) => (
                        <button
                            key={lvl.id}
                            type="button"
                            onClick={() => update({ errorCorrection: lvl.id })}
                            className={`flex flex-col items-center py-2 rounded-lg border text-xs transition-all ${state.errorCorrection === lvl.id
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-white/10 text-white/40 hover:border-white/20"
                                }`}
                        >
                            <span className="font-bold">{lvl.label}</span>
                            <span className="text-[9px] mt-0.5 opacity-70">{lvl.desc.split(" ")[0]}</span>
                        </button>
                    ))}
                </div>
                <p className="text-[10px] text-white/25 mt-1">Higher levels allow logo overlays but make QR denser</p>
            </div>

            {/* Quiet Zone */}
            <div>
                <div className="flex justify-between mb-1.5">
                    <label className="text-[11px] text-white/40 uppercase tracking-wider">Quiet Zone (Margin)</label>
                    <span className="text-[11px] text-white/60 font-mono">{state.quietZone} modules</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={state.quietZone}
                    onChange={e => update({ quietZone: Number(e.target.value) })}
                />
            </div>

            {/* QR Size */}
            <div>
                <div className="flex justify-between mb-1.5">
                    <label className="text-[11px] text-white/40 uppercase tracking-wider">QR Size (px)</label>
                    <span className="text-[11px] text-white/60 font-mono">{state.qrSize}px</span>
                </div>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={state.qrSize}
                    onChange={e => update({ qrSize: Number(e.target.value) })}
                />
            </div>

            {/* Output Format */}
            <div>
                <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">Output Format</label>
                <div className="grid grid-cols-4 gap-1.5">
                    {FORMATS.map((fmt) => (
                        <button
                            key={fmt}
                            type="button"
                            onClick={() => update({ outputFormat: fmt })}
                            className={`py-2 rounded-lg border text-xs font-bold transition-all ${state.outputFormat === fmt
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-white/10 text-white/40 hover:border-white/20"
                                }`}
                        >
                            {fmt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
