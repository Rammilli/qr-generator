const ECC = [
  { id: "L", label: "L", desc: "Low" },
  { id: "M", label: "M", desc: "Med" },
  { id: "Q", label: "Q", desc: "Qrt" },
  { id: "H", label: "H", desc: "High ★" },
]

export default function Options({ design, patchDesign }) {
  return (
    <div className="space-y-4">
      {/* Error Correction */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Error Correction</label>
        <div className="grid grid-cols-4 gap-2">
          {ECC.map(e => (
            <button key={e.id} type="button" onClick={() => patchDesign({ errorCorrection: e.id })}
              className={`flex flex-col items-center gap-0.5 py-2.5 rounded-xl border-2 transition cursor-pointer
                ${design.errorCorrection === e.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`}>
              <span className={`text-sm font-bold ${design.errorCorrection === e.id ? "text-blue-600" : "text-slate-700"}`}>{e.label}</span>
              <span className={`text-[9px] ${design.errorCorrection === e.id ? "text-blue-400" : "text-slate-400"}`}>{e.desc}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5">Higher correction allows logo overlays</p>
      </div>

      {/* Margin */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Margin (Quiet Zone)</label>
          <span className="text-[11px] text-slate-500">{design.quietZone} modules</span>
        </div>
        <input type="range" min="0" max="10" value={design.quietZone}
          onChange={e => patchDesign({ quietZone: Number(e.target.value) })} />
      </div>

      {/* QR Size */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">QR Size</label>
          <span className="text-[11px] text-slate-500">{design.qrSize}px</span>
        </div>
        <input type="range" min="100" max="1000" step="50" value={design.qrSize}
          onChange={e => patchDesign({ qrSize: Number(e.target.value) })} />
      </div>

      {/* Output Format */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Download Format</label>
        <div className="grid grid-cols-3 gap-2">
          {["PNG", "SVG", "PDF"].map(f => (
            <button key={f} type="button" onClick={() => patchDesign({ outputFormat: f })}
              className={`py-2 text-xs font-bold rounded-xl border-2 transition
                ${design.outputFormat === f ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-600 hover:border-blue-300 bg-white"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
