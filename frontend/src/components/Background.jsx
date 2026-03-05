import { useRef } from "react"

const BG_SWATCHES = ["#ffffff", "#f9fafb", "#f0f9ff", "#eff6ff", "#faf5ff", "#fff1f2", "#fff7ed", "#fffbeb", "#f0fdf4", "#ecfdf5", "#1e1b4b", "#0a0a1a"]

export default function Background({ design, patchDesign }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => patchDesign({ bgImage: ev.target.result })
    r.readAsDataURL(f)
  }

  return (
    <div className="space-y-4">
      {/* Mode switcher */}
      <div className="flex gap-2">
        {[["color", "🎨 Solid Color"], ["image", "🖼 Image"]].map(([mode, label]) => (
          <button key={mode} type="button"
            onClick={() => mode === "image" ? fileRef.current?.click() : patchDesign({ bgImage: null })}
            className={`flex-1 py-2 text-xs font-bold rounded-xl border-2 transition
              ${(mode === "color" && !design.bgImage) || (mode === "image" && design.bgImage)
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>
            {label}
          </button>
        ))}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {!design.bgImage ? (
        <>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-lg border-2 border-slate-200 overflow-hidden flex-shrink-0">
                <div className="w-full h-full" style={{ background: design.bgColor }} />
                <input type="color" value={design.bgColor} onChange={e => patchDesign({ bgColor: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </div>
              <span className="text-xs font-mono text-slate-600">{design.bgColor.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BG_SWATCHES.map(c => (
              <button key={c} type="button" onClick={() => patchDesign({ bgColor: c })}
                style={{ background: c, border: design.bgColor === c ? "3px solid #2563eb" : "1.5px solid #d1d5db" }}
                className="w-6 h-6 rounded-md cursor-pointer transition hover:scale-110" title={c} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-14 h-12 rounded-xl border border-slate-200 flex-shrink-0"
            style={{ backgroundImage: `url(${design.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700">Image set</p>
            <p className="text-[11px] text-slate-400">QR overlays on top</p>
          </div>
          <button type="button" onClick={() => patchDesign({ bgImage: null })}
            className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            </svg>
          </button>
        </div>
      )}
      <p className="text-[10px] text-slate-400">⚠ Ensure sufficient contrast for QR scanability</p>
    </div>
  )
}
