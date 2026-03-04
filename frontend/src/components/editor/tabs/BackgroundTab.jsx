import { useRef } from "react"
import { useQR } from "../../../QRContext"
import { RiImageLine, RiDeleteBin6Line } from "react-icons/ri"

export default function BackgroundTab() {
    const { state, update } = useQR()
    const inputRef = useRef()

    const handleBgImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => update({ bgImage: ev.target.result })
        reader.readAsDataURL(file)
    }

    return (
        <div className="space-y-4">
            {/* Background mode */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => update({ bgImage: null })}
                    className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all ${!state.bgImage
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 text-white/40 hover:border-white/20"
                        }`}
                >
                    🎨 Solid Color
                </button>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all ${state.bgImage
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 text-white/40 hover:border-white/20"
                        }`}
                >
                    🖼️ Image
                </button>
            </div>

            {!state.bgImage ? (
                <div>
                    <label className="block text-[11px] text-white/40 mb-2 uppercase tracking-wider">Background Color</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={state.bgColor}
                            onChange={e => update({ bgColor: e.target.value })}
                            className="w-9 h-9 rounded-lg cursor-pointer border border-white/10"
                        />
                        <input
                            type="text"
                            value={state.bgColor}
                            onChange={e => {
                                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) update({ bgColor: e.target.value })
                            }}
                            maxLength={7}
                            className="input-dark flex-1 rounded-lg px-3 py-2 text-sm font-mono uppercase"
                        />
                    </div>

                    {/* Color swatches */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {["#ffffff", "#f8fafc", "#1e293b", "#0f172a", "#fef3c7", "#ecfdf5", "#eff6ff", "#fdf2f8", "#1a1a2e"].map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => update({ bgColor: c })}
                                className="w-7 h-7 rounded-lg border-2 hover:scale-110 transition-transform"
                                style={{ background: c, borderColor: state.bgColor === c ? "#6366f1" : "rgba(255,255,255,0.1)" }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <div
                        className="w-20 h-16 rounded-lg border border-white/10 bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${state.bgImage})` }}
                    />
                    <div className="flex-1">
                        <p className="text-xs text-white/50 mb-1">Background image set</p>
                        <p className="text-[10px] text-white/30">QR code will overlay on image</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => update({ bgImage: null })}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            )}

            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImage} />

            <p className="text-[10px] text-white/30 text-center">
                ⚠️ Ensure sufficient contrast for QR scanability
            </p>
        </div>
    )
}
