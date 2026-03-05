const FRAMES = [
  {
    id: null, label: "None", preview: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="2" y="2" width="36" height="36" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="6" y="6" width="10" height="10" rx="1" fill="#475569" /><rect x="24" y="6" width="10" height="10" rx="1" fill="#475569" />
        <rect x="6" y="24" width="10" height="10" rx="1" fill="#475569" /><rect x="18" y="18" width="4" height="4" fill="#475569" />
      </svg>
    )
  },
  {
    id: "scan", label: "Scan Me", preview: () => (
      <svg width="40" height="48" viewBox="0 0 40 48">
        <rect x="1" y="8" width="38" height="36" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="20" y="6" textAnchor="middle" fontSize="6" fill="#3b82f6" fontWeight="bold">SCAN ME</text>
        <rect x="4" y="11" width="9" height="9" rx="1" fill="#3b82f6" /><rect x="27" y="11" width="9" height="9" rx="1" fill="#3b82f6" />
        <rect x="4" y="27" width="9" height="9" rx="1" fill="#3b82f6" />
      </svg>
    )
  },
  {
    id: "rounded", label: "Rounded", preview: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="1" y="1" width="38" height="38" rx="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="5" y="5" width="9" height="9" rx="2.5" fill="#475569" /><rect x="26" y="5" width="9" height="9" rx="2.5" fill="#475569" />
        <rect x="5" y="26" width="9" height="9" rx="2.5" fill="#475569" />
      </svg>
    )
  },
  {
    id: "shadow", label: "Shadow", preview: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="5" y="5" width="34" height="34" rx="3" fill="#e2e8f0" />
        <rect x="2" y="2" width="34" height="34" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="5" y="5" width="9" height="9" fill="#475569" /><rect x="22" y="5" width="9" height="9" fill="#475569" />
        <rect x="5" y="22" width="9" height="9" fill="#475569" />
      </svg>
    )
  },
  {
    id: "border", label: "Border", preview: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect x="1" y="1" width="38" height="38" rx="4" fill="none" stroke="#475569" strokeWidth="3" />
        <rect x="7" y="7" width="9" height="9" rx="1" fill="#475569" /><rect x="24" y="7" width="9" height="9" rx="1" fill="#475569" />
        <rect x="7" y="24" width="9" height="9" rx="1" fill="#475569" />
      </svg>
    )
  },
  {
    id: "badge", label: "Badge", preview: () => (
      <svg width="40" height="50" viewBox="0 0 40 50">
        <rect x="1" y="1" width="38" height="37" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="4" y="4" width="9" height="9" rx="1" fill="#475569" /><rect x="27" y="4" width="9" height="9" rx="1" fill="#475569" />
        <rect x="4" y="20" width="9" height="9" rx="1" fill="#475569" />
        <rect x="1" y="39" width="38" height="10" rx="4" fill="#2563eb" />
        <text x="20" y="46" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="bold">FOLLOW US</text>
      </svg>
    )
  },
]

const FONTS = ["Arial", "Georgia", "Courier New", "Verdana", "Impact", "Trebuchet MS"]

export default function Frames({ design, patchDesign }) {
  return (
    <div className="space-y-4">
      {/* Frame grid */}
      <div className="grid grid-cols-3 gap-2">
        {FRAMES.map(f => {
          const active = design.frame === f.id
          return (
            <button key={String(f.id)} type="button"
              onClick={() => patchDesign({ frame: f.id })}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 cursor-pointer transition
                ${active ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300 bg-white"}`}>
              {f.preview()}
              <span className={`text-[9px] font-bold ${active ? "text-blue-600" : "text-slate-500"}`}>{f.label}</span>
            </button>
          )
        })}
      </div>

      {/* Customizations (only when a frame is selected) */}
      {design.frame && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Label Text</label>
            <input type="text" value={design.frameLabel} onChange={e => patchDesign({ frameLabel: e.target.value })}
              maxLength={20} placeholder="SCAN ME"
              className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["frameLabelColor", "Label Color"], ["frameColor", "Frame Color"]].map(([k, l]) => (
              <div key={k}>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{l}</label>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg border-2 border-slate-200 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full" style={{ background: design[k] || "#222222" }} />
                    <input type="color" value={design[k] || "#222222"} onChange={e => patchDesign({ [k]: e.target.value })}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{(design[k] || "#222222").toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Font</label>
            <select value={design.frameLabelFont} onChange={e => patchDesign({ frameLabelFont: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:border-blue-500 transition">
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}