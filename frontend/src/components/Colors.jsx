import { useState } from "react"

const FG = ["#000000", "#1f2937", "#2563eb", "#7c3aed", "#db2777", "#dc2626", "#ea580c", "#d97706", "#16a34a", "#0891b2", "#ffffff", "#64748b"]
const BG = ["#ffffff", "#f9fafb", "#f0f9ff", "#eff6ff", "#faf5ff", "#fff1f2", "#fff7ed", "#fffbeb", "#f0fdf4", "#ecfdf5", "#1e1b4b", "#0a0a1a"]

export default function Colors({ design, patchDesign }) {
  const [tab, setTab] = useState("basic")
  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-slate-100 pb-3">
        {[["basic", "🎨 Colors"], ["gradient", "🌈 Gradient"]].map(([t, l]) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition
              ${tab === t ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === "basic" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {[["fgColor", "Foreground"], ["bgColor", "Background"]].map(([k, l]) => (
              <div key={k}>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{l}</label>
                <div className="flex items-center gap-2">
                  <div className="relative w-9 h-9 rounded-lg border-2 border-slate-200 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full" style={{ background: design[k] }} />
                    <input type="color" value={design[k]} onChange={e => patchDesign({ [k]: e.target.value })}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  </div>
                  <span className="text-xs font-mono text-slate-600">{design[k].toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">FG Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {FG.map(c => (
                <button key={c} type="button" onClick={() => patchDesign({ fgColor: c })}
                  style={{ background: c, border: design.fgColor === c ? "3px solid #2563eb" : c === "#ffffff" ? "1.5px solid #d1d5db" : "1.5px solid transparent" }}
                  className="w-6 h-6 rounded-md cursor-pointer transition hover:scale-110" title={c} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">BG Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {BG.map(c => (
                <button key={c} type="button" onClick={() => patchDesign({ bgColor: c })}
                  style={{ background: c, border: design.bgColor === c ? "3px solid #2563eb" : "1.5px solid #d1d5db" }}
                  className="w-6 h-6 rounded-md cursor-pointer transition hover:scale-110" title={c} />
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "gradient" && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Enable Gradient</span>
            <div onClick={() => patchDesign({ gradient: !design.gradient })}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${design.gradient ? "bg-blue-600" : "bg-slate-200"}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${design.gradient ? "left-5" : "left-0.5"}`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["fgColor", "Primary"], ["gradientColor", "End Color"]].map(([k, l]) => (
              <div key={k}>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{l}</label>
                <div className="flex items-center gap-2">
                  <div className="relative w-9 h-9 rounded-lg border-2 border-slate-200 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full" style={{ background: design[k] }} />
                    <input type="color" value={design[k]} onChange={e => patchDesign({ [k]: e.target.value })}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {design.gradient && (
            <>
              <div className="h-6 rounded-lg border border-slate-200"
                style={{ background: `linear-gradient(${design.gradientDirection === "vertical" ? "to bottom" : design.gradientDirection === "diagonal" ? "135deg" : "to right"}, ${design.fgColor}, ${design.gradientColor})` }} />
              <div className="flex gap-2">
                {[["horizontal", "→ H"], ["vertical", "↓ V"], ["diagonal", "↘ D"]].map(([d, l]) => (
                  <button key={d} type="button" onClick={() => patchDesign({ gradientDirection: d })}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition
                      ${design.gradientDirection === d ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}